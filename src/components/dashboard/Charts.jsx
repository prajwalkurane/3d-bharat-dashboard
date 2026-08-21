'use client';

import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function DashboardCharts({ deals = [] }) {
  const byIndustry = Object.values(
    deals.reduce((acc, deal) => {
      acc[deal.industry] = acc[deal.industry] || { name: deal.industry, value: 0 };
      acc[deal.industry].value += deal.investmentRequired;
      return acc;
    }, {}),
  );

  const riskVsRoi = deals.map((deal) => ({
    name: deal.companyName.slice(0, 12),
    roi: deal.roi,
    riskScore: deal.risk === 'Low' ? 25 : deal.risk === 'Medium' ? 55 : 80,
  }));

  const growthData = deals.slice(0, 7).map((deal, index) => ({
    name: deal.companyName.slice(0, 10),
    value: deal.revenue + index * 2.4,
  }));

  const pieData = [
    { name: 'Low', value: deals.filter((deal) => deal.risk === 'Low').length, fill: '#22c55e' },
    { name: 'Medium', value: deals.filter((deal) => deal.risk === 'Medium').length, fill: '#f59e0b' },
    { name: 'High', value: deals.filter((deal) => deal.risk === 'High').length, fill: '#ef4444' },
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
        <div className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Investment Growth Over Time</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Risk Distribution</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
        <div className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Industry Distribution</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byIndustry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Risk vs ROI</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskVsRoi}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="roi" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="riskScore" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
