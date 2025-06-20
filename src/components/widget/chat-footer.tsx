import { useWidgetStore } from "@/stores/widget-store";
import { EloquentLogo } from "./eloquent-logo";

export function ChatFooter() {
  const brand = useWidgetStore((s) => s.brand);
  const theme = useWidgetStore((s) => s.theme);

  return (
    <div
      className="flex items-center justify-center space-x-2 border-t px-4 py-2"
      style={{
        backgroundColor: theme.footerBackground,
        borderColor: theme.border,
      }}
    >
      <EloquentLogo rounded size="xs" />
      <p className="text-xs font-medium" style={{ color: theme.textMuted }}>
        Powered by{" "}
        <a
          className="hover:underline"
          href={brand.websiteUrl}
          rel="noopener noreferrer"
          style={{ color: theme.primary }}
          target="_blank"
        >
          {brand.name}
        </a>
      </p>
    </div>
  );
}
