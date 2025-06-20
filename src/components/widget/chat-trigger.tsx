import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { useWidgetStore } from "@/stores/widget-store";
import { EloquentLogo } from "./eloquent-logo";

export const ChatTrigger = forwardRef<HTMLButtonElement>(function ChatTrigger(
  {},
  ref,
) {
  // State from the widget store
  const isOpen = useWidgetStore((s) => s.isOpen);
  const theme = useWidgetStore((s) => s.theme);

  // Actions from the widget store
  const setIsOpen = useWidgetStore((s) => s.setIsOpen);

  return (
    <Button
      aria-label={isOpen ? "Close chat" : "Open chat"}
      className="size-12 rounded-full transition-all hover:scale-105 hover:shadow-lg active:scale-95 sm:size-14 [&_svg]:size-5 sm:[&_svg]:size-6"
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
      style={{
        backgroundColor: theme.primary,
        color: theme.primaryText,
      }}
    >
      {isOpen ? (
        <ChevronDown strokeWidth={2.5} style={{ stroke: theme.primaryText }} />
      ) : (
        <EloquentLogo variant="base" />
      )}
    </Button>
  );
});
