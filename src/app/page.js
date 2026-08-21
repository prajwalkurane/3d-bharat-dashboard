'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowRight, FiBarChart2, FiShield, FiTrendingUp } from 'react-icons/fi';
import { fetchDeals } from '@/features/deals/dealsSlice';

const statCards = [
  { label: 'Portfolio value', value: '₹3.4Cr', detail: '+18.5% this quarter' },
  { label: 'Deals tracked', value: '62', detail: 'Across 9 sectors' },
  { label: 'Avg. yield', value: '22.8%', detail: 'Risk-adjusted return' },
  { label: 'Active investors', value: '1,480', detail: 'Institutional + HNI' },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const { data: deals, loading } = useSelector((state) => state.deals);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const analytics = useMemo(() => {
    if (!deals.length) return { total: 0, roi: 0, active: 0 };
    return {
      total: deals.reduce((sum, deal) => sum + Number(deal.investmentRequired || 0), 0),
      roi: (deals.reduce((sum, deal) => sum + Number(deal.roi || 0), 0) / deals.length).toFixed(1),
      active: deals.filter((deal) => deal.status === 'Active').length,
    };
  }, [deals]);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-8 text-white shadow-xl shadow-blue-200/50 dark:border-slate-800 dark:shadow-none">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">3D Bharat</div>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">Smarter capital allocation for India&apos;s next growth story.</h1>
            <p className="mt-4 max-w-lg text-base text-blue-100">Discover curated, risk-aware investment opportunities across modern fintech, AI, climate, and industrial innovation.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">Investor Dashboard <FiArrowRight className="h-4 w-4" /></Link>
              <Link href="/corporate" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/15">Corporate Dashboard</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/20 bg-slate-950/20 p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-blue-100">Platform overview</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-100">Live</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-blue-100">Portfolio momentum</div>
                <div className="mt-2 text-3xl font-bold">₹{analytics.total || '0'}L</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-sm text-blue-100">ROI</div>
                  <div className="mt-2 text-2xl font-bold">{analytics.roi || '0'}%</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-sm text-blue-100">Active deals</div>
                  <div className="mt-2 text-2xl font-bold">{analytics.active || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            <div className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">{stat.detail}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <FiTrendingUp className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Why investors choose 3D Bharat</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/80">
              <FiShield className="h-5 w-5 text-emerald-600" />
              <div className="mt-3 font-semibold text-slate-900 dark:text-white">Risk-aware screening</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Match capital to resilient growth sectors and balanced risk profiles.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/80">
              <FiBarChart2 className="h-5 w-5 text-violet-600" />
              <div className="mt-3 font-semibold text-slate-900 dark:text-white">Portfolio visibility</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Track ROI, sector performance, and capital deployment in one view.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/80">
              <FiArrowRight className="h-5 w-5 text-cyan-600" />
              <div className="mt-3 font-semibold text-slate-900 dark:text-white">Actionable picks</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Use recommendation scoring to shortlist opportunities aligned to your mandate.</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">Market pulse</div>
          <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{loading ? 'Loading...' : `${analytics.roi || 0}%`}</div>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/80"><span>AI</span><span className="font-semibold">24.6%</span></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/80"><span>Climate</span><span className="font-semibold">19.3%</span></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/80"><span>FinTech</span><span className="font-semibold">27.1%</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}
