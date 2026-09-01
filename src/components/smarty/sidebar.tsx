import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LineChart,
  Eye,
  Boxes,
  Tag,
  CalendarDays,
  ClipboardCheck,
  Phone,
  HelpCircle,
  Settings,
  Users,
  Smartphone,
  Clock,
  LifeBuoy,
  Megaphone,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useShell } from "@/lib/smarty-shell";

type NavItem = {
  to?: string;
  he: string;
  en: string;
  icon: LucideIcon;
  badge?: string;
  caret?: boolean;
};

const groups: { he: string; en: string; items: NavItem[] }[] = [
  {
    he: "תפעול",
    en: "Operations",
    items: [
      { to: "/app", he: "לוח בקרה", en: "Dashboard", icon: LayoutDashboard },
      { to: "/app/reports", he: "דוחות", en: "Reports", icon: LineChart, caret: true },
      { he: "צ׳ק אין", en: "Check In", icon: Eye },
      { he: "מלאי", en: "Inventory", icon: Boxes, caret: true },
      { he: "מוצרים", en: "Products", icon: Tag },
      { to: "/app/calendar", he: "יומן", en: "Calendar", icon: CalendarDays },
      { he: "הקצאות", en: "Assignments", icon: ClipboardCheck },
      { he: "שיחות", en: "Calls", icon: Phone },
    ],
  },
  {
    he: "הגדרות",
    en: "Configuration",
    items: [
      {
        to: "/app/questionnaires",
        he: "שאלונים",
        en: "Questionnaires",
        icon: HelpCircle,
        caret: true,
      },
      { he: "קונפיגורציה", en: "Config", icon: Settings, caret: true },
      { to: "/app/users", he: "משתמשים", en: "Users", icon: Users },
      { he: "מובייל", en: "Mobile", icon: Smartphone },
      { he: "שעון נוכחות", en: "Time Clock", icon: Clock, caret: true },
    ],
  },
  {
    he: "מערכת",
    en: "System",
    items: [
      { to: "/app/help", he: "מרכז עזרה", en: "Help Center", icon: LifeBuoy },
      { to: "/app/updates", he: "עדכוני מערכת", en: "System Updates", icon: Megaphone },
      { he: "אישורים", en: "Approvals", icon: ClipboardCheck, badge: "1" },
      { he: "ניתוח עמידה בחוזים", en: "Contract Compliance", icon: FileText },
    ],
  },
];

export function ConsoleSidebar() {
  const { sidebarOpen, lang, t } = useShell();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label={t({ he: "ניווט ראשי", en: "Main navigation" })}
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col overflow-y-auto border-line bg-surface transition-[width] duration-200 md:flex",
        "border-e",
        sidebarOpen ? "w-[264px]" : "w-[76px]",
      )}
    >
      <div className="flex h-[60px] items-center gap-2.5 px-4">
        <span className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand text-brand-ink">
          <ClipboardCheck className="size-5" />
        </span>
        {sidebarOpen ? (
          <span className="text-[19px] font-extrabold tracking-tight text-ink">SMARTY</span>
        ) : null}
      </div>

      <div className="flex-1 px-2 pb-6">
        {groups.map((group) => (
          <div key={group.en} className="mt-4">
            {sidebarOpen ? (
              <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-3">
                {lang === "he" ? group.he : group.en}
              </p>
            ) : (
              <div className="mx-3 my-3 border-t border-line" />
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.to === path;
                const label = lang === "he" ? item.he : item.en;
                const content = (
                  <>
                    <item.icon className="size-[18px] shrink-0" />
                    {sidebarOpen ? (
                      <>
                        <span className="truncate">{label}</span>
                        {item.badge ? (
                          <span className="ms-auto rounded-full bg-danger-soft px-1.5 text-[11px] font-bold text-danger">
                            {item.badge}
                          </span>
                        ) : null}
                        {item.caret && !item.badge ? (
                          <span className="ms-auto text-ink-3">▾</span>
                        ) : null}
                      </>
                    ) : null}
                  </>
                );
                const classes = cn(
                  "focus-ring flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2 text-[13.5px] font-semibold",
                  active
                    ? "bg-brand-soft text-brand"
                    : "text-ink-2 hover:bg-surface-2 hover:text-ink",
                  !sidebarOpen && "justify-center px-0",
                );
                return (
                  <li key={item.en}>
                    {item.to ? (
                      <Link to={item.to} title={label} className={classes}>
                        {content}
                      </Link>
                    ) : (
                      <button type="button" title={label} className={classes}>
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line p-3">
        <div className={cn("flex items-center gap-2.5", !sidebarOpen && "justify-center")}>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cyan-soft text-[12px] font-bold text-cyan">
            OS
          </span>
          {sidebarOpen ? (
            <span className="truncate text-[12.5px] text-ink-2">admin.local@smarty.test</span>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
