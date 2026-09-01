import { createFileRoute } from "@tanstack/react-router";
import {
  Plus,
  ShieldCheck,
  Copy,
  Printer,
  FileText,
  FileSpreadsheet,
  Columns3,
  SlidersHorizontal,
  Search,
  Pencil,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Card, PageTitle, Pill, Btn, InfoBar, TextInput } from "@/components/smarty/kit";
import { useShell } from "@/lib/smarty-shell";

export const Route = createFileRoute("/app/users")({
  head: () => ({
    meta: [
      { title: "SMARTY Console — Users & Roles" },
      {
        name: "description",
        content:
          "Manage SMARTY console users, role assignments and access with searchable, exportable enterprise data tables.",
      },
      { property: "og:title", content: "SMARTY Console — Users & Roles" },
      {
        property: "og:description",
        content: "Searchable, exportable user and role administration for the SMARTY console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UsersPage,
});

const rows = [
  { user: "admin.local@smarty.test", name: "Admin Local", role: "admin", tone: "brand", active: true, lastBreak: "—" },
  { user: "qa.approver@smarty.test", name: "QA Approver", role: "approver", tone: "info", active: true, lastBreak: "—" },
  { user: "qa.attendancemgr@smarty.test", name: "QA Attendance Manager", role: "attendanceManager", tone: "info", active: true, lastBreak: "—" },
  { user: "qa.employee@smarty.test", name: "QA Employee", role: "employee", tone: "success", active: true, lastBreak: "21/08/2026 01:54 → 02:09" },
  { user: "qa.finance@smarty.test", name: "QA Finance User", role: "finance", tone: "warn", active: true, lastBreak: "—" },
  { user: "qa.hradmin@smarty.test", name: "QA HR Admin", role: "hrAdmin", tone: "info", active: true, lastBreak: "—" },
  { user: "qa.inventoryviewer@smarty.test", name: "QA Inventory Viewer", role: "inventoryViewer", tone: "success", active: false, lastBreak: "—" },
  { user: "qa.norole@smarty.test", name: "QA No-Role User", role: "—", tone: "danger", active: false, lastBreak: "—" },
  { user: "qa.service@smarty.test", name: "QA Service Account", role: "service", tone: "info", active: true, lastBreak: "—" },
] as const;

export function DataToolbar() {
  const { t } = useShell();
  const exports = [
    { icon: Copy, label: t({ he: "העתקה", en: "Copy" }) },
    { icon: Printer, label: t({ he: "הדפסה", en: "Print" }) },
    { icon: FileText, label: "CSV" },
    { icon: FileSpreadsheet, label: "XLSX" },
    { icon: FileText, label: "PDF" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
      <label className="flex items-center gap-2 text-[12.5px] text-ink-2">
        {t({ he: "הצג", en: "Show" })}
        <select className="focus-ring rounded-[8px] border border-line-2 bg-surface px-2 py-1 text-[13px] text-ink">
          {["10", "25", "50", "100"].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
        {t({ he: "רשומות", en: "entries" })}
      </label>

      <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-3 start-3 size-4" />
        <TextInput
          placeholder={t({ he: "חיפוש...", en: "Search..." })}
          className="ps-9"
          aria-label={t({ he: "חיפוש בטבלה", en: "Search table" })}
        />
      </div>

      <div className="ms-auto flex items-center gap-1">
        {exports.map((e) => (
          <button
            key={e.label}
            type="button"
            title={e.label}
            className="focus-ring flex items-center gap-1.5 rounded-[8px] border border-line-2 px-2.5 py-1.5 text-[11.5px] font-bold text-ink-2 hover:bg-surface-2 hover:text-ink"
          >
            <e.icon className="size-4" />
            <span className="hidden lg:inline">{e.label}</span>
          </button>
        ))}
        <button
          type="button"
          className="focus-ring rounded-[8px] border border-line-2 p-1.5 text-ink-2 hover:bg-surface-2"
          aria-label="columns"
        >
          <Columns3 className="size-4" />
        </button>
        <button
          type="button"
          className="focus-ring rounded-[8px] border border-line-2 p-1.5 text-ink-2 hover:bg-surface-2"
          aria-label="filters"
        >
          <SlidersHorizontal className="size-4" />
        </button>
      </div>
    </div>
  );
}

function UsersPage() {
  const { lang, t } = useShell();
  const cols = [
    { he: "שם משתמש", en: "User Name" },
    { he: "שם לתצוגה", en: "Display Name" },
    { he: "שפה", en: "Language" },
    { he: "דוא״ל", en: "Email" },
    { he: "תפקידים", en: "Roles" },
    { he: "הפסקה אחרונה", en: "Last Break" },
    { he: "פעיל", en: "Active" },
    { he: "פעולות", en: "Actions" },
  ];

  return (
    <>
      <InfoBar link={t({ he: "מאמר עזרה", en: "Help article" })}>
        {t({
          he: "לכל משתמש נדרש תפקיד אחד לפחות. השתמשו ב-Viewer לגישת קריאה בלבד.",
          en: "Each user needs at least one role. Use Viewer for read-only access.",
        })}
      </InfoBar>

      <PageTitle
        eyebrow={t({ he: "ניהול", en: "Administration" })}
        title={t({ he: "משתמשים", en: "Users" })}
        sub={t({
          he: "ניהול חשבונות, תפקידים והרשאות גישה לקונסולת SMARTY.",
          en: "Manage accounts, roles and console access for SMARTY.",
        })}
        action={
          <div className="flex gap-2">
            <Btn>
              <Plus className="size-4" />
              {t({ he: "משתמש חדש", en: "Create new user" })}
            </Btn>
            <Btn variant="secondary">
              <ShieldCheck className="size-4" />
              {t({ he: "תפקידים", en: "Roles" })}
            </Btn>
          </div>
        }
      />

      <Card padded={false}>
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
                <tr key={r.user} className="border-b border-line hover:bg-surface-2">
                  <td className="px-4 py-3 text-[13px] text-ink">
                    <span className="flex items-center gap-1.5">
                      <ChevronRight className="size-3.5 text-ink-3 rtl:-scale-x-100" />
                      {r.user}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] font-semibold text-brand">{r.name}</td>
                  <td className="px-4 py-3 text-[13px] text-ink-2">
                    {t({ he: "ברירת מחדל", en: "Default" })}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-2">{r.user}</td>
                  <td className="px-4 py-3">
                    <Pill tone={r.tone}>{r.role}</Pill>
                  </td>
                  <td className="metric px-4 py-3 text-[12.5px] text-ink-2">{r.lastBreak}</td>
                  <td className="px-4 py-3">
                    <Pill tone={r.active ? "success" : "danger"}>
                      {r.active ? t({ he: "פעיל", en: "Active" }) : t({ he: "מושבת", en: "Disabled" })}
                    </Pill>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Btn variant="secondary" size="sm">
                        <Pencil className="size-3.5" />
                        {t({ he: "עריכה", en: "Edit" })}
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
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-[12.5px] text-ink-2">
          <span>
            {t({ he: "מוצגות 1–9 מתוך 24 רשומות", en: "Showing 1 to 9 of 24 entries" })}
          </span>
          <div className="flex gap-1">
            <Btn variant="secondary" size="sm">
              {t({ he: "הקודם", en: "Previous" })}
            </Btn>
            {["1", "2", "3"].map((p) => (
              <Btn key={p} variant={p === "1" ? "primary" : "secondary"} size="sm">
                <span className="metric">{p}</span>
              </Btn>
            ))}
            <Btn variant="secondary" size="sm">
              {t({ he: "הבא", en: "Next" })}
            </Btn>
          </div>
        </div>
      </Card>
    </>
  );
}
