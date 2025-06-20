import { AlertTriangle } from "lucide-react";
import { useWidgetStore } from "@/stores/widget-store";

export function MaintenanceBanner() {
  const status = useWidgetStore((s) => s.status);
  const theme = useWidgetStore((s) => s.theme);

  if (status !== "maintenance") {
    return null;
  }

  return (
    <div
      className="px-4 py-2 text-center"
      style={{
        background: `linear-gradient(to right, ${theme.statusMaintenance}90, ${theme.statusMaintenance}70)`,
      }}
    >
      <div className="flex items-center justify-center space-x-2">
        <AlertTriangle className="size-4 text-white" strokeWidth={2} />
        <p className="text-sm font-medium text-white">
          Maintenance • Back in 5 minutes
        </p>
      </div>
    </div>
  );
}
