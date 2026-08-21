import { Card } from '@/components/common/Card';
import { FiActivity, FiBriefcase, FiShield, FiTrendingUp } from 'react-icons/fi';

export function SummaryCards({ deals = [] }) {
  const totals = {
    investments: deals.reduce((sum, deal) => sum + Number(deal.investmentRequired || 0), 0),
    active: deals.filter((deal) => deal.status === 'Active').length,
    avgRoi: deals.length ? (deals.reduce((sum, deal) => sum + Number(deal.roi || 0), 0) / deals.length).toFixed(1) : 0,
    risk: {
      Low: deals.filter((deal) => deal.risk === 'Low').length,
      Medium: deals.filter((deal) => deal.risk === 'Medium').length,
      High: deals.filter((deal) => deal.risk === 'High').length,
    },
  };

  const cards = [
    { title: 'Total Investments', value: `₹${totals.investments}L`, subtitle: 'Across active opportunities', accent: 'bg-blue-50 text-blue-700', action: <FiTrendingUp className="h-5 w-5" /> },
    { title: 'Active Deals', value: totals.active, subtitle: `${deals.length} total tracked deals`, accent: 'bg-emerald-50 text-emerald-700', action: <FiBriefcase className="h-5 w-5" /> },
    { title: 'ROI Overview', value: `${totals.avgRoi}%`, subtitle: 'Average return on investment', accent: 'bg-violet-50 text-violet-700', action: <FiActivity className="h-5 w-5" /> },
    { title: 'Risk Distribution', value: `${totals.risk.Low}/${totals.risk.Medium}/${totals.risk.High}`, subtitle: 'Low/Medium/High mix', accent: 'bg-amber-50 text-amber-700', action: <FiShield className="h-5 w-5" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
}
