import { useWidgetStore } from "@/stores/widget-store";
import { EloquentLogo } from "./eloquent-logo";

interface WelcomeSectionProps {
  children?: React.ReactNode;
  subtitle: string;
  title: string;
}

export function WelcomeSection({
  children,
  subtitle,
  title,
}: WelcomeSectionProps) {
  const theme = useWidgetStore((s) => s.theme);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <EloquentLogo className="mb-4" size="lg" />
      <p
        className="mb-2 text-lg font-semibold"
        style={{ color: theme.textPrimary }}
      >
        {title}
      </p>
      <p className="mb-4 text-sm" style={{ color: theme.textSecondary }}>
        {subtitle}
      </p>
      {children}
    </div>
  );
}
