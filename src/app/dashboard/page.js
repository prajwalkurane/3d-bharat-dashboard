'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardCharts } from '@/components/dashboard/Charts';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { fetchDeals } from '@/features/deals/dealsSlice';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data: deals, loading, error } = useSelector((state) => state.deals);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Loading investor dashboard...</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
        <div className="text-lg font-semibold">Something went wrong.</div>
        <button type="button" onClick={() => dispatch(fetchDeals())} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Investor Dashboard</div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Portfolio performance overview</h1>
        </div>
      </div>

      <SummaryCards deals={deals} />
      <DashboardCharts deals={deals} />
    </div>
  );
}
