import investorsData from '@/data/investors.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const maybeFail = () => Math.random() < 0.1;

export async function getInvestors() {
  await delay(450 + Math.random() * 250);
  if (maybeFail()) {
    throw new Error('Unable to load investors.');
  }
  return investorsData;
}

export async function getInvestorById(id) {
  await delay(350 + Math.random() * 200);
  if (maybeFail()) {
    throw new Error('Unable to load investor profile.');
  }
  return investorsData.find((investor) => String(investor.id) === String(id)) || null;
}
