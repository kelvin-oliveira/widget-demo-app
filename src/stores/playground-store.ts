import { create } from "zustand";
import { persist } from "zustand/middleware";
import { themes } from "@/constants/themes";
import { Brand, Position, Status } from "@/types/widget";

type ThemeOption = keyof typeof themes;

interface PlaygroundState {
  brand: Brand;
  chatContext: string;
  position: Position;
  showBrand: boolean;
  status: Status;
  suggestedQuestions: string[];
  themeOption: ThemeOption;
  title: string;
}

interface PlaygroundActions {
  reset: () => void;
  setBrand: (brand: Brand) => void;
  setChatContext: (chatContext: string) => void;
  setPosition: (position: Position) => void;
  setShowBrand: (showBrand: boolean) => void;
  setStatus: (status: Status) => void;
  setSuggestedQuestions: (suggestedQuestions: string[]) => void;
  setThemeOption: (themeOption: ThemeOption) => void;
  setTitle: (title: string) => void;
}

const initialState: PlaygroundState = {
  brand: {
    name: "EloquentAI",
    websiteUrl: "https://www.eloquentai.co/",
  },
  chatContext: "",
  position: "bottom-right",
  showBrand: true,
  status: "online",
  suggestedQuestions: [
    "What can you help me with?",
    "Tell me a fun fact",
    "Help me brainstorm ideas",
  ],
  themeOption: "eloquent",
  title: "Eloquent AI",
};

export const usePlaygroundStore = create<PlaygroundActions & PlaygroundState>()(
  persist(
    (set) => ({
      ...initialState,
      reset: () => set({ ...initialState }),
      setBrand: (brand: Brand) => set({ brand }),
      setChatContext: (chatContext: string) => set({ chatContext }),
      setPosition: (position: Position) => set({ position }),
      setShowBrand: (showBrand: boolean) => set({ showBrand }),
      setStatus: (status: Status) => set({ status }),
      setSuggestedQuestions: (suggestedQuestions: string[]) =>
        set({ suggestedQuestions }),
      setThemeOption: (themeOption: ThemeOption) => set({ themeOption }),
      setTitle: (title: string) => set({ title }),
    }),
    {
      name: "widget-demo-app-playground-store",
    },
  ),
);
