import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  Boxes,
  FileCheck2,
  Bot,
  ShieldCheck,
  Languages,
  Check,
  ArrowRight,
  Building2,
  Sun,
  Moon,
  Contrast,
} from "lucide-react";
import { SmartyShellProvider, useShell } from "@/lib/smarty-shell";
import { Btn, Card, Field, TextInput, SelectInput, Pill } from "@/components/smarty/kit";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMARTY — Workforce, Inventory & Contract Compliance Platform" },
      {
        name: "description",
        content:
          "SMARTY unifies workforce time clock, real-time inventory alerts, contract compliance analysis and an AI business assistant for field-service operations.",
      },
      { property: "og:title", content: "SMARTY — Workforce & Field Operations Platform" },
      {
        property: "og:description",
        content:
          "Time clock, live inventory alerts, contract compliance and AI business assistance in one Hebrew-first platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SmartyShellProvider>
      <Marketing />
    </SmartyShellProvider>
  ),
});

const features = [
  {
    icon: Clock,
    he: { t: "שעון נוכחות לעובדי שטח", d: "החתמות QR, הפסקות ואישור שעות — מסונכרן לכל אתר ומשמרת." },
    en: { t: "Workforce Time Clock", d: "QR badge punches, breaks and hour approvals — synced across every site and shift." },
    kpi: "99.4%",
    kpiHe: "דיוק החתמות",
    kpiEn: "punch accuracy",
  },
  {
    icon: Boxes,
    he: { t: "התראות מלאי בזמן אמת", d: "רמות סף לכל פריט, התראות חוסר וספירות מתוך הסשן בשטח." },
    en: { t: "Real-time Inventory Alerts", d: "Per-item thresholds, shortage alerts and counts captured inside the field session." },
    kpi: "17",
    kpiHe: "התראות פתוחות",
    kpiEn: "open alerts",
  },
  {
    icon: FileCheck2,
    he: { t: "ניתוח עמידה בחוזים", d: "השוואת ביצוע בשטח מול התחייבויות חוזיות, עם ראיות לכל בדיקה." },
    en: { t: "Contract Compliance", d: "Compare delivered work against contractual commitments, with evidence per check." },
    kpi: "96.8%",
    kpiHe: "עמידה ביעדים",
    kpiEn: "compliance rate",
  },
  {
    icon: Bot,
    he: { t: "עוזר עסקי חכם", d: "שאלות בשפה חופשית על מלאי, חשבוניות וסדר עדיפויות — קריאה בלבד." },
    en: { t: "AI Business Assistant", d: "Ask plain-language questions about inventory, invoices and priorities — read-only." },
    kpi: "24/7",
    kpiHe: "זמינות",
    kpiEn: "availability",
  },
];

