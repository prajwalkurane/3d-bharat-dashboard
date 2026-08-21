export function Card({ title, value, subtitle, action, accent, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{title}</div>
          <div className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
        </div>
        {accent ? <div className={`rounded-xl p-2 ${accent}`}>{action}</div> : null}
      </div>
      {subtitle ? <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">{subtitle}</div> : null}
    </div>
  );
}
