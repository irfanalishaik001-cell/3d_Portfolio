import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Sparkles, Globe, RotateCcw, Eye, Play } from 'lucide-react';

interface PhotoParticleGlobeProps {
  imageSrc: string;
  className?: string;
  onMorphStateChange?: (isGlobe: boolean) => void;
}

export const PhotoParticleGlobe: React.FC<PhotoParticleGlobeProps> = ({
  imageSrc,
  className = '',
  onMorphStateChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGlobeActive, setIsGlobeActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // References to keep animation and Three.js state clean
  const globeUniformRef = useRef<{ value: number }>({ value: 0 });
  const targetGlobeRef = useRef<number>(0);
  const globeVelocityRef = useRef<number>(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const photoMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const requestRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Load and sample image pixels
  const processImage = useCallback(
    (url: string): Promise<{
      width: number;
      height: number;
      pixels: Uint8ClampedArray;
      texture: THREE.Texture;
    }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const offCanvas = document.createElement('canvas');
          offCanvas.width = img.naturalWidth || 600;
          offCanvas.height = img.naturalHeight || 750;

          const ctx = offCanvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) {
            reject(new Error('Cannot acquire 2D canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, offCanvas.width, offCanvas.height);
          const imageData = ctx.getImageData(0, 0, offCanvas.width, offCanvas.height);

          const texture = new THREE.Texture(img);
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.needsUpdate = true;

          resolve({
            width: offCanvas.width,
            height: offCanvas.height,
            pixels: imageData.data,
            texture,
          });
        };

        img.onerror = (err) => reject(err);
        img.src = url;
      });
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDisposed = false;
    const COLUMNS = 120; // optimal particle density for performance & aesthetics

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('WebGL initialization fallback', e);
      return;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20);
    camera.position.z = 5;

    let pointsMesh: THREE.Points | null = null;
    let photoMesh: THREE.Mesh | null = null;

    processImage(imageSrc)
      .then((photo) => {
        if (isDisposed) return;

        const imageAspect = photo.width / photo.height;
        const rows = Math.round(COLUMNS / imageAspect);
        const count = COLUMNS * rows;

        const imagePositions = new Float32Array(count * 3);
        const globePositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const phases = new Float32Array(count);
        const speeds = new Float32Array(count);

        const color = new THREE.Color();
        const goldenAngle = 2.39996323;
        const tilt = -0.28;

        for (let i = 0; i < count; i++) {
          const col = i % COLUMNS;
          const row = Math.floor(i / COLUMNS);

          const sampleX = Math.min(
            photo.width - 1,
            Math.floor(((col + 0.5) / COLUMNS) * photo.width)
          );
          const sampleY = Math.min(
            photo.height - 1,
            Math.floor(((row + 0.5) / rows) * photo.height)
          );
          const pixelIndex = (sampleY * photo.width + sampleX) * 4;
          const offset = i * 3;

          color.setRGB(
            photo.pixels[pixelIndex] / 255,
            photo.pixels[pixelIndex + 1] / 255,
            photo.pixels[pixelIndex + 2] / 255,
            THREE.SRGBColorSpace
          );

          colors[offset] = color.r;
          colors[offset + 1] = color.g;
          colors[offset + 2] = color.b;

          phases[i] = Math.random() * Math.PI * 2;
          speeds[i] = 0.7 + Math.random() * 0.4;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(imagePositions, 3));
        geometry.setAttribute('imagePosition', new THREE.BufferAttribute(imagePositions, 3));
        geometry.setAttribute('globePosition', new THREE.BufferAttribute(globePositions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
        geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

        // Custom Shader Material supporting particle morph and 3D globe rotation
        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uGlobe: globeUniformRef.current,
            uTime: { value: 0 },
            uRotationY: { value: 0 },
            uPointSize: { value: 3.8 },
          },
          vertexShader: `
            uniform float uGlobe;
            uniform float uTime;
            uniform float uRotationY;
            uniform float uPointSize;

            attribute vec3 imagePosition;
            attribute vec3 globePosition;
            attribute vec3 color;
            attribute float phase;
            attribute float speed;

            varying vec3 vColor;
            varying float vGlobe;

            void main() {
              vColor = color;
              vGlobe = uGlobe;

              // Organic turbulence in globe state
              vec3 turbulence = vec3(
                sin(uTime * (speed + 0.6) + phase) * 0.035,
                cos(uTime * (speed + 0.37) + phase * 1.71) * 0.035,
                sin(uTime * (speed + 0.22) + phase * 2.13) * 0.035
              );

              vec3 targetSphere = globePosition + turbulence;

              // Rotate sphere about Y axis
              float cosR = cos(uRotationY);
              float sinR = sin(uRotationY);
              vec3 rotatedSphere = vec3(
                targetSphere.x * cosR - targetSphere.z * sinR,
                targetSphere.y,
                targetSphere.x * sinR + targetSphere.z * cosR
              );

              // Morph between flat photo plane and 3D spherical globe
              vec3 morphed = mix(imagePosition, rotatedSphere, uGlobe);

              vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
              gl_Position = projectionMatrix * mvPosition;

              // Size attenuation
              gl_PointSize = uPointSize * (1.0 + uGlobe * 0.3) * (5.0 / -mvPosition.z);
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            varying float vGlobe;

            void main() {
              // Circular soft particle disk
              vec2 coord = gl_PointCoord - vec2(0.5);
              float dist = length(coord);
              if (dist > 0.5) discard;

              float alpha = smoothstep(0.5, 0.35, dist);
              gl_FragColor = vec4(vColor, alpha);
            }
          `,
          transparent: true,
          depthWrite: false,
        });
        materialRef.current = shaderMaterial;

        pointsMesh = new THREE.Points(geometry, shaderMaterial);
        scene.add(pointsMesh);

        // High resolution overlay photograph
        const photoMaterial = new THREE.MeshBasicMaterial({
          map: photo.texture,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          depthTest: false,
        });
        photoMaterialRef.current = photoMaterial;

        photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), photoMaterial);
        photoMesh.renderOrder = 2;
        scene.add(photoMesh);

        // Layout calculation function
        const updateLayout = () => {
          if (!container) return;
          const width = container.clientWidth || 360;
          const height = container.clientHeight || 450;
          const aspect = width / height;

          renderer.setSize(width, height, false);
          camera.left = -aspect;
          camera.right = aspect;
          camera.top = 1;
          camera.bottom = -1;
          camera.updateProjectionMatrix();

          const imageHalfHeight = Math.min(0.78, (0.88 * aspect) / imageAspect);
          const imageHalfWidth = imageHalfHeight * imageAspect;
          const globeRadius = Math.min(0.62, aspect * 0.78);

          const imgPosAttr = geometry.getAttribute('imagePosition') as THREE.BufferAttribute;
          const globePosAttr = geometry.getAttribute('globePosition') as THREE.BufferAttribute;

          for (let idx = 0; idx < count; idx++) {
            const col = idx % COLUMNS;
            const r = Math.floor(idx / COLUMNS);
            const x = (col + 0.5) / COLUMNS;
            const y = (r + 0.5) / rows;

            // Fibonacci spherical distribution
            const sphereY = 1 - (idx / Math.max(count - 1, 1)) * 2;
            const ringRadius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
            const angle = idx * goldenAngle;
            const sphereX = Math.cos(angle) * ringRadius;
            const sphereZ = Math.sin(angle) * ringRadius;

            // Planar position
            imgPosAttr.setXYZ(
              idx,
              (x - 0.5) * imageHalfWidth * 2,
              (0.5 - y) * imageHalfHeight * 2,
              0
            );

            // Spherical 3D globe position with axial tilt
            globePosAttr.setXYZ(
              idx,
              sphereX * globeRadius,
              (sphereY * Math.cos(tilt) - sphereZ * Math.sin(tilt)) * globeRadius,
              (sphereY * Math.sin(tilt) + sphereZ * Math.cos(tilt)) * globeRadius
            );
          }

          imgPosAttr.needsUpdate = true;
          globePosAttr.needsUpdate = true;

          if (photoMesh) {
            photoMesh.scale.set(imageHalfWidth * 2, imageHalfHeight * 2, 1);
          }
        };

        const resizeObserver = new ResizeObserver(updateLayout);
        resizeObserver.observe(container);
        updateLayout();

        setIsLoaded(true);

        // Animation Loop with spring mechanics for globe morphing
        let lastTime = performance.now();
        const animate = (currentTime: number) => {
          const dt = Math.min((currentTime - lastTime) / 1000, 0.06);
          lastTime = currentTime;
          timeRef.current += dt;

          // Spring physics for smooth morph
          const stiffness = 65;
          const damping = 14;
          const displacement = targetGlobeRef.current - globeUniformRef.current.value;
          const springForce = displacement * stiffness;
          const dampingForce = -globeVelocityRef.current * damping;
          const acceleration = springForce + dampingForce;

          globeVelocityRef.current += acceleration * dt;
          globeUniformRef.current.value += globeVelocityRef.current * dt;
          globeUniformRef.current.value = Math.max(0, Math.min(1, globeUniformRef.current.value));

          // Update shader uniforms
          if (shaderMaterial) {
            shaderMaterial.uniforms.uGlobe.value = globeUniformRef.current.value;
            shaderMaterial.uniforms.uTime.value = timeRef.current;
            shaderMaterial.uniforms.uRotationY.value = timeRef.current * 0.6;
          }

          // Fade photo overlay: fades out as particles morph into globe, fades in when settled
          if (photoMaterialRef.current) {
            const globeVal = globeUniformRef.current.value;
            const start = 0.005;
            const end = 0.045;
            const t = Math.min(1, Math.max(0, (globeVal - start) / (end - start)));
            const opacity = 1 - t * t * (3 - 2 * t);
            photoMaterialRef.current.opacity = Math.max(0, opacity);
          }

          renderer.render(scene, camera);
          requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
          resizeObserver.disconnect();
        };
      })
      .catch((err) => {
        console.error('Failed to load particle globe photo:', err);
      });

    return () => {
      isDisposed = true;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (renderer) renderer.dispose();
      if (pointsMesh) {
        pointsMesh.geometry.dispose();
        (pointsMesh.material as THREE.Material).dispose();
      }
      if (photoMesh) {
        photoMesh.geometry.dispose();
        (photoMesh.material as THREE.Material).dispose();
      }
    };
  }, [imageSrc, processImage]);

  // Pointer interactions for holding
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsHolding(true);
    targetGlobeRef.current = 1;
    onMorphStateChange?.(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsHolding(false);
    targetGlobeRef.current = isGlobeActive ? 1 : 0;
    if (!isGlobeActive) {
      onMorphStateChange?.(false);
    }
  };

  // Click/Toggle action for keyboard or mobile touch button
  const toggleGlobe = () => {
    const nextState = !isGlobeActive;
    setIsGlobeActive(nextState);
    targetGlobeRef.current = nextState ? 1 : 0;
    onMorphStateChange?.(nextState);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer rounded-2xl ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      tabIndex={0}
      role="button"
      aria-label="Hold or click to form a 3D particle globe from portrait"
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleGlobe();
        }
      }}
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full touch-none" />

      {/* Floating Status & Instruction Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-xs text-[10px] font-mono font-semibold text-stone-800">
          <Globe
            size={12}
            className={`transition-colors ${
              isHolding || isGlobeActive ? 'text-blue-600 animate-spin' : 'text-stone-500'
            }`}
          />
          <span>{isHolding || isGlobeActive ? '3D Particle Globe' : 'Hold / Press to Morph'}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleGlobe();
          }}
          className="pointer-events-auto px-2 py-1 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md text-[10px] font-semibold transition-all shadow-xs flex items-center gap-1"
          aria-label={isGlobeActive ? 'Reconstruct photograph' : 'Morph into particle globe'}
        >
          <Sparkles size={11} className="text-amber-400" />
          <span>{isGlobeActive ? 'Reconstruct' : 'Morph 3D'}</span>
        </button>
      </div>

      {/* Touch/Hold Instruction Badge at bottom */}
      <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-stone-950/70 text-white/90 backdrop-blur-md text-[10px] font-medium tracking-wide">
          {isHolding
            ? 'Release to reform photograph'
            : isGlobeActive
            ? '✨ 3D Orbit Active • Click button to reset'
            : 'Press & hold anywhere on photo to dissolve'}
        </span>
      </div>
    </div>
  );
};
