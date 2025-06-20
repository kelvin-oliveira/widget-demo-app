import { Message } from "@ai-sdk/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ActiveTab, Chat, User } from "@/types/widget";

const generateId = () => crypto.randomUUID();

const generateChatTitle = (messages: Message[]): string => {
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length === 0) return "New Chat";

  const firstMessage = userMessages[0].content;

  // Take first 30 characters and add ellipsis if longer
  return firstMessage.length > 30
    ? firstMessage.substring(0, 30) + "..."
    : firstMessage;
};

interface ChatState {
  activeTab: ActiveTab;
  chats: Chat[];
  currentChatId: null | string;
  user: null | User;
}

interface ChatActions {
  createChat: () => string;
  deleteChat: (chatId: string) => void;
  getCurrentChat: () => Chat | undefined;
  isAuthenticated: () => boolean;
  reset: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  setCurrentChat: (chatId: null | string) => void;
  setUser: (name: string) => void;
  updateChatMessages: (chatId: string, messages: Message[]) => void;
}

const initialState: ChatState = {
  activeTab: "history",
  chats: [],
  currentChatId: null,
  user: null,
};

export const useChatStore = create<ChatActions & ChatState>()(
  persist(
    (set, get) => ({
      ...initialState,
      createChat: () => {
        const newChatId = generateId();
        const newChat: Chat = {
          createdAt: new Date(),
          id: newChatId,
          messages: [],
          title: "New Chat",
          updatedAt: new Date(),
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChatId,
        }));

        return newChatId;
      },
      deleteChat: (chatId: string) => {
        set((state) => {
          const filteredChats = state.chats.filter(
            (chat) => chat.id !== chatId,
          );
          const newCurrentChatId =
            state.currentChatId === chatId
              ? filteredChats.length > 0
                ? filteredChats[0].id
                : null
              : state.currentChatId;

          return {
            chats: filteredChats,
            currentChatId: newCurrentChatId,
          };
        });
      },
      getCurrentChat: () => {
        const { chats, currentChatId } = get();
        if (!currentChatId) return undefined;
        return chats.find((chat) => chat.id === currentChatId);
      },
      isAuthenticated: () => {
        return get().user !== null;
      },
      reset: () => {
        set(initialState);
      },
      setActiveTab: (tab: ActiveTab) => {
        set({ activeTab: tab });
      },
      setCurrentChat: (chatId: null | string) => {
        set({
          currentChatId: chatId,
          ...(chatId !== null ? { activeTab: "chat" } : {}),
        });
      },
      setUser: (name: string) => {
        set({
          user: {
            authenticatedAt: new Date(),
            name,
          },
        });
      },
      updateChatMessages: (chatId: string, messages: Message[]) => {
        const state = get();
        const existingChat = state.chats.find((chat) => chat.id === chatId);

        // Only update if messages are actually different
        if (
          existingChat &&
          JSON.stringify(existingChat.messages) === JSON.stringify(messages)
        ) {
          return; // No change needed
        }

        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages,
                title:
                  chat.messages.length === 0 && messages.length > 0
                    ? generateChatTitle(messages)
                    : chat.title,
                updatedAt: new Date(),
              };
            }
            return chat;
          }),
        }));
      },
    }),
    {
      name: "widget-demo-app-chat-store",
    },
  ),
);
