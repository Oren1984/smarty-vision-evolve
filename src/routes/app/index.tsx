import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, AlertTriangle, Clock, Users, Boxes } from "lucide-react";
import { Card, CardHead, Pill, PageTitle, Btn } from "@/components/smarty/kit";
import { useShell } from "@/lib/smarty-shell";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "SMARTY Console — Operations Dashboard" },
      {
        name: "description",
        content:
          "SMARTY management console dashboard: workforce KPIs, check-in coverage trends and live inventory alerts.",
      },
      { property: "og:title", content: "SMARTY Console — Operations Dashboard" },
      {
        property: "og:description",
        content: "Workforce KPIs, coverage trends and live inventory alerts in one console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { he: "סשנים פעילים", en: "Active sessions", value: "128", delta: "+12.4%", up: true, icon: Clock },
  { he: "עובדים בשטח", en: "Workers on shift", value: "42", delta: "+3", up: true, icon: Users },
  { he: "התראות מלאי", en: "Inventory alerts", value: "17", delta: "+5", up: false, icon: Boxes },
  {
    he: "עמידה בחוזים",
    en: "Contract compliance",
    value: "96.8%",
    delta: "-0.4%",
    up: false,
    icon: AlertTriangle,
  },
];

const series = [18, 26, 22, 34, 30, 44, 38, 52, 47, 61, 55, 72];

function AreaChart({ color = "var(--smarty-brand)" }: { color?: string }) {
  const w = 640;
  const h = 180;
  const max = Math.max(...series) * 1.15;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * w,
    h - (v / max) * h,
  ]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]!.toFixed(1)},${p[1]!.toFixed(1)}`).join(" ");
  const id = color.includes("cyan") ? "gcyan" : "gbrand";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[180px] w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={w}
          y1={h * g}
          y2={h * g}
          stroke="var(--smarty-border)"
          strokeWidth="1"
        />
      ))}
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

const alerts = [
  { name: "QA Sample Inventory Item", type: "Stock pull", alert: 5, qoh: 0, tone: "danger" },
  { name: "QA-SEED Above Threshold Item", type: "Stock pull", alert: 20, qoh: 34, tone: "success" },
  { name: "QA-SEED At Threshold Item", type: "Stock pull", alert: 20, qoh: 20, tone: "warn" },
  { name: "QA-SEED Below Threshold Item", type: "Stock pull", alert: 20, qoh: 6, tone: "danger" },
  { name: "QA-SEED Long Name Item — Extended", type: "Consumable", alert: 12, qoh: 11, tone: "warn" },
] as const;

function Dashboard() {
  const { lang, t } = useShell();

  return (
    <>
      <PageTitle
        eyebrow={t({ he: "סקירה תפעולית", en: "Operations overview" })}
        title={t({ he: "לוח בקרה", en: "Dashboard" })}
        sub={t({
          he: "תמונת מצב חיה של סשנים, נוכחות והתראות מלאי בכל האתרים.",
          en: "Live picture of sessions, attendance and inventory alerts across all sites.",
        })}
        action={
          <div className="flex gap-2">
            <Btn variant="secondary" size="sm">
              {t({ he: "השבוע", en: "This week" })}
            </Btn>
            <Btn size="sm">{t({ he: "ייצוא סיכום", en: "Export summary" })}</Btn>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.en}>
            <div className="flex items-start justify-between">
              <p className="text-[12.5px] font-semibold text-ink-2">
                {lang === "he" ? k.he : k.en}
              </p>
              <span className="grid size-8 place-items-center rounded-[8px] bg-brand-soft text-brand">
                <k.icon className="size-[17px]" />
              </span>
            </div>
            <p className="metric mt-3 text-[32px] font-bold leading-none text-ink">{k.value}</p>
            <p
              className={`mt-2 flex items-center gap-1 text-[12.5px] font-bold ${
                k.up ? "text-success" : "text-danger"
              }`}
            >
              {k.up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
              <span className="metric">{k.delta}</span>
              <span className="font-normal text-ink-3">
                {t({ he: "מול שבוע קודם", en: "vs last week" })}
              </span>
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHead
            title={t({ he: "צ׳ק אין — שעות מכוסות", en: "Check In — hours covered" })}
            hint={t({ he: "12 השבועות האחרונים", en: "Last 12 weeks" })}
            action={<Pill tone="brand">{t({ he: "שעות", en: "Hours" })}</Pill>}
          />
          <AreaChart />
        </Card>
        <Card>
          <CardHead
            title={t({ he: "סשנים — ממתינים", en: "Sessions — pending" })}
            hint={t({ he: "מחכים לאישור מנהל", en: "Awaiting manager approval" })}
          />
          <AreaChart color="var(--smarty-cyan)" />
          <div className="mt-4 space-y-2">
            {[
              { he: "אושרו היום", en: "Approved today", v: "38", tone: "success" as const },
              { he: "ממתינים", en: "Pending", v: "9", tone: "warn" as const },
              { he: "נדחו", en: "Rejected", v: "2", tone: "danger" as const },
            ].map((r) => (
              <div
                key={r.en}
                className="flex items-center justify-between rounded-[8px] bg-surface-2 px-3 py-2"
              >
                <span className="text-[13px] text-ink-2">{lang === "he" ? r.he : r.en}</span>
                <Pill tone={r.tone}>
                  <span className="metric">{r.v}</span>
                </Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-4" padded={false}>
        <div className="p-5 pb-0">
          <CardHead
            title={t({ he: "מלאי — התראות", en: "Inventory — alerts" })}
            hint={t({
              he: "פריטים שחרגו מרמת ההתראה שהוגדרה",
              en: "Items at or below their configured alert level",
            })}
            action={
              <Btn variant="secondary" size="sm">
                {t({ he: "כל ההתראות", en: "View all alerts" })}
              </Btn>
            }
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="border-y border-line bg-surface-2">
                {[
                  { he: "שם", en: "Name" },
                  { he: "סוג מלאי", en: "Stock type" },
                  { he: "רמת התראה", en: "Quantity alert" },
                  { he: "יתרה", en: "QoH" },
                  { he: "מצב", en: "Status" },
                ].map((c) => (
                  <th
                    key={c.en}
                    className="px-5 py-2.5 text-start text-[11px] font-bold uppercase tracking-[0.04em] text-ink-3"
                  >
                    {lang === "he" ? c.he : c.en}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.name} className="border-b border-line hover:bg-surface-2">
                  <td className="px-5 py-3 text-[13.5px] font-semibold text-brand">{a.name}</td>
                  <td className="px-5 py-3 text-[13.5px] text-ink-2">{a.type}</td>
                  <td className="metric px-5 py-3 text-[13.5px] text-ink">{a.alert}</td>
                  <td className="metric px-5 py-3 text-[13.5px] font-bold text-ink">{a.qoh}</td>
                  <td className="px-5 py-3">
                    <Pill tone={a.tone}>
                      {a.tone === "danger"
                        ? t({ he: "חסר", en: "Critical" })
                        : a.tone === "warn"
                          ? t({ he: "בסף", en: "At threshold" })
                          : t({ he: "תקין", en: "Healthy" })}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
