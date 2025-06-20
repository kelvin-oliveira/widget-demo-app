import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/chat-store";
import { useWidgetStore } from "@/stores/widget-store";
import { Chat } from "@/types/widget";

export function ChatHistory() {
  // State from the widget store
  const theme = useWidgetStore((s) => s.theme);

  // State from the chat store
  const chats = useChatStore((s) => s.chats);
  const currentChatId = useChatStore((s) => s.currentChatId);

  // Actions from the chat store
  const deleteChat = useChatStore((s) => s.deleteChat);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chatId);

    if (chatId === currentChatId && chats.length <= 1) {
      setCurrentChat(null);
    }
  };

  return (
    <div className="flex grow flex-col">
      <div
        className="border-b px-4 py-2"
        style={{
          backgroundColor: theme.footerBackground,
          borderColor: theme.border,
        }}
      >
        <h2
          className="text-lg font-semibold"
          style={{ color: theme.textPrimary }}
        >
          Chat History
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {chats.map((chat) => (
            <ChatHistoryItem
              chat={chat}
              key={chat.id}
              onDelete={(e) => handleDeleteChat(chat.id, e)}
              onSelect={() => {
                setCurrentChat(chat.id);
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface ChatHistoryItemProps {
  chat: Chat;
  onDelete: (e: React.MouseEvent) => void;
  onSelect: () => void;
}

function ChatHistoryItem({ chat, onDelete, onSelect }: ChatHistoryItemProps) {
  const theme = useWidgetStore((s) => s.theme);

  return (
    <div
      className="group flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors"
      onClick={onSelect}
      style={{
        backgroundColor: theme.footerBackground,
        borderColor: theme.border,
      }}
    >
      <div className="min-w-0 flex-1">
        <p
          className="truncate font-medium"
          style={{ color: theme.textPrimary }}
        >
          {chat.title}
        </p>
        <p className="text-xs" style={{ color: theme.textSecondary }}>
          {chat.messages.length} messages •{" "}
          {new Date(chat.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <Button
        className="size-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={onDelete}
        size="sm"
        title="Delete Chat"
        variant="ghost"
      >
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </div>
  );
}
