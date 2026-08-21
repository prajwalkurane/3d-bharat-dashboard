'use client';

import { useMemo } from 'react';

const riskOptions = ['Low', 'Medium', 'High'];
const statusOptions = ['Active', 'Closing Soon', 'Closed'];

export function DealFilters({ filters, onChange, onClear, industries = [] }) {
  const industryOptions = useMemo(() => [...new Set(industries)], [industries]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Filters</h3>
        <button type="button" onClick={onClear} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">Clear filters</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-600 dark:text-slate-300">Min ROI</span>
          <input type="number" min={0} value={filters.minRoi || 0} onChange={(e) => onChange({ minRoi: Number(e.target.value) || 0 })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-600 dark:text-slate-300">Risk</span>
          <select value={filters.risk || ''} onChange={(e) => onChange({ risk: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <option value="">All</option>
            {riskOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-600 dark:text-slate-300">Industry</span>
          <select value={filters.industry || ''} onChange={(e) => onChange({ industry: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <option value="">All</option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-600 dark:text-slate-300">Max Investment (₹L)</span>
          <input type="number" min={10} value={filters.maxInvestment || 100} onChange={(e) => onChange({ maxInvestment: Number(e.target.value) || 100 })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-600 dark:text-slate-300">Status</span>
          <select value={filters.status || ''} onChange={(e) => onChange({ status: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <option value="">All</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
