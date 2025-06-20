import { cn } from "@/lib/tailwind";
import { useWidgetStore } from "@/stores/widget-store";

interface EloquentLogoProps {
  className?: string;
  grayscale?: boolean;
  rounded?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "base" | "default";
}

export function EloquentLogo({
  className,
  rounded = false,
  size = "md",
  variant = "default",
}: EloquentLogoProps) {
  const theme = useWidgetStore((s) => s.theme);

  if (variant === "base") {
    return <BaseLogo />;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        rounded ? "rounded-full" : "rounded-[4px]",
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: theme.primary, color: theme.primaryText }}
    >
      <BaseLogo />
    </div>
  );
}

const sizeClasses = {
  lg: "size-14 [&_svg]:size-10",
  md: "size-10 [&_svg]:size-6",
  sm: "size-6 [&_svg]:size-4",
  xs: "size-5 [&_svg]:size-3",
};

function BaseLogo() {
  const theme = useWidgetStore((s) => s.theme);

  return (
    <svg
      height="48"
      style={{ fill: theme.primaryText }}
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M25 11C18.2871 11 13 16.41 13 23C13 30.7908 19.2092 37 27 37V45C14.7908 45 5 35.209 5 23C5 12.0512 13.8095 3 25 3C35.2331 3 43 10.828 43 21C43 29.9675 35.9576 37 27 37V29C31.5423 29 35 25.5462 35 21C35 15.2295 30.7981 11 25 11Z" />
    </svg>
  );
}
