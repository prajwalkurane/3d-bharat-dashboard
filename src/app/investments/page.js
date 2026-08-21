'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeals } from '@/features/deals/dealsSlice';
import { removeInterest } from '@/features/interests/interestsSlice';

export default function InvestmentsPage() {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.data);
  const savedIds = useSelector((state) => state.interests.interests);
  const selectedDeals = deals.filter((deal) => savedIds.includes(String(deal.id)));

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">My Investments</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Saved opportunities</h1>
      </div>

      {selectedDeals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">★</div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">No investments saved yet</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Keep track of deals you want to revisit or act on later.</p>
          <Link href="/deals" className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white">Explore deals</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedDeals.map((deal) => (
            <div key={deal.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{deal.industry}</div>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{deal.companyName}</h3>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{deal.risk}</span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span>ROI</span><span className="font-semibold text-slate-900 dark:text-white">{deal.roi}%</span></div>
                <div className="flex justify-between"><span>Investment</span><span className="font-semibold text-slate-900 dark:text-white">₹{deal.investmentRequired}L</span></div>
                <div className="flex justify-between"><span>Status</span><span className="font-semibold text-slate-900 dark:text-white">{deal.status}</span></div>
              </div>
              <div className="mt-5 flex gap-2">
                <Link href={`/deals/${deal.id}`} className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white">View details</Link>
                <button type="button" onClick={() => dispatch(removeInterest(deal.id))} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
