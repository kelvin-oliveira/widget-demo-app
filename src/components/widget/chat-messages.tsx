import { Message } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/tailwind";
import { useChatStore } from "@/stores/chat-store";
import { useWidgetStore } from "@/stores/widget-store";
import { EloquentLogo } from "./eloquent-logo";
import { WelcomeSection } from "./welcome-section";

interface ChatMessagesProps {
  isThinking: boolean;
  messages: Message[];
  onSuggestedQuestion: (question: string) => void;
}

export function ChatMessages({
  isThinking,
  messages,
  onSuggestedQuestion,
}: ChatMessagesProps) {
  // State from the widget store
  const status = useWidgetStore((s) => s.status);
  const suggestedQuestions = useWidgetStore((s) => s.suggestedQuestions);
  const theme = useWidgetStore((s) => s.theme);
  const title = useWidgetStore((s) => s.title);

  // State from the chat store
  const setActiveTab = useChatStore((s) => s.setActiveTab);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (status === "offline" && messages.length === 0) {
    return (
      <WelcomeSection
        subtitle="Please check back later or contact support"
        title={`${title} is currently offline`}
      />
    );
  }

  if (status === "maintenance" && messages.length === 0) {
    return (
      <WelcomeSection
        subtitle="We'll be back online shortly"
        title={`${title} is under maintenance`}
      />
    );
  }

  if (messages.length === 0) {
    return (
      <WelcomeSection
        subtitle="I'm here to help you with any questions or tasks"
        title={`Welcome to ${title}`}
      >
        <div className="grid w-full max-w-xs grid-cols-1 gap-2">
          {suggestedQuestions.map((suggestion, index) => (
            <Button
              className="h-12 justify-start text-sm transition-all"
              disabled={status !== "online"}
              key={index}
              onClick={() => {
                setActiveTab("chat");
                onSuggestedQuestion(suggestion);
              }}
              size="sm"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
              variant="outline"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </WelcomeSection>
    );
  }

  return (
    <ScrollArea className="flex-1 px-4 py-2">
      <WelcomeSection
        subtitle="Ask me anything"
        title={`${title} responds instantly`}
      />
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            className={cn("flex", message.role === "user" && "justify-end")}
            key={message.id}
          >
            <div
              className={cn(
                "flex max-w-[90%] space-x-2 items-end",
                message.role === "user" && "flex-row-reverse space-x-reverse",
              )}
            >
              {message.role === "assistant" && (
                <div className="flex shrink-0 items-center justify-center rounded-full">
                  <EloquentLogo rounded size="sm" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 prose break-words",
                  message.role === "user"
                    ? "rounded-br-none"
                    : "rounded-bl-none",
                )}
                style={{
                  backgroundColor:
                    message.role === "user"
                      ? theme.userMessageBackground
                      : theme.assistantMessageBackground,
                  color:
                    message.role === "user"
                      ? theme.userMessageText
                      : theme.assistantMessageText,
                }}
              >
                <Markdown>{message.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] space-x-2">
              <div className="flex shrink-0 items-center justify-center rounded-full">
                <EloquentLogo rounded size="sm" />
              </div>
              <div
                className="rounded-2xl rounded-bl-none px-4 py-2"
                style={{
                  backgroundColor: theme.assistantMessageBackground,
                }}
              >
                <div className="flex items-center space-x-1">
                  <span
                    className="text-sm"
                    style={{ color: theme.assistantMessageText }}
                  >
                    Thinking
                    <TypingDots />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}

const TypingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <span>{dots}</span>;
};
