import { ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/tailwind";
import { useWidgetStore } from "@/stores/widget-store";

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export function ChatInput({
  input,
  isStreaming,
  onChange,
  onSubmit,
  placeholder = "Type your message...",
}: ChatInputProps) {
  const status = useWidgetStore((s) => s.status);
  const theme = useWidgetStore((s) => s.theme);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const disabled = status !== "online" || isStreaming;

  useEffect(() => {
    const target = textareaRef.current;

    if (target) {
      target.style.height = "auto";
      target.style.height = Math.min(target.scrollHeight, 86) + "px";
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as React.FormEvent);
    }
  };

  return (
    <div className="p-2">
      <div
        className={cn(
          "relative flex items-end rounded-2xl border p-1 transition-colors focus-within:border-gray-400 hover:border-gray-400",
          disabled && "pointer-events-none",
        )}
        style={{
          backgroundColor: theme.footerBackground,
          borderColor: theme.border,
        }}
      >
        <textarea
          className="scrollbar-none max-h-[88px] min-h-[40px] flex-1 resize-none rounded-2xl border-none bg-transparent px-3 py-2 text-sm leading-[24px] shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={textareaRef}
          rows={1}
          style={{ color: theme.textPrimary }}
          value={input}
        />
        <Button
          className="size-10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-5"
          disabled={!input.trim()}
          onClick={onSubmit}
          size="icon"
          style={{
            backgroundColor: theme.primary,
            color: theme.primaryText,
          }}
        >
          {isStreaming ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ArrowUp strokeWidth={2} />
          )}
        </Button>
      </div>
    </div>
  );
}
