'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchDeals } from '@/features/deals/dealsSlice';
import { toggleInterest } from '@/features/interests/interestsSlice';

const tabs = ['Overview', 'Financials', 'ROI', 'Risk Analysis'];

export default function DealDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { data: deals, loading, error } = useSelector((state) => state.deals);
  const savedDeals = useSelector((state) => state.interests.interests);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const deal = useMemo(() => {
    return deals.find((item) => String(item.id) === String(params.id));
  }, [deals, params.id]);

  const isSaved = savedDeals.includes(String(deal?.id));

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Loading deal details...</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
        <div className="text-lg font-semibold">Something went wrong.</div>
        <button type="button" onClick={() => dispatch(fetchDeals())} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white">Retry</button>
      </div>
    );
  }

  if (!deal) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Deal not found.</div>;
  }

  const tabContent = {
    Overview: (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Company Information</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><div className="text-sm text-slate-500 dark:text-slate-400">Company</div><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.companyName}</div></div>
            <div><div className="text-sm text-slate-500 dark:text-slate-400">Industry</div><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.industry}</div></div>
            <div><div className="text-sm text-slate-500 dark:text-slate-400">Location</div><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.location}</div></div>
            <div><div className="text-sm text-slate-500 dark:text-slate-400">Funding Stage</div><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.fundingStage}</div></div>
            <div><div className="text-sm text-slate-500 dark:text-slate-400">Founded Year</div><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.foundedYear}</div></div>
            <div><div className="text-sm text-slate-500 dark:text-slate-400">Employees</div><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.employees}</div></div>
          </div>
          <div className="mt-5">
            <div className="text-sm text-slate-500 dark:text-slate-400">Description</div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{deal.description}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Quick snapshot</div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Investment Required</span><span className="font-semibold">₹{deal.investmentRequired}L</span></div>
            <div className="flex justify-between"><span>ROI</span><span className="font-semibold">{deal.roi}%</span></div>
            <div className="flex justify-between"><span>Projected ROI</span><span className="font-semibold">{deal.projectedROI}%</span></div>
            <div className="flex justify-between"><span>Valuation</span><span className="font-semibold">₹{deal.valuation}Cr</span></div>
            <div className="flex justify-between"><span>Revenue</span><span className="font-semibold">₹{deal.revenue}Cr</span></div>
          </div>
        </div>
      </div>
    ),
    Financials: (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Financial Metrics</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Investment Required', `₹${deal.investmentRequired}L`],
            ['Revenue', `₹${deal.revenue}Cr`],
            ['Valuation', `₹${deal.valuation}Cr`],
            ['Projected ROI', `${deal.projectedROI}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/80">
              <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
              <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    ROI: (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">ROI Projection</div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={deal.historicalData || []}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    ),
    'Risk Analysis': (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Risk Analysis</div>
        <div className="space-y-5">
          {[
            ['Overall Risk', deal.riskAnalysis.overallRisk],
            ['Market Risk', deal.riskAnalysis.marketRisk],
            ['Financial Risk', deal.riskAnalysis.financialRisk],
            ['Industry Risk', deal.riskAnalysis.industryRisk],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm text-slate-600 dark:text-slate-300"><span>{label}</span><span>{value}%</span></div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{deal.industry}</div>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{deal.companyName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{deal.status}</span>
            <button type="button" onClick={() => dispatch(toggleInterest(deal.id))} className={`rounded-xl px-4 py-2 text-sm font-medium ${isSaved ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
              {isSaved ? 'Saved' : 'Save deal'}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {tabContent[activeTab]}
    </div>
  );
}
