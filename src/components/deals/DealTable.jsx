'use client';

import Link from 'next/link';
import { FiHeart, FiEye, FiTrendingUp } from 'react-icons/fi';

const riskStyles = {
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

const statusStyles = {
  Active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Closing Soon': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Closed: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
};

export function DealTable({ deals, onToggleInterest, savedDeals = [], investor }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Industry</th>
              <th className="px-4 py-3 font-medium">ROI</th>
              <th className="px-4 py-3 font-medium">Risk</th>
              <th className="px-4 py-3 font-medium">Investment</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Match</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => {
              const matchScore = investor ? investor.recommendation?.matchScore ?? 0 : Math.round((deal.roi / (deal.roi + 8)) * 100);
              const saved = savedDeals.includes(String(deal.id));
              return (
                <tr key={deal.id} className="border-t border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/80">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{deal.companyName}</div>
                  </td>
                  <td className="px-4 py-4">{deal.industry}</td>
                  <td className="px-4 py-4 text-blue-600 dark:text-blue-400">{deal.roi}%</td>
                  <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${riskStyles[deal.risk]}`}>{deal.risk}</span></td>
                  <td className="px-4 py-4">₹{deal.investmentRequired}L</td>
                  <td className="px-4 py-4">{deal.location}</td>
                  <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[deal.status]}`}>{deal.status}</span></td>
                  <td className="px-4 py-4"><span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400"><FiTrendingUp className="h-3.5 w-3.5" />{matchScore}%</span></td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/deals/${deal.id}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                        <FiEye className="h-3.5 w-3.5" /> View
                      </Link>
                      <button type="button" onClick={() => onToggleInterest(deal.id)} className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition ${saved ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                        <FiHeart className={`h-3.5 w-3.5 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
