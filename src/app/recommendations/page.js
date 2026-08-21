'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeals } from '@/features/deals/dealsSlice';
import { fetchInvestors } from '@/features/investors/investorsSlice';
import { toggleInterest } from '@/features/interests/interestsSlice';
import { recommendDealsForInvestor } from '@/utils/recommendation';

export default function RecommendationsPage() {
  const dispatch = useDispatch();
  const { data: deals, loading: dealsLoading } = useSelector((state) => state.deals);
  const { list: investors, loading: investorsLoading } = useSelector((state) => state.investors);
  const savedDeals = useSelector((state) => state.interests.interests);

  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(fetchInvestors());
  }, [dispatch]);

  const investor = investors[0] || {
    name: 'Aarav Capital',
    preferredIndustry: 'Technology',
    riskPreference: 'Medium',
    minimumROI: 18,
    maximumInvestment: 80,
    interests: ['AI', 'Technology', 'SaaS'],
  };

  const recommendations = useMemo(() => {
    if (!deals.length) return [];
    return recommendDealsForInvestor(deals, investor).slice(0, 8);
  }, [deals, investor]);

  const handleSaveDeal = useCallback((dealId) => dispatch(toggleInterest(dealId)), [dispatch]);

  if (dealsLoading || investorsLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Loading recommendations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Recommended For You</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">High-conviction investment matches</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Prioritized for {investor.name} based on sector fit, risk tolerance, and ROI potential.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((deal) => {
          const saved = savedDeals.includes(String(deal.id));
          return (
            <div key={deal.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{deal.industry}</div>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{deal.companyName}</h3>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{deal.recommendation.matchScore}%</span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/80"><span className="text-slate-500 dark:text-slate-400">ROI</span><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.roi}%</div></div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/80"><span className="text-slate-500 dark:text-slate-400">Risk</span><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.risk}</div></div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/80"><span className="text-slate-500 dark:text-slate-400">Investment</span><div className="mt-1 font-semibold text-slate-900 dark:text-white">₹{deal.investmentRequired}L</div></div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/80"><span className="text-slate-500 dark:text-slate-400">Location</span><div className="mt-1 font-semibold text-slate-900 dark:text-white">{deal.location}</div></div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Why it matches</div>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  {deal.recommendation.reasons.slice(0, 3).map((reason) => (
                    <li key={reason} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />{reason}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex gap-2">
                <Link href={`/deals/${deal.id}`} className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white">View details</Link>
                <button type="button" onClick={() => handleSaveDeal(deal.id)} className={`rounded-xl px-3 py-2 text-sm font-medium ${saved ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
