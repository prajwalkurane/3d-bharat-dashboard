const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function calculateRecommendationScore(deal, investor) {
  if (!deal || !investor) return { matchScore: 0, reasons: ['Missing investor or deal profile'] };

  const riskPreferenceMap = { Low: 0, Medium: 1, High: 2 };
  const riskWeight = { Low: 1, Medium: 0.7, High: 0.45 };
  const dealRiskValue = riskPreferenceMap[deal.risk] ?? 1;
  const investorRiskValue = riskPreferenceMap[investor.riskPreference] ?? 1;

  const riskDistance = Math.abs(dealRiskValue - investorRiskValue);
  const riskMatch = 100 - riskDistance * 35;
  const industryMatch = investor.preferredIndustry === deal.industry ? 100 : investor.interests?.includes(deal.industry) ? 82 : 55;
  const budgetCompatibility = (() => {
    const dealBudget = Number(deal.investmentRequired || 0);
    const max = Number(investor.maximumInvestment || 0) || 100;
    const budgetRatio = dealBudget / max;
    if (budgetRatio <= 0.45) return 100;
    if (budgetRatio <= 0.7) return 82;
    if (budgetRatio <= 0.9) return 60;
    return 42;
  })();
  const roiAttractiveness = clamp(((deal.roi || 0) / Math.max(investor.minimumROI || 15, 1)) * 100, 0, 100);

  const weightedScore =
    riskMatch * 0.25 +
    industryMatch * 0.25 +
    budgetCompatibility * 0.25 +
    roiAttractiveness * 0.25;

  const matchScore = Math.round(clamp(weightedScore, 0, 100));

  const reasons = [];
  if (industryMatch >= 80) reasons.push('Matches preferred industry');
  if (riskMatch >= 70) reasons.push('Matches risk preference');
  if (budgetCompatibility >= 75) reasons.push('Fits investment budget');
  if (roiAttractiveness >= 80) reasons.push('Attractive ROI');
  if (reasons.length === 0) reasons.push('Emerging fit based on portfolio alignment');

  return {
    matchScore,
    reasons,
    riskMatch: Math.round(riskMatch),
    industryMatch: Math.round(industryMatch),
    budgetCompatibility: Math.round(budgetCompatibility),
    roiAttractiveness: Math.round(roiAttractiveness),
    riskAlignment: (riskWeight[deal.risk] || 0.7) >= (riskWeight[investor.riskPreference] || 0.7) ? 'Aligned' : 'Watchlist',
  };
}

export function recommendDealsForInvestor(deals, investor) {
  return deals
    .map((deal) => ({
      ...deal,
      recommendation: calculateRecommendationScore(deal, investor),
    }))
    .sort((a, b) => (b.recommendation.matchScore || 0) - (a.recommendation.matchScore || 0));
}
