# SMARTY Unified Vision

Please hold on generating the prototype for a moment. I am providing the comprehensive System Prompt below. Due to the 10-file upload limit per message, I will upload the remaining 4 application screenshots in my very next message before you begin full analysis and build.
### System & Context:

Analyze the attached `SMARTY_UI_MODERNIZATION_OWNER_SUMMARY.pdf`, the proposed Design Token Catalog, and all attached application screenshots. Build a polished, high-fidelity visual prototype aligned with enterprise standards for 2028–2030.

This project delivers two decoupled artifacts sharing a unified brand identity:

1. SMARTY Enterprise Management Application Console

2. SMARTY Public Marketing & Lead-Generation Website

---

### Source of Truth & Architecture Constraints:

- **Baseline:** ASP.NET MVC 5 + Bootstrap 5 / Tailwind CSS architecture.

- **Strict Visual-Only Boundary:** Do NOT modify backend logic, DB schemes, routes, permissions, or existing auth systems.

- **Sidebar Architecture:** Standard collapsible sidebar with persistent state toggle. No floating sidebars or icon-only rails.

- **Localization:** Full native Hebrew (RTL - default/primary) and English (LTR) bidirectional support.

---

### Deliverable 1: SMARTY Management Application Prototype

- **Design Tokens & Palette:** 

  - Ground: Cool Slate (`#F8FAFC`). Surfaces: Pure White (`#FFFFFF`).

  - Brand: Vibrant Blue (`#0D6EFD`) & Tech Cyan (`#00BCD4`).

  - Typography: `Heebo` for general UI/Hebrew, `JetBrains Mono` for KPI numbers and metrics.

  - Themes: Seamless switching between Light, Dark (`#0A0F1C`), and WCAG AA High-Contrast (`#000000`).

  - Elevation: Soft micro-shadows (`shadow-xs` / `shadow-sm`).

- **Core Views to Include:**

  1. Main Dashboard (KPI cards, gradient area charts, inventory alerts table).

  2. Users & System Updates DataTables (Search toolbar, export buttons [CSV/Excel/PDF], role chips, row action buttons).

  3. Enterprise Forms (Create User, Create Questionnaire, and Advanced Search filters).

  4. Calendar View (Monthly scheduling grid).

  5. Help Center Portal.

  6. AI Assistant Panel (Slide-over panel with quick-action chips and responsive layout).

---

### Deliverable 2: SMARTY Public Marketing Website (ntms.co.il Redesign)

- Modern B2B SaaS landing page showcasing workforce time clock, real-time inventory alerts, contract compliance, and AI business assistance.

- Hero section with live product preview, interactive feature matrix, trust badges, lead-capture/demo-request form, and RTL/LTR toggle.

---

### Deliverable 3: Compact Design Tokens & Export

- CSS Custom Properties matching the provided `:root`, `[data-bs-theme="dark"]`, and `[data-bs-theme="high-contrast"]` catalog for direct ASP.NET MVC Razor integration.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://smarty-vision-evolve.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b7b4b13-5f56-48ac-b4b5-3358c659bbd2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
