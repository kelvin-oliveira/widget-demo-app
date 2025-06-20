import { History, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat-store";
import { useWidgetStore } from "@/stores/widget-store";
import { EloquentLogo } from "./eloquent-logo";

export function ChatHeader() {
  // State from the widget store
  const status = useWidgetStore((s) => s.status);
  const theme = useWidgetStore((s) => s.theme);
  const title = useWidgetStore((s) => s.title);

  // State from the chat store
  const activeTab = useChatStore((s) => s.activeTab);
  const chats = useChatStore((s) => s.chats);
  const user = useChatStore((s) => s.user);

  // Actions from the chat store
  const reset = useChatStore((s) => s.reset);
  const setActiveTab = useChatStore((s) => s.setActiveTab);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);

  const handleNewChat = () => {
    if (status !== "online") {
      return;
    }

    setActiveTab("chat");
    setCurrentChat(null);
  };

  const getStatusColor = () => {
    switch (status) {
      case "maintenance":
        return theme.statusMaintenance;
      case "online":
        return theme.statusOnline;
      case "offline":
      default:
        return theme.statusOffline;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "maintenance":
        return "Currently under maintenance";
      case "online":
        return "Online and ready to help";
      case "offline":
      default:
        return "Currently offline";
    }
  };

  return (
    <div
      className="flex items-center justify-between rounded-t-xl border-b p-3 sm:p-4"
      style={{
        backgroundColor: theme.headerBackground,
        borderColor: theme.border,
      }}
    >
      <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3">
        <div className="relative shrink-0">
          <EloquentLogo className="sm:hidden" rounded size="sm" />
          <EloquentLogo className="hidden sm:flex" rounded />
          <div
            className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 transition-colors duration-300 sm:size-4"
            style={{
              backgroundColor: getStatusColor(),
              borderColor: theme.headerBackground,
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-base font-bold sm:text-lg"
            style={{ color: theme.textPrimary }}
          >
            {title}
          </p>
          <p
            className="truncate text-xs"
            style={{ color: theme.textSecondary }}
          >
            {getStatusText()}
            {user && (
              <span
                className="ml-2 font-medium"
                style={{ color: theme.primary }}
              >
                • {user.name}
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center space-x-1 sm:space-x-2">
        {user && (
          <Button
            className="size-7 p-0 sm:size-8"
            onClick={reset}
            size="sm"
            title="Logout"
            variant="ghost"
          >
            <LogOut
              className="size-3 sm:size-4"
              style={{ color: theme.textMuted }}
            />
          </Button>
        )}
        {activeTab !== "history" && chats.length > 0 && (
          <Button
            className="size-7 p-0 sm:size-8"
            onClick={() => setActiveTab("history")}
            size="sm"
            title="Chat History"
            variant="ghost"
          >
            <History
              className="size-3 sm:size-4"
              style={{ color: theme.textMuted }}
            />
          </Button>
        )}
        {chats.length > 0 && (
          <Button
            className="size-7 p-0 sm:size-8"
            disabled={status !== "online"}
            onClick={handleNewChat}
            size="sm"
            title="New Chat"
            variant="ghost"
          >
            <Plus
              className="size-3 sm:size-4"
              style={{ color: theme.textMuted }}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
