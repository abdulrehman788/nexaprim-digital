import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "outline";
  className?: string;
}

const variantStyles = {
  gold: "bg-accent text-content-inverse",
  dark: "bg-navy-800 text-accent border border-border-subtle",
  outline: "bg-transparent text-accent border border-accent/40",
};

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