function Marketing() {
  const { lang, setLang, t, theme, setTheme } = useShell();
  const [active, setActive] = useState(0);
  const feature = features[active]!;
  const copy = lang === "he" ? feature.he : feature.en;

  return (
    <div className="min-h-screen bg-ground">
      <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-6xl items-center gap-3 px-5">
          <span className="grid size-8 place-items-center rounded-[8px] bg-brand text-brand-ink">
            <FileCheck2 className="size-5" />
          </span>
          <span className="text-[20px] font-extrabold tracking-tight text-ink">SMARTY</span>
          <span className="hidden text-[12.5px] text-ink-3 sm:inline">ntms.co.il</span>

          <nav className="ms-auto hidden items-center gap-5 text-[13.5px] font-semibold text-ink-2 lg:flex">
            {[
              { he: "פלטפורמה", en: "Platform", href: "#platform" },
              { he: "יכולות", en: "Capabilities", href: "#capabilities" },
              { he: "אמון ואבטחה", en: "Trust", href: "#trust" },
              { he: "בקשת הדגמה", en: "Request a demo", href: "#demo" },
            ].map((l) => (
              <a key={l.en} href={l.href} className="focus-ring hover:text-ink">
                {lang === "he" ? l.he : l.en}
              </a>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1 lg:ms-4">
            <div className="flex overflow-hidden rounded-[8px] border border-line-2">
              {(["light", "dark", "high-contrast"] as const).map((th) => {
                const Icon = th === "light" ? Sun : th === "dark" ? Moon : Contrast;
                return (
                  <button
                    key={th}
                    type="button"
                    onClick={() => setTheme(th)}
                    aria-label={th}
                    className={cn(
                      "focus-ring p-2",
                      theme === th ? "bg-brand text-brand-ink" : "text-ink-2 hover:bg-surface-2",
                    )}
                  >
                    <Icon className="size-4" />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setLang(lang === "he" ? "en" : "he")}
              className="focus-ring flex items-center gap-1.5 rounded-[8px] border border-line-2 px-2.5 py-2 text-[12.5px] font-bold text-ink-2 hover:bg-surface-2"
            >
              <Languages className="size-4" />
              {lang === "he" ? "עברית / EN" : "EN / עברית"}
            </button>
            <Link
              to="/app"
              className="focus-ring ms-1 hidden rounded-[8px] bg-brand px-4 py-2 text-[13px] font-bold text-brand-ink shadow-sm sm:block"
            >
              {t({ he: "כניסה לקונסולה", en: "Console login" })}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="platform" className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Pill tone="brand">{t({ he: "פלטפורמת NTMS · גרסה 2.5", en: "NTMS platform · v2.5" })}</Pill>
            <h1 className="mt-4 text-[38px] font-extrabold leading-[1.1] text-ink sm:text-[52px]">
              {t({
                he: "שליטה מלאה בעובדי השטח, במלאי ובעמידה בחוזים.",
                en: "Total control over field teams, inventory and contract commitments.",
              })}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-2">
              {t({
                he: "SMARTY מאחדת שעון נוכחות, טפסי בדיקה, התראות מלאי וניתוח חוזים בקונסולה אחת — עברית ואנגלית, שולחני ומובייל.",
                en: "SMARTY unifies time clock, inspection forms, inventory alerts and contract analysis in one console — Hebrew and English, desktop and mobile.",
              })}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#demo" className="focus-ring">
                <Btn size="lg">
                  {t({ he: "בקשת הדגמה", en: "Request a demo" })}
                  <ArrowRight className="size-4 rtl:-scale-x-100" />
                </Btn>
              </a>
              <Link to="/app" className="focus-ring">
                <Btn size="lg" variant="secondary">
                  {t({ he: "צפייה בקונסולה החיה", en: "See the live console" })}
                </Btn>
              </Link>
            </div>
            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { v: "1,400+", he: "עובדי שטח", en: "field workers" },
                { v: "62", he: "אתרים מנוהלים", en: "managed sites" },
                { v: "4.1M", he: "בדיקות שהוגשו", en: "checks submitted" },
              ].map((s) => (
                <div key={s.en}>
                  <dt className="metric text-[24px] font-bold text-ink">{s.v}</dt>
                  <dd className="text-[12.5px] text-ink-2">{lang === "he" ? s.he : s.en}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Live product preview */}
          <div className="surface-card overflow-hidden shadow-md">
            <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-danger" />
              <span className="size-2.5 rounded-full bg-warn" />
              <span className="size-2.5 rounded-full bg-success" />
              <span className="metric ms-2 text-[11.5px] text-ink-3">smarty.ntms.co.il/MGMT</span>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <button
                  key={f.en.t}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "focus-ring rounded-[12px] border p-3 text-start",
                    i === active
                      ? "border-brand bg-brand-soft"
                      : "border-line bg-surface hover:bg-surface-2",
                  )}
                >
                  <f.icon className={cn("size-[18px]", i === active ? "text-brand" : "text-ink-3")} />
                  <p className="metric mt-2 text-[22px] font-bold leading-none text-ink">{f.kpi}</p>
                  <p className="mt-1 text-[11.5px] text-ink-2">{lang === "he" ? f.kpiHe : f.kpiEn}</p>
                </button>
              ))}
            </div>
            <div className="border-t border-line bg-surface-2 p-4">
              <p className="text-[14.5px] font-bold text-ink">{copy.t}</p>
              <p className="mt-1 text-[13px] text-ink-2">{copy.d}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{ width: `${25 * (active + 1)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature matrix */}
      <section id="capabilities" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-[28px] font-extrabold text-ink">
          {t({ he: "מטריצת יכולות", en: "Capability matrix" })}
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] text-ink-2">
          {t({
            he: "כל מודול עובד לבד — וטוב יותר יחד. בחרו מודול כדי לראות מה נכלל.",
            en: "Every module stands alone — and works better together. Pick a module to see what's included.",
          })}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((f, i) => {
            const c = lang === "he" ? f.he : f.en;
            return (
              <Card key={f.en.t} className={cn(i === active && "border-brand shadow-sm")}>
                <span className="grid size-10 place-items-center rounded-[12px] bg-cyan-soft text-cyan">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-3.5 text-[16px] font-bold text-ink">{c.t}</h3>
                <p className="mt-1.5 text-[13.5px] text-ink-2">{c.d}</p>
                <ul className="mt-4 space-y-1.5 text-[13px] text-ink-2">
                  {[
                    { he: "דוחות וייצוא ל-Excel / PDF", en: "Reporting and Excel / PDF export" },
                    { he: "הרשאות לפי תפקיד", en: "Role-based permissions" },
                    { he: "עברית ואנגלית מלאות", en: "Full Hebrew and English" },
                  ].map((li) => (
                    <li key={li.en} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      {lang === "he" ? li.he : li.en}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="border-y border-line bg-surface py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-center text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-3">
            {t({ he: "אמון, אבטחה ונגישות", en: "Trust, security and accessibility" })}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, he: "ISO 27001 · הצפנה בתעבורה ובמנוחה", en: "ISO 27001 · encrypted in transit and at rest" },
              { icon: Check, he: "WCAG 2.2 AA · מצב ניגודיות גבוהה", en: "WCAG 2.2 AA · high-contrast mode" },
              { icon: Languages, he: "עברית RTL כברירת מחדל", en: "Hebrew RTL by default" },
              { icon: Building2, he: "פריסה On-prem או ענן", en: "On-prem or cloud deployment" },
            ].map((b) => (
              <div
                key={b.en}
                className="flex items-start gap-3 rounded-[12px] border border-line bg-surface-2 p-4"
              >
                <b.icon className="mt-0.5 size-5 shrink-0 text-brand" />
                <p className="text-[13.5px] font-semibold text-ink">{lang === "he" ? b.he : b.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo form */}
      <section id="demo" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[28px] font-extrabold text-ink">
              {t({ he: "נקבע הדגמה", en: "Book a demo" })}
            </h2>
            <p className="mt-3 max-w-lg text-[15px] text-ink-2">
              {t({
                he: "30 דקות עם מהנדס פתרונות: נעבור על תהליכי השטח שלכם ונראה כיצד SMARTY מתאימה אליהם.",
                en: "30 minutes with a solutions engineer: we walk your field processes and map SMARTY onto them.",
              })}
            </p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-ink-2">
              {[
                { he: "ללא התחייבות והתקנה", en: "No commitment, no install" },
                { he: "סביבת בדיקה עם נתוני דוגמה", en: "Sandbox with sample data" },
                { he: "הערכת עלות תוך 48 שעות", en: "Cost estimate within 48 hours" },
              ].map((li) => (
                <li key={li.en} className="flex items-center gap-2">
                  <Check className="size-4 text-success" />
                  {lang === "he" ? li.he : li.en}
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <Field label={t({ he: "שם מלא", en: "Full name" })} required>
                <TextInput placeholder={t({ he: "אורן סלמי", en: "Oren Salami" })} />
              </Field>
              <Field label={t({ he: "חברה", en: "Company" })} required>
                <TextInput placeholder="NTMS" />
              </Field>
              <Field label={t({ he: "דוא״ל עבודה", en: "Work email" })} required>
                <TextInput type="email" placeholder="you@company.co.il" />
              </Field>
              <Field label={t({ he: "טלפון", en: "Phone" })}>
                <TextInput placeholder="+972 5x-xxx-xxxx" />
              </Field>
              <Field label={t({ he: "מספר עובדי שטח", en: "Field workers" })}>
                <SelectInput options={["1–25", "26–100", "101–500", "500+"]} />
              </Field>
              <Field label={t({ he: "מודול מרכזי", en: "Primary module" })}>
                <SelectInput
                  options={
                    lang === "he"
                      ? ["שעון נוכחות", "מלאי", "עמידה בחוזים", "עוזר AI"]
                      : ["Time Clock", "Inventory", "Contract Compliance", "AI Assistant"]
                  }
                />
              </Field>
              <div className="sm:col-span-2">
                <Btn type="submit" size="lg" className="w-full">
                  {t({ he: "שליחת בקשה להדגמה", en: "Request demo" })}
                </Btn>
                <p className="mt-2 text-[11.5px] text-ink-3">
                  {t({
                    he: "בשליחת הטופס אתם מאשרים יצירת קשר בנוגע לבקשה זו בלבד.",
                    en: "By submitting you agree to be contacted about this request only.",
                  })}
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>

      <footer className="border-t border-line bg-surface py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-[12.5px] text-ink-3">
          <span>© 2026 NTMS · SMARTY</span>
          <Link to="/app" className="focus-ring font-semibold text-brand hover:underline">
            {t({ he: "קונסולת ניהול", en: "Management console" })}
          </Link>
        </div>
      </footer>
    </div>
  );
}
