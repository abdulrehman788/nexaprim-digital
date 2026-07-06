type SocialIconProps = {
  name: string;
  className?: string;
};

export function SocialIcon({ name, className = "h-4 w-4" }: SocialIconProps) {
  const shared = { className, fill: "currentColor", "aria-hidden": true as const };

  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" {...shared}>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" {...shared}>
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.84v2.18h.05c.53-1 1.84-2.18 3.79-2.18 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.75V24h-4V8z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" {...shared}>
          <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.96h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79v8.44C19.61 23.08 24 18.09 24 12.07z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" {...shared}>
          <path d="M23.5 6.2a3 3 0 0 0-2.11-2.12C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.39.58A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.12C4.45 20.5 12 20.5 12 20.5s7.55 0 9.39-.58a3 3 0 0 0 2.11-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.75 15.5v-7L15.5 12l-5.75 3.5z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg viewBox="0 0 24 24" {...shared}>
          <path d="M18.9 2.25h3.68l-8.04 9.19L24 21.75h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 2.25h7.59l5.24 6.93 6.07-6.93zm-1.29 17.52h2.04L6.56 4.24H4.32l13.29 15.53z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...shared}>
          <path d="M10.6 14.2 2.45 22.36l-1.4-1.4 8.15-8.15-8.15-8.15 1.4-1.4 8.15 8.15 8.15-8.15 1.4 1.4-8.15 8.15 8.15 8.15-1.4 1.4-8.15-8.15z" />
        </svg>
      );
  }
}
