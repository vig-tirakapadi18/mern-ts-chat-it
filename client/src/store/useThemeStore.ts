import { create } from "zustand";

type Themes =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "cmyk"
  | "autumn"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter"
  | "dim"
  | "nord"
  | "sunset";

interface IThemeStore {
  theme: Themes;

  setTheme: (theme: string) => void;
}

export const useThemeStore = create<IThemeStore>((set) => ({
  theme: (localStorage.getItem("chatIt-theme") as Themes) || "coffee",

  setTheme: (theme) => {
    localStorage.setItem("chatIt-theme", theme);
    set({ theme: theme as Themes });
  },
}));
