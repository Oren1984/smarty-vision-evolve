import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Settings, Plus } from "lucide-react";
import { Card, PageTitle, Btn, InfoBar, Pill } from "@/components/smarty/kit";
import { useShell } from "@/lib/smarty-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({
    meta: [
      { title: "SMARTY Console — Scheduling Calendar" },
      {
        name: "description",
        content:
          "Monthly scheduling grid for SMARTY sessions, upcoming checks and shift coverage across sites.",
      },
      { property: "og:title", content: "SMARTY Console — Scheduling Calendar" },
      {
        property: "og:description",
        content: "Monthly grid of scheduled sessions, checks and shift coverage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalendarPage,
});

const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayNamesHe = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

type Ev = { day: number; label: { he: string; en: string }; tone: "brand" | "success" | "warn" | "info" };
const events: Ev[] = [
  { day: 1, label: { he: "בדיקת אתר יומית", en: "Daily site check" }, tone: "brand" },
  { day: 3, label: { he: "משמרת בוקר · 12 עובדים", en: "Morning shift · 12" }, tone: "info" },
  { day: 8, label: { he: "ביקורת עמידה בחוזה", en: "Compliance audit" }, tone: "warn" },
  { day: 12, label: { he: "ספירת מלאי", en: "Inventory count" }, tone: "success" },
  { day: 17, label: { he: "שאלון שבועי", en: "Weekly questionnaire" }, tone: "brand" },
  { day: 22, label: { he: "תחזוקה מתוכננת", en: "Planned maintenance" }, tone: "info" },
  { day: 29, label: { he: "סגירת חודש", en: "Month-end close" }, tone: "warn" },
];

function CalendarPage() {
  const { lang, t } = useShell();
  // September 2026 starts on Tuesday (index 2), 30 days.
  const lead = 2;
  const cells = Array.from({ length: 42 }, (_, i) => i - lead + 1);

  return (
    <>
      <InfoBar link={t({ he: "מאמר עזרה", en: "Help article" })}>
        {t({
          he: "היומן מציג סשנים מתוכננים ובדיקות עתידיות.",
          en: "The calendar shows scheduled sessions and upcoming checks.",
        })}
      </InfoBar>

      <PageTitle
        eyebrow={t({ he: "תכנון", en: "Scheduling" })}
        title={t({ he: "יומן", en: "Calendar" })}
        action={
          <Btn>
            <Plus className="size-4" />
            {t({ he: "סשן חדש", en: "New session" })}
          </Btn>
        }
      />

      <Card padded={false}>
        <div className="flex flex-wrap items-center gap-3 border-b border-line p-4">
          <div className="flex gap-1">
            <Btn variant="secondary" size="sm">
              <ChevronLeft className="size-4 rtl:-scale-x-100" />
            </Btn>
            <Btn variant="secondary" size="sm">
              <ChevronRight className="size-4 rtl:-scale-x-100" />
            </Btn>
          </div>
          <Btn variant="secondary" size="sm">
            {t({ he: "היום", en: "today" })}
          </Btn>
          <Btn variant="ghost" size="sm">
            <Settings className="size-4" />
          </Btn>
          <h2 className="mx-auto text-[22px] font-extrabold text-ink">
            {t({ he: "ספטמבר 2026", en: "September 2026" })}
          </h2>
          <div className="flex overflow-hidden rounded-[8px] border border-line-2">
            {[
              { he: "חודש", en: "month" },
              { he: "שבוע", en: "week" },
              { he: "יום", en: "day" },
              { he: "רשימה", en: "list" },
            ].map((v, i) => (
              <button
                key={v.en}
                type="button"
                className={cn(
                  "focus-ring px-3 py-1.5 text-[12.5px] font-bold",
                  i === 0 ? "bg-brand text-brand-ink" : "bg-surface text-ink-2 hover:bg-surface-2",
                )}
              >
                {lang === "he" ? v.he : v.en}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-line bg-surface-2">
          {(lang === "he" ? dayNamesHe : dayNamesEn).map((d) => (
            <div
              key={d}
              className="px-2 py-2 text-center text-[11.5px] font-bold uppercase tracking-[0.06em] text-ink-3"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const inMonth = day >= 1 && day <= 30;
            const today = day === 1;
            const dayEvents = events.filter((e) => e.day === day);
            return (
              <div
                key={i}
                className={cn(
                  "min-h-[104px] border-b border-e border-line p-2",
                  !inMonth && "bg-surface-2/60",
                  today && "bg-brand-soft",
                )}
              >
                <span
                  className={cn(
                    "metric text-[12.5px] font-bold",
                    inMonth ? "text-ink-2" : "text-ink-3",
                    today && "text-brand",
                  )}
                >
                  {inMonth ? day : day <= 0 ? 31 + day : day - 30}
                </span>
                <div className="mt-1.5 space-y-1">
                  {dayEvents.map((e) => (
                    <div key={e.label.en} className="truncate">
                      <Pill tone={e.tone}>{lang === "he" ? e.label.he : e.label.en}</Pill>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
