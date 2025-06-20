"use client";

import { Card } from "@/components/ui/card";
import { useChat } from "@/hooks/use-chat";
import { useWidget } from "@/hooks/use-widget";
import { cn } from "@/lib/tailwind";
import { useChatStore } from "@/stores/chat-store";
import { useWidgetStore } from "@/stores/widget-store";
import { Position } from "@/types/widget";
import { ChatFooter } from "./chat-footer";
import { ChatHeader } from "./chat-header";
import { ChatHistory } from "./chat-history";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { ChatTrigger } from "./chat-trigger";
import { MaintenanceBanner } from "./maintenance-banner";

export function Chat() {
  // State from the widget store
  const isOpen = useWidgetStore((s) => s.isOpen);
  const position = useWidgetStore((s) => s.position);
  const showBrand = useWidgetStore((s) => s.showBrand);
  const theme = useWidgetStore((s) => s.theme);

  // State from the chat store
  const activeTab = useChatStore((s) => s.activeTab);
  const chats = useChatStore((s) => s.chats);

  // Widget-related hook
  const { triggerRef, widgetRef } = useWidget();

  // AI Chat-related hook
  const {
    appendUserMessage,
    input,
    messages,
    sendUserMessage,
    setInput,
    status: chatStatus,
  } = useChat();

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col space-y-4 p-4 sm:p-6 md:p-8",
        getPositionClasses(position),
      )}
    >
      {isOpen && (
        <Card
          className="animate-in slide-in-from-bottom-2 fade-in-0 flex h-[calc(100vh-6rem)] w-full max-w-full flex-col shadow-2xl duration-200 sm:h-[calc(100vh-10rem)] sm:w-[480px]"
          ref={widgetRef}
          style={{ backgroundColor: theme.cardBackground }}
        >
          <ChatHeader />
          {activeTab === "history" && chats.length > 0 && <ChatHistory />}
          {(activeTab !== "history" || chats.length === 0) && (
            <>
              <ChatMessages
                isThinking={chatStatus === "submitted"}
                messages={messages}
                onSuggestedQuestion={appendUserMessage}
              />
              <MaintenanceBanner />
              <ChatInput
                input={input}
                isStreaming={
                  chatStatus === "submitted" || chatStatus === "streaming"
                }
                onChange={setInput}
                onSubmit={sendUserMessage}
              />
            </>
          )}
          {showBrand && <ChatFooter />}
        </Card>
      )}
      <ChatTrigger ref={triggerRef} />
    </div>
  );
}

function getPositionClasses(position: Position): string {
  switch (position) {
    case "bottom-left":
      return "bottom-0 left-0 items-start";
    case "bottom-right":
    default:
      return "bottom-0 right-0 items-end";
  }
}
