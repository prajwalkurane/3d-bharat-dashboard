'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchDeals } from '@/features/deals/dealsSlice';

export default function CorporateDashboardPage() {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.data);

  useEffect(() => { dispatch(fetchDeals()); }, [dispatch]);

  const metrics = useMemo(() => {
    const totalFunding = deals.reduce((sum, deal) => sum + Number(deal.investmentRequired || 0), 0);
    const investorCount = Math.max(12, Math.round(totalFunding / 5));
    const conversionRate = deals.length ? ((deals.filter((deal) => deal.status !== 'Closed').length / deals.length) * 100).toFixed(1) : 0;
    return { totalFunding, investorCount, conversionRate };
  }, [deals]);

  const fundingTrend = deals.slice(0, 8).map((deal, index) => ({
    name: `Q${index + 1}`,
    funding: deal.investmentRequired * (1.2 + index * 0.22),
  }));

  const investorTrend = deals.slice(0, 8).map((deal, index) => ({
    name: deal.companyName.slice(0, 8),
    investors: 8 + index * 2,
  }));

  const conversionTrend = deals.slice(0, 8).map((deal, index) => ({
    name: `M${index + 1}`,
    conversion: 12 + index * 5 + (deal.roi || 0) / 4,
  }));

  const industryPerformance = Object.values(
    deals.reduce((acc, deal) => {
      acc[deal.industry] = acc[deal.industry] || { name: deal.industry, value: 0 };
      acc[deal.industry].value += deal.roi;
      return acc;
    }, {}),
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">Total Funding Raised</div>
          <div className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">₹{metrics.totalFunding}L</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">Investor Count</div>
          <div className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{metrics.investorCount}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">Conversion Rate</div>
          <div className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{metrics.conversionRate}%</div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Funding Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fundingTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="funding" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Investor Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investorTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="investors" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Conversion Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="conversion" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Industry Performance</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={industryPerformance} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                  {industryPerformance.map((entry, index) => (
                    <Cell key={entry.name} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
