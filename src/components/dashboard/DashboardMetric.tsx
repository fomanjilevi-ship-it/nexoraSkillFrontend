import type { ReactNode } from "react";

interface DashboardMetricProps {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}

export default function DashboardMetric({
  label,
  value,
  detail,
  icon,
}: DashboardMetricProps) {
  return (
    <article className="rounded-xl border border-[#29292e] bg-[#101012] p-5 transition-colors hover:border-[#48484f]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#343439] bg-[#202024] text-zinc-200">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-500">{detail}</p>
    </article>
  );
}
