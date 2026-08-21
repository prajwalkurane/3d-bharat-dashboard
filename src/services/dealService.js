import dealsData from '@/data/deals.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomFailureRate = 0.12;

const isFailure = () => Math.random() < randomFailureRate;

export async function getDeals() {
  await delay(500 + Math.random() * 300);
  if (isFailure()) {
    throw new Error('Unable to load deals.');
  }
  return dealsData;
}

export async function getDealById(id) {
  await delay(400 + Math.random() * 250);
  if (isFailure()) {
    throw new Error('Unable to load deal details.');
  }
  const deal = dealsData.find((item) => String(item.id) === String(id));
  if (!deal) return null;
  return deal;
}

export async function searchDeals(query = '') {
  await delay(350 + Math.random() * 200);
  if (isFailure()) {
    throw new Error('Search failed.');
  }
  const value = query.trim().toLowerCase();
  if (!value) return dealsData;
  return dealsData.filter((deal) =>
    [deal.companyName, deal.industry, deal.location].some((field) =>
      String(field).toLowerCase().includes(value),
    ),
  );
}

export function filterDeals(deals, filters = {}) {
  return deals.filter((deal) => {
    const minRoi = Number(filters.minRoi ?? 0);
    const risk = filters.risk;
    const industry = filters.industry;
    const status = filters.status;
    const maxInvestment = Number(filters.maxInvestment ?? Number.POSITIVE_INFINITY);

    if (deal.roi < minRoi) return false;
    if (risk && deal.risk !== risk) return false;
    if (industry && deal.industry !== industry) return false;
    if (status && deal.status !== status) return false;
    if (deal.investmentRequired > maxInvestment) return false;

    return true;
  });
}

export function sortDeals(deals, sortKey = 'roi-desc') {
  const list = [...deals];
  switch (sortKey) {
    case 'roi-desc':
      return list.sort((a, b) => b.roi - a.roi);
    case 'roi-asc':
      return list.sort((a, b) => a.roi - b.roi);
    case 'investment-desc':
      return list.sort((a, b) => b.investmentRequired - a.investmentRequired);
    case 'investment-asc':
      return list.sort((a, b) => a.investmentRequired - b.investmentRequired);
    case 'risk':
      return list.sort((a, b) => {
        const riskOrder = { Low: 1, Medium: 2, High: 3 };
        return riskOrder[b.risk] - riskOrder[a.risk];
      });
    case 'name':
      return list.sort((a, b) => a.companyName.localeCompare(b.companyName));
    default:
      return list;
  }
}

export function paginateDeals(items, page = 1, pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    page: safePage,
    pageSize,
    totalPages,
    totalItems: items.length,
    startIndex: start,
    endIndex: Math.min(end, items.length),
  };
}
