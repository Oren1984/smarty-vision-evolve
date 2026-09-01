import { useState } from "react";
import {
  Bot,
  X,
  Volume2,
  Send,
  Mic,
  BookOpen,
  BarChart3,
  Boxes,
  Receipt,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useShell } from "@/lib/smarty-shell";

const tabs = [
  { icon: BookOpen, he: "עזרה", en: "Help" },
  { icon: BarChart3, he: "סיכום", en: "Summary" },
  { icon: Boxes, he: "מלאי", en: "Inventory" },
  { icon: Receipt, he: "חשבוניות", en: "Invoices" },
  { icon: Lightbulb, he: "המלצות", en: "Advice" },
];

const chips = [
  { he: "מהי סשן?", en: "What is a session?" },
  { he: "איך מאשרים?", en: "How to approve?" },
  { he: "סטטוס היום", en: "Today's status" },
  { he: "מצב מלאי", en: "Inventory status" },
  { he: "עדיפויות עליונות", en: "Top priorities" },
];

export function AssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, t } = useShell();
  const [tab, setTab] = useState(0);

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
      />
      <aside
        aria-label={t({ he: "עוזר עסקי חכם", en: "AI Business Assistant" })}
        className={cn(
          "fixed bottom-0 top-0 z-50 flex w-full max-w-[420px] flex-col border-line bg-surface shadow-md transition-transform duration-300",
          "end-0 border-s",
          open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full",
        )}
      >
        <div className="bg-brand px-5 py-4 text-brand-ink">
          <div className="flex items-center gap-2.5">
            <Bot className="size-6" />
            <h2 className="text-[19px] font-extrabold">
              {t({ he: "עוזר עסקי חכם SMARTY", en: "SMARTY AI Business Assistant" })}
            </h2>
            <button
              type="button"
              className="focus-ring ms-auto rounded-[8px] p-1.5 hover:bg-white/15"
              aria-label={t({ he: "הקראה", en: "Read aloud" })}
            >
              <Volume2 className="size-[18px]" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring rounded-[8px] p-1.5 hover:bg-white/15"
              aria-label={t({ he: "סגירה", en: "Close" })}
            >
              <X className="size-[18px]" />
            </button>
          </div>
          <p className="mt-1 text-[12.5px] opacity-90">
            {t({ he: "קריאה בלבד · לא מבוצע שינוי בנתונים", en: "Read-only · No data is modified" })}
          </p>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-line px-3">
          {tabs.map((item, i) => (
            <button
              key={item.en}
              type="button"
              onClick={() => setTab(i)}
              className={cn(
                "focus-ring flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-[13px] font-bold",
                i === tab
                  ? "border-brand text-brand"
                  : "border-transparent text-ink-2 hover:text-ink",
              )}
            >
              <item.icon className="size-4" />
              {lang === "he" ? item.he : item.en}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <a
            href="#help"
            className="focus-ring flex items-center justify-center gap-2 rounded-[12px] bg-brand-soft px-4 py-2.5 text-[13px] font-bold text-brand"
          >
            <BookOpen className="size-4" />
            {t({ he: "עיון בכל מאמרי מרכז העזרה", en: "Browse all Help Center articles" })}
          </a>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3">
              {t({ he: "נסו לשאול", en: "Try asking" })}
            </p>
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c.en}
                  type="button"
                  className="focus-ring rounded-full border border-line-2 bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-brand hover:bg-brand-soft"
                >
                  {lang === "he" ? c.he : c.en}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[12px] border border-line bg-surface-2 p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3">
              {t({ he: "עוזר", en: "Assistant" })}
            </p>
            <p className="text-[14px] text-ink">
              {t({
                he: "שלום! אני העוזר העסקי של SMARTY. אני יכול לעזור עם:",
                en: "Hi! I am SMARTY's AI Business Assistant. I can help you with:",
              })}
            </p>
            <ul className="mt-2 space-y-1.5 ps-5 text-[13.5px] text-ink-2">
              {[
                { he: "עזרה — תיעוד מערכת ושאלות תפעול", en: "Help — documentation and how-to" },
                { he: "סיכום — תמונת מצב יומית ושבועית", en: "Summary — daily / weekly overview" },
                { he: "מלאי — רמות מלאי והתראות", en: "Inventory — stock levels and alerts" },
                { he: "חשבוניות — מצב חיוב ויתרות", en: "Invoices — billing and outstanding" },
                { he: "המלצות — סדר עדיפויות עסקי", en: "Advice — prioritised recommendations" },
              ].map((li) => (
                <li key={li.en} className="list-disc">
                  {lang === "he" ? li.he : li.en}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12.5px] italic text-ink-3">
              {t({
                he: "קריאה בלבד — לא ניתן לשנות נתונים.",
                en: "Read-only — I cannot modify any data.",
              })}
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 border-t border-line p-3"
        >
          <input
            className="focus-ring min-w-0 flex-1 rounded-[8px] border border-line-2 bg-surface px-3 py-2 text-[14px] text-ink placeholder:text-ink-3"
            placeholder={t({ he: "שאלו שאלה...", en: "Ask a question..." })}
          />
          <button
            type="button"
            className="focus-ring rounded-[8px] border border-line-2 p-2 text-ink-2"
            aria-label={t({ he: "קלט קולי", en: "Voice input" })}
          >
            <Mic className="size-[18px]" />
          </button>
          <button
            type="submit"
            className="focus-ring rounded-[8px] bg-brand p-2 text-brand-ink shadow-sm"
            aria-label={t({ he: "שליחה", en: "Send" })}
          >
            <Send className="size-[18px] rtl:-scale-x-100" />
          </button>
        </form>
      </aside>
    </>
  );
}
