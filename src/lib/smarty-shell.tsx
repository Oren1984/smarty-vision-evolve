import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SmartyTheme = "light" | "dark" | "high-contrast";
export type SmartyLang = "he" | "en";

type ShellState = {
  theme: SmartyTheme;
  setTheme: (t: SmartyTheme) => void;
  cycleTheme: () => void;
  lang: SmartyLang;
  setLang: (l: SmartyLang) => void;
  dir: "rtl" | "ltr";
  t: <T>(pair: { he: T; en: T }) => T;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const ShellContext = createContext<ShellState | null>(null);

const THEME_KEY = "smarty-theme";
const LANG_KEY = "smarty-lang";
const SIDEBAR_KEY = "smarty-sidebar-open";

export function SmartyShellProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SmartyTheme>("light");
  const [lang, setLangState] = useState<SmartyLang>("he");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Restore persisted preferences after hydration (never during SSR render).
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as SmartyTheme | null;
    const storedLang = localStorage.getItem(LANG_KEY) as SmartyLang | null;
    const storedSidebar = localStorage.getItem(SIDEBAR_KEY);
    if (storedTheme) setThemeState(storedTheme);
    if (storedLang) setLangState(storedLang);
    if (storedSidebar != null) setSidebarOpen(storedSidebar === "1");
  }, []);

  const dir = lang === "he" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.removeAttribute("data-bs-theme");
    else root.setAttribute("data-bs-theme", theme);
    root.setAttribute("dir", dir);
    root.setAttribute("lang", lang);
  }, [theme, dir, lang]);

  const setTheme = useCallback((next: SmartyTheme) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
  }, []);

  const setLang = useCallback((next: SmartyLang) => {
    setLangState(next);
    localStorage.setItem(LANG_KEY, next);
  }, []);

  const value = useMemo<ShellState>(
    () => ({
      theme,
      setTheme,
      cycleTheme: () =>
        setTheme(theme === "light" ? "dark" : theme === "dark" ? "high-contrast" : "light"),
      lang,
      setLang,
      dir,
      t: (pair) => (lang === "he" ? pair.he : pair.en),
      sidebarOpen,
      toggleSidebar: () =>
        setSidebarOpen((open) => {
          localStorage.setItem(SIDEBAR_KEY, open ? "0" : "1");
          return !open;
        }),
    }),
    [theme, setTheme, lang, setLang, dir, sidebarOpen],
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside SmartyShellProvider");
  return ctx;
}
