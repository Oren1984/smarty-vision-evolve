import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={cn("surface-card", padded && "p-5", className)}>{children}</section>
  );
}

export function CardHead({
  title,
  hint,
  action,
}: {
  title: ReactNode;
  hint?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-bold leading-tight text-ink">{title}</h2>
        {hint ? <p className="mt-1 text-[13px] text-ink-2">{hint}</p> : null}
      </div>
      {action}
    </header>
  );
}

type BtnProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "cyan";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Btn({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
}: BtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-[8px] border font-semibold transition-colors",
        size === "sm" && "px-2.5 py-1.5 text-[12.5px]",
        size === "md" && "px-4 py-2 text-[13.5px]",
        size === "lg" && "px-6 py-3 text-[15px]",
        variant === "primary" &&
          "border-transparent bg-brand text-brand-ink shadow-sm hover:brightness-110",
        variant === "cyan" &&
          "border-transparent bg-cyan text-brand-ink shadow-sm hover:brightness-110",
        variant === "secondary" &&
          "border-line-2 bg-surface text-ink hover:bg-surface-2",
        variant === "ghost" && "border-transparent text-ink-2 hover:bg-surface-2 hover:text-ink",
        variant === "danger" && "border-danger/40 bg-danger-soft text-danger hover:brightness-110",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Pill({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "success" | "warn" | "danger" | "info" | "brand";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-bold",
        tone === "success" && "bg-success-soft text-success",
        tone === "warn" && "bg-warn-soft text-warn",
        tone === "danger" && "bg-danger-soft text-danger",
        tone === "info" && "bg-info-soft text-info",
        tone === "brand" && "bg-brand-soft text-brand",
      )}
    >
      {children}
    </span>
  );
}

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-2">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-[11.5px] text-ink-3">{hint}</span> : null}
    </label>
  );
}

const controlBase =
  "focus-ring w-full rounded-[8px] border border-line-2 bg-surface px-3 py-2 text-[14px] text-ink placeholder:text-ink-3";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlBase, props.className)} />;
}

export function SelectInput({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <select {...props} className={cn(controlBase, "appearance-none", props.className)}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export function PageTitle({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-3">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-[28px] font-extrabold leading-tight text-ink">{title}</h1>
        {sub ? <p className="mt-1.5 max-w-2xl text-[14px] text-ink-2">{sub}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function InfoBar({ children, link }: { children: ReactNode; link: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-line bg-brand-soft px-4 py-2.5 text-[13px] text-ink">
      <span>{children}</span>
      <a href="#help" className="focus-ring font-semibold text-brand hover:underline">
        {link}
      </a>
    </div>
  );
}
