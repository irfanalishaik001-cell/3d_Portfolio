import React from 'react';

/** Hand-drawn curved arrow with organic rough stroke */
export const DoodleArrow: React.FC<{
  className?: string;
  direction?: 'right-down' | 'left-down' | 'up-right' | 'curved';
}> = ({ className = 'text-blue-500/80', direction = 'right-down' }) => {
  if (direction === 'curved') {
    return (
      <svg
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M10 45 C 30 10, 70 12, 88 38"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="1 1"
          className="stroke-rough"
        />
        <path
          d="M78 38 L 88 38 L 86 28"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 90 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 15 C 32 8, 62 18, 76 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M66 38 L 78 39 L 76 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Hand-drawn scribble underline */
export const DoodleUnderline: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'text-blue-500', color }) => {
  return (
    <svg
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible ${className}`}
      style={color ? { color } : undefined}
    >
      <path
        d="M3 11 C 55 4, 135 4, 237 10 M12 14 C 70 8, 160 8, 225 13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Hand-drawn circle / highlight loop */
export const DoodleHighlightCircle: React.FC<{
  className?: string;
}> = ({ className = 'text-amber-500/70' }) => {
  return (
    <svg
      viewBox="0 0 140 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 32 C 10 14, 50 6, 95 8 C 130 10, 136 28, 126 42 C 112 56, 36 58, 18 46 C 10 40, 16 22, 40 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Hand-drawn sparkle / star */
export const DoodleSparkle: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = 'text-amber-400', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2 C 12 7, 14 10, 22 12 C 14 14, 12 17, 12 22 C 12 17, 10 14, 2 12 C 10 10, 12 7, 12 2 Z"
        fill="currentColor"
      />
    </svg>
  );
};

/** Hand-drawn pin / thumbtack */
export const DoodlePin: React.FC<{
  className?: string;
}> = ({ className = 'text-rose-500' }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="7" r="5" fill="currentColor" opacity="0.9" />
      <path d="M12 12 L 12 22" stroke="#71717A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="5.5" r="1.5" fill="#FFFFFF" />
    </svg>
  );
};

/** Grid background pattern for whiteboard */
export const WhiteboardGridBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.45]"
      style={{
        backgroundImage: `
          radial-gradient(circle, #cbd5e1 1.1px, transparent 1.1px),
          linear-gradient(to right, #f1f5f9 1px, transparent 1px),
          linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px, 120px 120px, 120px 120px',
      }}
    />
  );
};
