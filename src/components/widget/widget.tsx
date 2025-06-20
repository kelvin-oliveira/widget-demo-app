import { useEffect } from "react";
import { useWidgetStore } from "@/stores/widget-store";
import { Brand, Position, Status, Theme } from "@/types/widget";
import { Chat } from "./chat";

interface WidgetProps {
  brand?: Brand;
  chatContext?: string;
  position?: Position;
  showBrand?: boolean;
  status?: Status;
  suggestedQuestions?: string[];
  theme?: Theme;
  title?: string;
}

export function Widget(props: WidgetProps) {
  const setWidgetParams = useWidgetStore((s) => s.setWidgetParams);

  useEffect(() => {
    setWidgetParams(props);
  }, [props, setWidgetParams]);

  return <Chat />;
}
