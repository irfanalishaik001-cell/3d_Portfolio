import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  className?: string;
}

export const TechIcon: React.FC<IconProps> = ({
  name,
  size = 20,
  className = '',
  ...props
}) => {
  const iconKey = name.toLowerCase();

  switch (iconKey) {
    case 'python':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          {...props}
        >
          <path
            d="M11.914 2C6.441 2 6.78 4.373 6.78 4.373l.006 2.457h5.207v.737H4.767S2 7.247 2 12.74c0 5.494 2.41 5.3 2.41 5.3h1.442v-2.022s-.078-2.41 2.37-2.41h5.174s2.294.037 2.294-2.22V6.262S16.035 2 11.914 2zm-1.42 1.488a.86.86 0 11.002 1.72.86.86 0 01-.002-1.72z"
            fill="#3776AB"
          />
          <path
            d="M12.086 22c5.473 0 5.134-2.373 5.134-2.373l-.006-2.457h-5.207v-.737h7.226s2.767.32 2.767-5.173c0-5.494-2.41-5.3-2.41-5.3h-1.442v2.022s.078 2.41-2.37 2.41H10.66s-2.294-.037-2.294 2.22v5.127S7.965 22 12.086 22zm1.42-1.488a.86.86 0 11-.002-1.72.86.86 0 01.002 1.72z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'java':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={{ color: '#E76F00' }}
          {...props}
        >
          <path d="M7.747 18.067s-.603.228-.973.543c-.452.383-.34 1.135 1.054 1.75 2.12.934 5.928.98 8.163.023 1.066-.456 1.157-1.077.727-1.464-.352-.317-.968-.54-1.616-.628.718.784-.96 1.442-3.136 1.474-2.176.032-4.047-.6-4.219-1.698M8.34 14.864s-1.899.96-1.127 1.834c.85.962 3.197 1.144 5.485.836 2.377-.32 4.417-1.396 3.655-2.203-.687-.729-1.764-.78-2.673-.77.892.613-.717 1.154-2.585 1.196-1.868.04-2.614-.72-2.755-.893M14.935 9.77c.367.625.549 1.432-.08 2.152-1.11 1.272-3.46 1.58-6.19 1.063-.585-.11-.84-.367-.62-.572.24-.223.754-.36 1.267-.328-1.57-.45-2.023-1.42-1.018-2.024 1.637-.98 4.36-.615 5.568.127.842.518 1.073-.418 1.073-.418" />
          <path d="M14.773 4.29s1.444 1.258-.87 3.513c-2.315 2.254-1.282 3.428-1.282 3.428s-1.306-1.618.73-3.327c1.869-1.568 1.422-3.614 1.422-3.614M11.758 1.5s2.21 1.93-1.332 5.39c-3.542 3.46-1.963 5.26-1.963 5.26s-2.002-2.482 1.12-5.105c2.868-2.408 2.175-5.545 2.175-5.545" />
        </svg>
      );

    case 'c':
    case 'c-lang':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={{ color: '#00599C' }}
          {...props}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.92 14.5c-1.14.74-2.5 1.14-3.92 1.14-3.65 0-6.62-2.97-6.62-6.62 0-3.65 2.97-6.62 6.62-6.62 1.42 0 2.78.4 3.92 1.14l-1.35 2.34c-.75-.49-1.63-.76-2.57-.76-2.14 0-3.9 1.76-3.9 3.9s1.76 3.9 3.9 3.9c.94 0 1.82-.27 2.57-.76l1.35 2.32z" />
        </svg>
      );

    case 'numpy':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          {...props}
        >
          <path
            d="M12 2L2 7v10l10 5 10-5V7L12 2z"
            stroke="#013243"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M12 22V12M2 7l10 5 10-5" stroke="#4dabcf" strokeWidth="2" />
          <path d="M7 14.5l5-2.5 5 2.5" stroke="#013243" strokeWidth="1.5" />
        </svg>
      );

    case 'pandas':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={{ color: '#150458' }}
          {...props}
        >
          <path d="M6 3h3v18H6zM15 3h3v18h-3z" fill="#E70488" />
          <path d="M2 13h20v4H2z" fill="#150458" />
          <path d="M2 7h20v4H2z" fill="#0052CC" opacity="0.8" />
        </svg>
      );

    case 'scikit-learn':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          {...props}
        >
          <circle cx="7" cy="12" r="5" fill="#3499cd" />
          <circle cx="16" cy="12" r="6" fill="#f7931e" opacity="0.9" />
          <circle cx="11.5" cy="12" r="3.2" fill="#007791" />
        </svg>
      );

    case 'react':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          {...props}
        >
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(30 12 12)"
            stroke="#00D8FF"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(90 12 12)"
            stroke="#00D8FF"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(150 12 12)"
            stroke="#00D8FF"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
        </svg>
      );

    case 'git':
    case 'git-github':
    case 'github':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={{ color: '#24292F' }}
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case 'vscode':
    case 'terminal':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          {...props}
        >
          <rect
            x="2"
            y="4"
            width="20"
            height="16"
            rx="3"
            stroke="#007ACC"
            strokeWidth="1.8"
          />
          <path
            d="M7 9l4 3-4 3M13 15h4"
            stroke="#007ACC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'pytorch':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          style={{ color: '#EE4C2C' }}
          {...props}
        >
          <path d="M12.7 2.3a1 1 0 00-1.4 0L6.4 7.2a6.5 6.5 0 109.2 0l-2.9-4.9zm2.4 12.8a4.5 4.5 0 11-6.3-6.4l2.5-2.5 2.5 2.5a4.5 4.5 0 011.3 6.4zM16.5 5.5l1.4-1.4a.5.5 0 00-.7-.7l-1.4 1.4a.5.5 0 00.7.7z" />
        </svg>
      );

    case 'davinci':
    case 'film':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          {...props}
        >
          <circle cx="12" cy="12" r="9" stroke="#E11D48" strokeWidth="1.8" />
          <path
            d="M12 7v10M7 12h10M8.5 8.5l7 7M8.5 15.5l7-7"
            stroke="#E11D48"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'premiere':
    case 'video':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          {...props}
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            fill="#9999FF"
            fillOpacity="0.15"
            stroke="#7C3AED"
            strokeWidth="1.8"
          />
          <text
            x="6"
            y="16"
            fontSize="11"
            fontWeight="bold"
            fill="#7C3AED"
            fontFamily="sans-serif"
          >
            Pr
          </text>
        </svg>
      );

    case 'database':
    case 'sql':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
          stroke="#0284C7"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
};
