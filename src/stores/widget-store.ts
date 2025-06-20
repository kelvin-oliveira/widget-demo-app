import { create } from "zustand";
import { persist } from "zustand/middleware";
import { themes } from "@/constants/themes";
import { Brand, Position, Status, Theme } from "@/types/widget";

interface WidgetState {
  brand: Brand;
  chatContext: string;
  isOpen: boolean;
  position: Position;
  showBrand: boolean;
  status: Status;
  suggestedQuestions: string[];
  theme: Theme;
  title: string;
}

interface WidgetActions {
  reset: () => void;
  setBrand: (brand: Brand) => void;
  setChatContext: (context: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPosition: (position: Position) => void;
  setShowBrand: (show: boolean) => void;
  setStatus: (status: Status) => void;
  setSuggestedQuestions: (questions: string[]) => void;
  setTheme: (theme: Theme) => void;
  setTitle: (title: string) => void;
  setWidgetParams: (params: Partial<WidgetState>) => void;
}

const initialState: WidgetState = {
  brand: {
    name: "Eloquent AI",
    websiteUrl: "https://www.eloquentai.co/",
  },
  chatContext: "",
  isOpen: false,
  position: "bottom-right",
  showBrand: true,
  status: "online",
  suggestedQuestions: [
    "What can you help me with?",
    "Tell me a fun fact",
    "Help me brainstorm ideas",
  ],
  theme: themes.eloquent,
  title: "Eloquent AI",
};

export const useWidgetStore = create<WidgetActions & WidgetState>()(
  persist(
    (set) => ({
      ...initialState,
      reset: () => set(() => ({ ...initialState })),
      setBrand: (brand) => set(() => ({ brand })),
      setChatContext: (chatContext) => set(() => ({ chatContext })),
      setIsOpen: (isOpen) => set(() => ({ isOpen })),
      setPosition: (position) => set(() => ({ position })),
      setShowBrand: (showBrand) => set(() => ({ showBrand })),
      setStatus: (status) => set(() => ({ status })),
      setSuggestedQuestions: (suggestedQuestions) =>
        set(() => ({ suggestedQuestions })),
      setTheme: (theme) => set(() => ({ theme })),
      setTitle: (title) => set(() => ({ title })),
      setWidgetParams: (params) => set((state) => ({ ...state, ...params })),
    }),
    {
      name: "widget-demo-app-widget-store",
    },
  ),
);
