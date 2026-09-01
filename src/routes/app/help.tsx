import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  ShieldCheck,
  ListChecks,
  Package,
  Clock,
  FileText,
  Bot,
  BookOpen,
} from "lucide-react";
import { PageTitle, Card, Btn } from "@/components/smarty/kit";
import { useShell } from "@/lib/smarty-shell";

export const Route = createFileRoute("/app/help")({
  head: () => ({
    meta: [
      { title: "SMARTY Console — Help Center" },
      {
        name: "description",
        content:
          "Guides for SMARTY roles and permissions, question groups, inventory, time clock and contract compliance.",
      },
      { property: "og:title", content: "SMARTY Console — Help Center" },
      {
        property: "og:description",
        content: "Answers, guides and tips for administrators and field teams using SMARTY.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});

const sections = [
  {
    he: "ניהול",
    en: "Administration",
    items: [
      {
        icon: ShieldCheck,
        he: { t: "תפקידים והרשאות", d: "כיצד תפקידים קובעים מה כל משתמש רואה ועושה ב-SMARTY." },
        en: {
          t: "Roles and Permissions",
          d: "Understand how roles control what each user can see and do in SMARTY.",
        },
      },
      {
        icon: FileText,
        he: { t: "ניתוח עמידה בחוזים", d: "השוואת ביצועים בשטח מול התחייבויות חוזיות." },
        en: {
          t: "Contract Compliance",
          d: "Compare field performance against contractual commitments.",
        },
      },
    ],
  },
  {
    he: "הגדרות",
    en: "Configuration",
    items: [
      {
        icon: ListChecks,
        he: { t: "קבוצות שאלות", d: "הגדרת מקבצי שאלות לשימוש חוזר המוקצים לעובדי שטח." },
        en: {
          t: "Question Groups",
          d: "Configure reusable question sets (forms) assigned to field workers.",
        },
      },
      {
        icon: Package,
        he: { t: "מוצרים ומלאי", d: "מעקב מוצרים פיזיים וניהול מלאי דרך סשנים." },
        en: {
          t: "Products and Inventory",
          d: "Track physical products and manage inventory through SMARTY sessions.",
        },
      },
      {
        icon: Clock,
        he: { t: "שעון נוכחות", d: "החתמות QR, הפסקות ואישור שעות עבודה." },
        en: { t: "Workforce Time Clock", d: "QR badge punches, breaks and hour approvals." },
      },
      {
        icon: Bot,
        he: { t: "עוזר עסקי חכם", d: "שאילתות קריאה בלבד על מלאי, חשבוניות והמלצות." },
        en: {
          t: "AI Business Assistant",
          d: "Read-only questions about inventory, invoices and priorities.",
        },
      },
    ],
  },
];

function HelpPage() {
  const { lang, t } = useShell();

  return (
    <>
      <div className="mb-6 overflow-hidden rounded-[16px] bg-brand p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="min-w-[240px] flex-1 text-brand-ink">
            <h1 className="flex items-center gap-2.5 text-[28px] font-extrabold">
              <BookOpen className="size-7" />
              {t({ he: "מרכז עזרה", en: "Help Center" })}
            </h1>
            <p className="mt-1.5 text-[14.5px] opacity-90">
              {t({
                he: "מדריכים, תשובות וטיפים לשימוש ב-SMARTY.",
                en: "Find answers, guides, and tips for using SMARTY.",
              })}
            </p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-3 start-3 size-[18px]" />
            <input
              className="focus-ring w-full rounded-[12px] border border-line bg-surface py-3 text-[14.5px] text-ink placeholder:text-ink-3 ps-10 pe-4"
              placeholder={t({ he: "חיפוש מאמרי עזרה...", en: "Search help articles..." })}
              aria-label={t({ he: "חיפוש מאמרי עזרה", en: "Search help articles" })}
            />
          </div>
        </div>
      </div>

      <PageTitle
        eyebrow={t({ he: "תיעוד", en: "Documentation" })}
        title={t({ he: "מדריכים לפי נושא", en: "Guides by topic" })}
        action={
          <Btn variant="secondary">{t({ he: "פנייה לתמיכה", en: "Contact support" })}</Btn>
        }
      />

      {sections.map((s) => (
        <div key={s.en} className="mb-7">
          <h2 className="mb-3 border-b border-line pb-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-3">
            {lang === "he" ? s.he : s.en}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {s.items.map((item) => {
              const copy = lang === "he" ? item.he : item.en;
              return (
                <Card key={item.en.t} className="transition-shadow hover:shadow-sm">
                  <span className="grid size-10 place-items-center rounded-[12px] bg-brand-soft text-brand">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="mt-3.5 text-[15.5px] font-bold text-ink">{copy.t}</h3>
                  <p className="mt-1.5 text-[13.5px] text-ink-2">{copy.d}</p>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
