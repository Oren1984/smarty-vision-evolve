import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Card, CardHead, PageTitle, Btn, Field, SelectInput, TextInput, Pill } from "@/components/smarty/kit";
import { useShell } from "@/lib/smarty-shell";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "SMARTY Console — Reports & Status" },
      {
        name: "description",
        content:
          "Filter SMARTY reports by date, questionnaire and product group, then review coverage and counter charts.",
      },
      { property: "og:title", content: "SMARTY Console — Reports & Status" },
      {
        property: "og:description",
        content: "Coverage, counter and activity reporting for SMARTY operations teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

function Bars({ color, data }: { color: string; data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-[180px] items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className="w-full rounded-t-[6px]"
            style={{ height: `${(v / max) * 150}px`, background: color, opacity: 0.85 }}
          />
          <span className="metric text-[10.5px] text-ink-3">{v}</span>
        </div>
      ))}
    </div>
  );
}

function ReportsPage() {
  const { t } = useShell();
  return (
    <>
      <PageTitle
        eyebrow={t({ he: "דוחות", en: "Reports" })}
        title={t({ he: "דוחות — סטטוס", en: "Reports — status" })}
        sub={t({
          he: "בחרו תאריך, שאלון וקבוצת מוצרים כדי לחשב את הדוחות מחדש.",
          en: "Pick a date, questionnaire and product group to recalculate the reports.",
        })}
      />

      <Card className="mb-4">
        <div className="grid items-end gap-4 lg:grid-cols-4">
          <Field label={t({ he: "תאריך", en: "Date" })} required>
            <TextInput type="date" defaultValue="2026-09-01" />
          </Field>
          <Field label={t({ he: "שאלון", en: "Questionnaire" })}>
            <SelectInput options={["QA-SEED Daily Checklist", "Weekly compliance audit"]} />
          </Field>
          <Field label={t({ he: "קבוצת מוצרים", en: "Product Group" })}>
            <SelectInput options={["All", "Consumables", "Stock pull"]} />
          </Field>
          <Btn size="lg">
            <Search className="size-4" />
            {t({ he: "חיפוש", en: "Search" })}
          </Btn>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHead
            title={t({ he: "צ׳ק אין — שעות מכוסות", en: "Check In — hours covered" })}
            action={<Pill tone="brand">{t({ he: "שעות", en: "Hours" })}</Pill>}
          />
          <Bars color="var(--smarty-brand)" data={[6, 7.5, 8, 5.5, 8, 7, 4]} />
        </Card>
        <Card>
          <CardHead
            title={t({ he: "צ׳ק אין — מונה", en: "Check In — counter" })}
            action={<Pill tone="info">{t({ he: "סה״כ", en: "Total" })}</Pill>}
          />
          <Bars color="var(--smarty-cyan)" data={[12, 18, 15, 22, 19, 26, 11]} />
        </Card>
        <Card className="lg:col-span-2">
          <CardHead
            title={t({ he: "דוחות — פעילות משתמשים בשבוע האחרון", en: "Reports — last week users activity" })}
            hint={t({ he: "לפי משתמש, בדקות עבודה מדווחות", en: "Per user, in reported working minutes" })}
          />
          <Bars color="var(--smarty-info)" data={[240, 310, 180, 420, 360, 290, 150, 330]} />
        </Card>
      </div>
    </>
  );
}
