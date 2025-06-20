import { useChat as useChatAI } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores/chat-store";
import { useWidgetStore } from "@/stores/widget-store";

export function useChat() {
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // State from chat store
  const createChat = useChatStore((s) => s.createChat);
  const currentChatId = useChatStore((s) => s.currentChatId);
  const getCurrentChat = useChatStore((s) => s.getCurrentChat);
  const isAuthenticated = useChatStore((s) => s.isAuthenticated);
  const setAuthRequested = useChatStore((s) => s.setAuthRequested);
  const setUser = useChatStore((s) => s.setUser);
  const updateChatMessages = useChatStore((s) => s.updateChatMessages);
  const user = useChatStore((s) => s.user);
  const currentChat = getCurrentChat();

  // State from widget store
  const chatContext = useWidgetStore((s) => s.chatContext);

  const {
    append,
    handleSubmit,
    input,
    messages,
    setInput,
    setMessages,
    status,
  } = useChatAI({
    body: { chatContext: chatContext || null, userName: user?.name || null },
    initialMessages: [],
    onFinish: ({ content }) => {
      if (isAuthenticated()) return;

      const isRequestingAuth = content.includes("name for authentication");

      if (isRequestingAuth) setAuthRequested(true);

      const authSuccessMatch = content.match(
        /Welcome (.+?)! You are now authenticated\./,
      );

      if (authSuccessMatch) {
        const extractedName = authSuccessMatch[1].trim();
        if (extractedName.toLowerCase() !== "kelvin") {
          setUser(extractedName);
          setAuthRequested(false);
        }
      }

      // Handle Kelvin rejection
      const isKelvinRejected =
        content.includes("Kelvin") && content.includes("system limitation");

      if (isKelvinRejected) {
        setAuthRequested(true);
      }
    },
  });

  // Sync messages with store
  useEffect(() => {
    if (isLoadingChat || !currentChatId || messages.length === 0) return;

    const currentStoredMessages = currentChat?.messages || [];

    if (JSON.stringify(currentStoredMessages) !== JSON.stringify(messages)) {
      updateChatMessages(currentChatId, messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoadingChat]);

  // Load messages when switching chats
  useEffect(() => {
    if (currentChat && currentChat.messages.length > 0) {
      setIsLoadingChat(true);
      setMessages(currentChat.messages);
      setIsLoadingChat(false);
      return;
    }

    if (currentChatId) return;

    setIsLoadingChat(true);
    setMessages([]);
    setIsLoadingChat(false);
  }, [currentChatId, currentChat, setMessages]);

  const appendUserMessage = (content: string) => {
    if (!currentChatId) createChat();
    append({ content, role: "user" });
  };

  const sendUserMessage = async (e: React.FormEvent) => {
    if (!currentChatId) createChat();
    handleSubmit(e);
  };

  return {
    appendUserMessage,
    input,
    messages,
    sendUserMessage,
    setInput,
    status,
  };
}
