import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, X, Search as SearchIcon, CalendarDays } from "lucide-react";
import {
  Card,
  CardHead,
  PageTitle,
  Btn,
  Field,
  TextInput,
  SelectInput,
  InfoBar,
  Pill,
} from "@/components/smarty/kit";
import { useShell } from "@/lib/smarty-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/questionnaires")({
  head: () => ({
    meta: [
      { title: "SMARTY Console — Enterprise Forms" },
      {
        name: "description",
        content:
          "Create users, build questionnaire templates and run advanced answer searches with SMARTY's enterprise form patterns.",
      },
      { property: "og:title", content: "SMARTY Console — Enterprise Forms" },
      {
        property: "og:description",
        content: "User creation, questionnaire builder and advanced search filters in one surface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FormsPage,
});

function FormsPage() {
  const { t } = useShell();
  const [tab, setTab] = useState(0);
  const tabs = [
    t({ he: "יצירת משתמש", en: "Create User" }),
    t({ he: "יצירת שאלון", en: "Create Questionnaire" }),
    t({ he: "חיפוש מתקדם", en: "Advanced Search" }),
  ];

  return (
    <>
      <InfoBar link={t({ he: "מאמר עזרה", en: "Help article" })}>
        {t({
          he: "קבוצות שאלות הן תבניות טופס. חברו אותן למוצרים כדי שהעובדים יראו את הטפסים הנכונים.",
          en: "Question Groups are form templates. Connect them to products so workers see the right forms.",
        })}
      </InfoBar>

      <PageTitle
        eyebrow={t({ he: "טפסים ארגוניים", en: "Enterprise forms" })}
        title={t({ he: "יצירה וחיפוש", en: "Create & Search" })}
        sub={t({
          he: "תבניות טופס עקביות: היררכיית שדות ברורה, סימון שדות חובה ומצבי מיקוד נגישים.",
          en: "Consistent form patterns: clear field hierarchy, required markers and accessible focus states.",
        })}
      />

      <div className="mb-5 flex gap-1 border-b border-line">
        {tabs.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setTab(i)}
            className={cn(
              "focus-ring -mb-px border-b-2 px-4 py-2.5 text-[13.5px] font-bold",
              i === tab ? "border-brand text-brand" : "border-transparent text-ink-2 hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 0 ? <CreateUser /> : tab === 1 ? <CreateQuestionnaire /> : <AdvancedSearch />}
    </>
  );
}

function FormActions() {
  const { t } = useShell();
  return (
    <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
      <Btn>
        <Save className="size-4" />
        {t({ he: "שמירה", en: "Save" })}
      </Btn>
      <Btn variant="secondary">
        <X className="size-4" />
        {t({ he: "ביטול", en: "Cancel" })}
      </Btn>
      <span className="ms-auto self-center text-[12px] text-ink-3">
        {t({ he: "שדות עם * הם שדות חובה", en: "Fields marked * are required" })}
      </span>
    </div>
  );
}

function CreateUser() {
  const { t } = useShell();
  return (
    <Card className="max-w-4xl">
      <CardHead
        title={t({ he: "יצירת משתמש", en: "Create user" })}
        hint={t({
          he: "לכל משתמש נדרש תפקיד אחד לפחות.",
          en: "Every user needs at least one role.",
        })}
        action={<Pill tone="brand">{t({ he: "ניהול", en: "Administration" })}</Pill>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t({ he: "תפקיד", en: "Role" })} required>
          <SelectInput
            options={[
              "Service agent",
              "Viewer only",
              "External auditor",
              "Approver Only",
              "Inventory viewer only",
            ]}
          />
        </Field>
        <Field label={t({ he: "שם משתמש", en: "User Name" })} required>
          <TextInput placeholder="user@smarty.test" />
        </Field>
        <Field
          label={t({ he: "סיסמה", en: "Password" })}
          required
          hint={t({ he: "לפחות 12 תווים", en: "At least 12 characters" })}
        >
          <TextInput type="password" />
        </Field>
        <Field label={t({ he: "אימות סיסמה", en: "Confirm password" })} required>
          <TextInput type="password" />
        </Field>
        <Field label={t({ he: "שם לתצוגה", en: "Display Name" })}>
          <TextInput defaultValue="Oren Salami" />
        </Field>
        <Field label={t({ he: "שפת ממשק", en: "Interface language" })}>
          <SelectInput options={["עברית (Default)", "English"]} />
        </Field>
        <Field label={t({ he: "טלפון", en: "Phone" })}>
          <TextInput placeholder="+972 5x-xxx-xxxx" />
        </Field>
        <Field label={t({ he: "דוא״ל", en: "Email" })} required>
          <TextInput type="email" placeholder="user@company.co.il" />
        </Field>
      </div>
      <FormActions />
    </Card>
  );
}

function CreateQuestionnaire() {
  const { t } = useShell();
  return (
    <Card className="max-w-4xl">
      <CardHead
        title={t({ he: "יצירת שאלון", en: "Create questionnaire" })}
        hint={t({
          he: "מחזוריות, חזרות וקישור לבקשת בדיקה.",
          en: "Cycle, repetitions and connected check request.",
        })}
        action={<Pill tone="info">{t({ he: "הגדרות", en: "Configuration" })}</Pill>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t({ he: "שם השאלון", en: "Questionnaire name" })} required>
          <TextInput placeholder="QA-SEED Daily Checklist" />
        </Field>
        <Field label={t({ he: "סוג מחזור", en: "Cycle type" })} required>
          <SelectInput options={["Daily", "Weekly", "Monthly", "Per session"]} />
        </Field>
        <Field label={t({ he: "יום בשבוע", en: "Day of week" })}>
          <SelectInput options={["—", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]} />
        </Field>
        <Field label={t({ he: "קבוצת מוצרים", en: "Product group" })}>
          <SelectInput options={["All", "Consumables", "Stock pull", "Equipment"]} />
        </Field>
        <Field label={t({ he: "מינימום חזרות", en: "Minimum repetitions" })}>
          <TextInput type="number" defaultValue={1} />
        </Field>
        <Field label={t({ he: "מקסימום חזרות", en: "Maximum repetitions" })}>
          <TextInput type="number" defaultValue={5} />
        </Field>
        <Field label={t({ he: "בקשת בדיקה מקושרת", en: "Connected check request" })}>
          <SelectInput options={["None", "Daily site check", "Weekly compliance audit"]} />
        </Field>
        <Field label={t({ he: "סטטוס", en: "Status" })}>
          <SelectInput options={["Active", "Draft", "Archived"]} />
        </Field>
      </div>
      <FormActions />
    </Card>
  );
}

function AdvancedSearch() {
  const { t } = useShell();
  const [alert, setAlert] = useState("None");
  const alertTones: Record<string, string> = {
    None: "border-success text-success",
    Warning: "border-warn text-warn",
    Error: "border-danger text-danger",
  };

  return (
    <Card>
      <CardHead
        title={t({ he: "חיפוש תשובות מתקדם", en: "Advanced answers search" })}
        hint={t({
          he: "סננו לפי תאריך וחברה, ולאחר מכן ייצאו ל-Excel.",
          en: "Use date and company filters to narrow results, then export to Excel.",
        })}
      />
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="grid gap-4">
          <Field label={t({ he: "מתאריך", en: "From" })} required>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-3 start-3 size-4" />
              <TextInput type="date" defaultValue="2026-09-01" className="ps-9" />
            </div>
          </Field>
          <Field label={t({ he: "עד תאריך", en: "To" })}>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-3 start-3 size-4" />
              <TextInput type="date" className="ps-9" />
            </div>
          </Field>
        </div>

        <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2">
          <Field label={t({ he: "שאלון", en: "Questionnaire" })}>
            <SelectInput options={["All", "QA-SEED Daily Checklist", "Weekly compliance audit"]} />
          </Field>
          <Field label={t({ he: "שאלה", en: "Question" })}>
            <SelectInput options={["All", "Temperature reading", "Shelf condition"]} />
          </Field>
          <Field label={t({ he: "תשובה", en: "Answer" })}>
            <TextInput placeholder={t({ he: "טקסט חופשי", en: "Free text" })} />
          </Field>
          <Field label={t({ he: "מוצרים", en: "Products" })}>
            <SelectInput options={["All", "Stock pull", "Consumables"]} />
          </Field>
          <Field label={t({ he: "קבוצת מוצרים", en: "Product Group" })}>
            <SelectInput options={["All", "Group A", "Group B"]} />
          </Field>
          <Field label={t({ he: "משתמשים", en: "Users" })}>
            <SelectInput options={["All", "QA Employee", "QA Approver"]} />
          </Field>
        </div>

        <div className="rounded-[12px] border border-line bg-surface-2 p-4">
          <p className="mb-2 text-[12.5px] font-bold text-ink-2">{t({ he: "התראה", en: "Alert" })}</p>
          <div className="mb-4 flex gap-2">
            {["None", "Warning", "Error"].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlert(a)}
                className={cn(
                  "focus-ring rounded-[8px] border-2 bg-surface px-3 py-1.5 text-[12.5px] font-bold",
                  alertTones[a],
                  alert === a ? "shadow-sm" : "opacity-55",
                )}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="space-y-2.5">
            {[
              { he: "הצג רק דוחות אחרונים לפריט", en: "Show only last reports for item", on: false },
              { he: "הסתר דוחות ממוצרים שנמחקו", en: "Hide reports from deleted products", on: true },
              { he: "הצג סטטיסטיקה", en: "Show statistics", on: true },
              { he: "איחוד שאלות", en: "Question consolidation", on: false },
            ].map((c) => (
              <label key={c.en} className="flex items-start gap-2 text-[13px] text-ink">
                <input
                  type="checkbox"
                  defaultChecked={c.on}
                  className="focus-ring mt-0.5 size-4 accent-[var(--smarty-brand)]"
                />
                {t({ he: c.he, en: c.en })}
                <span className="text-danger">*</span>
              </label>
            ))}
          </div>
          <Btn className="mt-4 w-full" size="lg">
            <SearchIcon className="size-4" />
            {t({ he: "חיפוש", en: "Search" })}
          </Btn>
        </div>
      </div>
    </Card>
  );
}
