import { useEffect, useRef } from "react";
import { useWidgetStore } from "@/stores/widget-store";

export function useWidget() {
  const isOpen = useWidgetStore((state) => state.isOpen);
  const setIsOpen = useWidgetStore((state) => state.setIsOpen);
  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isOutsideWidget =
        widgetRef.current && !widgetRef.current.contains(target);

      const isOutsideTrigger =
        triggerRef.current && !triggerRef.current.contains(target);

      if (isOutsideWidget && isOutsideTrigger) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return { triggerRef, widgetRef };
}
