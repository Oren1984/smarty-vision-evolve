import { createFileRoute } from "@tanstack/react-router";
import { Plus, Megaphone, Pencil, EyeOff, Trash2 } from "lucide-react";
import { Card, PageTitle, Pill, Btn } from "@/components/smarty/kit";
import { DataToolbar } from "./users";
import { useShell } from "@/lib/smarty-shell";

export const Route = createFileRoute("/app/updates")({
  head: () => ({
    meta: [
      { title: "SMARTY Console — System Updates" },
      {
        name: "description",
        content:
          "Official SMARTY communications: releases, feature updates, planned maintenance windows and service incidents.",
      },
      { property: "og:title", content: "SMARTY Console — System Updates" },
      {
        property: "og:description",
        content: "Releases, maintenance windows and service incidents published to all tenants.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UpdatesPage,
});

const rows = [
  {
    at: "21/06/2026 19:53",
    type: "Update",
    tone: "brand",
    title: "QA-SEED SMARTY 2.4 Feature Update",
    msg: "Rolled out improved Smart Table filtering and RTL layout fixes across the MGMT area.",
    version: "2.4.0",
  },
  {
    at: "30/07/2026 19:53",
    type: "Release",
    tone: "success",
    title: "QA-SEED SMARTY 2.5 Release Notes",
    msg: "New Contract Compliance & Analysis module and Workforce Time Clock QR badges are now generally available.",
    version: "2.5.0",
  },
  {
    at: "05/08/2026 19:53",
    type: "Release",
    tone: "success",
    title: "QA-SEED עדכון מערכת בעברית",
    msg: "גרסה חדשה של המערכת שוחררה, כולל שיפורים בתמיכה בעברית וב-RTL בטבלאות ובדוחות.",
    version: "2.5.1-he",
  },
  {
    at: "10/08/2026 19:53",
    type: "Important",
    tone: "warn",
    title: "QA-SEED Password Policy Reminder",
    msg: "Reminder: all accounts must complete MFA enrollment within 30 days per the updated security policy.",
    version: "—",
  },
  {
    at: "15/08/2026 19:53",
    type: "Maintenance",
    tone: "info",
    title: "QA-SEED Scheduled Database Maintenance",
    msg: "A short maintenance window is planned for routine index maintenance and backups. No downtime expected.",
    version: "—",
  },
  {
    at: "18/08/2026 19:53",
    type: "Incident",
    tone: "danger",
    title: "QA-SEED Investigating Elevated Report Latency",
    msg: "We are investigating slower-than-normal report export times for a subset of tenants.",
    version: "—",
  },
] as const;

function UpdatesPage() {
  const { lang, t } = useShell();
  const cols = [
    { he: "פורסם", en: "Published At" },
    { he: "סוג", en: "Type" },
    { he: "כותרת", en: "Title" },
    { he: "הודעה", en: "Message" },
    { he: "גרסה", en: "Version" },
    { he: "מצב", en: "Status" },
    { he: "פעולות", en: "Actions" },
  ];

  return (
    <>
      <PageTitle
        eyebrow={t({ he: "תקשורת מערכת", en: "System communications" })}
        title={t({ he: "עדכוני מערכת SMARTY", en: "SMARTY System Updates" })}
        sub={t({
          he: "הודעות רשמיות מ-SMARTY: שדרוגים, גרסאות, תחזוקה מתוכננת ותקריות שירות.",
          en: "Official communications from SMARTY: upgrades, releases, planned maintenance, and service incidents.",
        })}
        action={
          <Btn>
            <Plus className="size-4" />
            {t({ he: "הודעה חדשה", en: "New Announcement" })}
          </Btn>
        }
      />

      <Card padded={false}>
        <div className="flex items-center gap-2 px-5 pt-4 text-ink-2">
          <Megaphone className="size-[18px] text-brand" />
          <span className="text-[13px] font-semibold">
            {t({ he: "24 הודעות פורסמו", en: "24 announcements published" })}
          </span>
        </div>
        <DataToolbar />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-2">
                {cols.map((c) => (
                  <th
                    key={c.en}
                    className="whitespace-nowrap border-b border-line px-4 py-2.5 text-start text-[11px] font-bold uppercase tracking-[0.04em] text-ink-3"
                  >
                    {lang === "he" ? c.he : c.en}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.title} className="border-b border-line align-top hover:bg-surface-2">
                  <td className="metric whitespace-nowrap px-4 py-3 text-[12.5px] text-ink-2">
                    {r.at}
                  </td>
                  <td className="px-4 py-3">
                    <Pill tone={r.tone}>{r.type}</Pill>
                  </td>
                  <td className="px-4 py-3 text-[13.5px] font-semibold text-ink">{r.title}</td>
                  <td className="max-w-sm px-4 py-3 text-[13px] text-ink-2">{r.msg}</td>
                  <td className="metric px-4 py-3 text-[12.5px] text-ink">{r.version}</td>
                  <td className="px-4 py-3">
                    <Pill tone="success">{t({ he: "פורסם", en: "Published" })}</Pill>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Btn variant="secondary" size="sm">
                        <Pencil className="size-3.5" />
                        {t({ he: "עריכה", en: "Edit" })}
                      </Btn>
                      <Btn variant="ghost" size="sm">
                        <EyeOff className="size-3.5" />
                        {t({ he: "ביטול פרסום", en: "Unpublish" })}
                      </Btn>
                      <Btn variant="danger" size="sm">
                        <Trash2 className="size-3.5" />
                        {t({ he: "מחיקה", en: "Delete" })}
                      </Btn>
                    </div>
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
