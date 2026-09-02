import { PanelLeft, Bell, Settings, Sun, Moon, Contrast, Bot, Languages } from "lucide-react";
import { useShell } from "@/lib/smarty-shell";
import { cn } from "@/lib/utils";

export function ConsoleTopbar({ onAssistant }: { onAssistant: () => void }) {
  const { toggleSidebar, theme, cycleTheme, lang, setLang, t } = useShell();
  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Contrast;

  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center gap-2 border-b border-line bg-surface/90 px-4 backdrop-blur">
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={t({ he: "כיווץ/הרחבת סרגל צד", en: "Collapse or expand sidebar" })}
        className="focus-ring rounded-[8px] p-2 text-ink-2 hover:bg-surface-2 hover:text-ink"
      >
        <PanelLeft className="size-[18px]" />
      </button>

      <span className="ms-1 text-[13px] font-semibold text-ink-3 md:hidden">SMARTY</span>

      <div className="ms-auto flex items-center gap-1">
        <button
          type="button"
          onClick={onAssistant}
          className="focus-ring me-1 hidden items-center gap-2 rounded-full bg-brand px-3.5 py-1.5 text-[13px] font-bold text-brand-ink shadow-sm sm:inline-flex"
        >
          <span className="size-2 rounded-full bg-cyan" />
          <Bot className="size-4" />
          {t({ he: "עוזר AI", en: "Assistant" })}
        </button>

        <button
          type="button"
          onClick={() => setLang(lang === "he" ? "en" : "he")}
          className="focus-ring flex items-center gap-1.5 rounded-[8px] px-2.5 py-2 text-[12.5px] font-bold text-ink-2 hover:bg-surface-2 hover:text-ink"
          aria-label={t({ he: "החלפת שפה", en: "Switch language" })}
        >
          <Languages className="size-[18px]" />
          {lang === "he" ? "עברית" : "EN"}
        </button>

        <button
          type="button"
          onClick={cycleTheme}
          className="focus-ring rounded-[8px] p-2 text-ink-2 hover:bg-surface-2 hover:text-ink"
          aria-label={t({ he: "החלפת ערכת נושא", en: "Switch theme" })}
          title={theme}
        >
          <ThemeIcon className="size-[18px]" />
        </button>

        <button
          type="button"
          className="focus-ring rounded-[8px] p-2 text-ink-2 hover:bg-surface-2 hover:text-ink"
          aria-label={t({ he: "הגדרות", en: "Settings" })}
        >
          <Settings className="size-[18px]" />
        </button>

        <button
          type="button"
          className={cn(
            "focus-ring relative rounded-[8px] p-2 text-ink-2 hover:bg-surface-2 hover:text-ink",
          )}
          aria-label={t({ he: "התראות", en: "Notifications" })}
        >
          <Bell className="size-[18px]" />
          <span className="absolute end-1 top-1 grid size-4 place-items-center rounded-full bg-danger text-[10px] font-bold text-brand-ink">
            1
          </span>

        </button>
      </div>
    </header>
  );
}
