/**
 * AM Invest - Calculator Functions
 * All mathematical calculations for investment tools
 */

// ==========================================
// CONSTANTS
// ==========================================
export const SHARES_PER_LOT = 100;
export const DIVIDEND_TAX_RATE = 0.10; // 10% tax on dividends
export const GRAHAM_MULTIPLIER = 22.5; // Graham Number constant

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format number to Indonesian Rupiah currency
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${formatNumber(value, decimals)}%`;
}

/**
 * Parse Indonesian formatted number string to number
 */
export function parseNumber(value: string): number {
  // Remove currency symbol, dots (thousand sep), and replace comma with dot (decimal)
  const cleaned = value
    .replace(/[Rp\s]/gi, '')
    .replace(/\./g, '')
    .replace(',', '.');
  return parseFloat(cleaned) || 0;
}

// ==========================================
// AVERAGE DOWN/UP CALCULATOR
// ==========================================

export interface AverageDownResult {
  newAverage: number;
  totalShares: number;
  totalLots: number;
  currentModal: number;
  newModal: number;
  totalModal: number;
  modalChange: number;
  modalChangePercent: number;
  potentialProfitLoss: number;
  potentialProfitLossPercent: number;
}

/**
 * Calculate Average Down/Up
 * @param currentAverage - Current average price per share
 * @param currentLots - Current number of lots owned
 * @param newPrice - New buy price per share
 * @param newLots - Number of new lots to buy
 * @param targetPrice - Optional target price for profit calculation
 */
export function calculateAverageDown(
  currentAverage: number,
  currentLots: number,
  newPrice: number,
  newLots: number,
  targetPrice?: number
): AverageDownResult {
  const currentShares = currentLots * SHARES_PER_LOT;
  const newShares = newLots * SHARES_PER_LOT;
  const totalShares = currentShares + newShares;

  const currentModal = currentAverage * currentShares;
  const newModal = newPrice * newShares;
  const totalModal = currentModal + newModal;

  const newAverage = totalShares > 0 ? totalModal / totalShares : 0;
  const modalChange = newModal;
  const modalChangePercent = currentModal > 0 ? (newModal / currentModal) * 100 : 0;

  // Calculate potential profit/loss if target price is provided
  const effectiveTarget = targetPrice || newPrice;
  const potentialValue = totalShares * effectiveTarget;
  const potentialProfitLoss = potentialValue - totalModal;
  const potentialProfitLossPercent = totalModal > 0 ? (potentialProfitLoss / totalModal) * 100 : 0;

  return {
    newAverage,
    totalShares,
    totalLots: totalShares / SHARES_PER_LOT,
    currentModal,
    newModal,
    totalModal,
    modalChange,
    modalChangePercent,
    potentialProfitLoss,
    potentialProfitLossPercent,
  };
}

// ==========================================
// RIGHTS ISSUE CALCULATOR
// ==========================================

export interface RightsIssueResult {
  rightsShares: number;
  rightsLots: number;
  finalShares: number;
  finalLots: number;
  danaWajib: number;
  oldModal: number;
  totalModal: number;
  newAverage: number;
  dilutionPercent: number;
  theoreticalExRightsPrice: number;
}

/**
 * Calculate Rights Issue
 * @param oldLots - Current lots owned
 * @param oldAverage - Current average price
 * @param ratioOld - Old ratio (e.g., 5 in 5:1)
 * @param ratioNew - New ratio (e.g., 1 in 5:1)
 * @param exercisePrice - Rights exercise price
 */
export function calculateRightsIssue(
  oldLots: number,
  oldAverage: number,
  ratioOld: number,
  ratioNew: number,
  exercisePrice: number
): RightsIssueResult {
  const oldShares = oldLots * SHARES_PER_LOT;

  // Calculate rights entitlement
  const rightsShares = Math.floor((oldShares / ratioOld) * ratioNew);
  const rightsLots = rightsShares / SHARES_PER_LOT;

  // Total shares after rights
  const finalShares = oldShares + rightsShares;
  const finalLots = finalShares / SHARES_PER_LOT;

  // Calculate required funds
  const danaWajib = rightsShares * exercisePrice;

  // Calculate new average
  const oldModal = oldShares * oldAverage;
  const totalModal = oldModal + danaWajib;
  const newAverage = finalShares > 0 ? totalModal / finalShares : 0;

  // Calculate dilution percentage
  const dilutionPercent = oldShares > 0 ? (rightsShares / oldShares) * 100 : 0;

  // Theoretical Ex-Rights Price (TERP)
  const terp = finalShares > 0
    ? ((oldShares * oldAverage) + (rightsShares * exercisePrice)) / finalShares
    : 0;

  return {
    rightsShares,
    rightsLots,
    finalShares,
    finalLots,
    danaWajib,
    oldModal,
    totalModal,
    newAverage,
    dilutionPercent,
    theoreticalExRightsPrice: terp,
  };
}

// ==========================================
// DIVIDEND CALCULATOR
// ==========================================

export interface DividendResult {
  totalShares: number;
  grossDividend: number;
  taxAmount: number;
  netDividend: number;
  dividendYield: number;
  annualizedYield: number;
}

/**
 * Calculate Dividend (Net after Tax)
 * @param lots - Number of lots owned
 * @param dps - Dividend Per Share
 * @param currentPrice - Current stock price
 * @param frequency - Dividend frequency per year (default 1)
 */
export function calculateDividend(
  lots: number,
  dps: number,
  currentPrice: number,
  frequency: number = 1
): DividendResult {
  const totalShares = lots * SHARES_PER_LOT;
  const grossDividend = totalShares * dps;
  const taxAmount = grossDividend * DIVIDEND_TAX_RATE;
  const netDividend = grossDividend - taxAmount;

  // Dividend Yield = (DPS / Current Price) * 100
  const dividendYield = currentPrice > 0 ? (dps / currentPrice) * 100 : 0;
  const annualizedYield = dividendYield * frequency;

  return {
    totalShares,
    grossDividend,
    taxAmount,
    netDividend,
    dividendYield,
    annualizedYield,
  };
}

// ==========================================
// RISK/REWARD & POSITION SIZING CALCULATOR
// ==========================================

export interface RiskRewardResult {
  riskPerShare: number;
  maxShares: number;
  maxLots: number;
  maxLossAmount: number;
  totalInvestment: number;
  rewardPerShare?: number;
  potentialProfit?: number;
  riskRewardRatio?: number;
  breakEvenPrice: number;
}

/**
 * Calculate Risk/Reward & Position Sizing
 * @param totalCapital - Total available capital
 * @param riskPercent - Maximum risk percentage per trade
 * @param buyPrice - Entry price
 * @param stopLoss - Stop loss price
 * @param targetProfit - Optional target profit price
 */
export function calculateRiskReward(
  totalCapital: number,
  riskPercent: number,
  buyPrice: number,
  stopLoss: number,
  targetProfit?: number
): RiskRewardResult {
  // Calculate risk per share
  const riskPerShare = Math.abs(buyPrice - stopLoss);

  // Calculate maximum risk amount
  const maxRiskAmount = (totalCapital * riskPercent) / 100;

  // Calculate maximum shares that can be bought
  const maxShares = riskPerShare > 0 ? Math.floor(maxRiskAmount / riskPerShare) : 0;

  // Round down to nearest lot
  const maxLots = Math.floor(maxShares / SHARES_PER_LOT);
  const actualMaxShares = maxLots * SHARES_PER_LOT;

  // Calculate actual investment and loss
  const totalInvestment = actualMaxShares * buyPrice;
  const maxLossAmount = actualMaxShares * riskPerShare;

  // Calculate reward if target is provided
  let rewardPerShare: number | undefined;
  let potentialProfit: number | undefined;
  let riskRewardRatio: number | undefined;

  if (targetProfit && targetProfit > buyPrice) {
    rewardPerShare = targetProfit - buyPrice;
    potentialProfit = actualMaxShares * rewardPerShare;
    riskRewardRatio = riskPerShare > 0 ? rewardPerShare / riskPerShare : 0;
  }

  return {
    riskPerShare,
    maxShares: actualMaxShares,
    maxLots,
    maxLossAmount,
    totalInvestment,
    rewardPerShare,
    potentialProfit,
    riskRewardRatio,
    breakEvenPrice: buyPrice,
  };
}

// ==========================================
// VALUATION CALCULATORS
// ==========================================

export interface GrahamNumberResult {
  grahamNumber: number;
  isValid: boolean;
  epsValid: boolean;
  bvpsValid: boolean;
}

/**
 * Calculate Graham Number
 * Formula: √(22.5 × EPS × BVPS)
 * @param eps - Earnings Per Share (must be positive)
 * @param bvps - Book Value Per Share (must be positive)
 */
export function calculateGrahamNumber(
  eps: number,
  bvps: number
): GrahamNumberResult {
  const epsValid = eps > 0;
  const bvpsValid = bvps > 0;
  const isValid = epsValid && bvpsValid;

  let grahamNumber = 0;
  if (isValid) {
    grahamNumber = Math.sqrt(GRAHAM_MULTIPLIER * eps * bvps);
  }

  return {
    grahamNumber,
    isValid,
    epsValid,
    bvpsValid,
  };
}

export interface PBVBandResult {
  bvps: number;
  bands: {
    pbvLevel: number;
    fairValue: number;
    discount?: number;
  }[];
}

/**
 * Calculate PBV Band Fair Values
 * @param bvps - Book Value Per Share
 * @param pbvLevels - Array of PBV multipliers (e.g., [0.5, 1, 1.5, 2])
 * @param currentPrice - Optional current price to show discount/premium
 */
export function calculatePBVBand(
  bvps: number,
  pbvLevels: number[],
  currentPrice?: number
): PBVBandResult {
  const bands = pbvLevels.map((pbvLevel) => {
    const fairValue = bvps * pbvLevel;
    let discount: number | undefined;

    if (currentPrice && fairValue > 0) {
      discount = ((fairValue - currentPrice) / fairValue) * 100;
    }

    return {
      pbvLevel,
      fairValue,
      discount,
    };
  });

  return {
    bvps,
    bands,
  };
}

// ==========================================
// COMPOUND INTEREST (BONUS)
// ==========================================

export interface CompoundInterestResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: {
    year: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

/**
 * Calculate Compound Interest with monthly contributions
 * @param principal - Initial investment
 * @param monthlyContribution - Monthly contribution amount
 * @param annualRate - Annual interest rate (as percentage)
 * @param years - Investment period in years
 */
export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): CompoundInterestResult {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let balance = principal;
  let totalContributions = principal;
  const yearlyBreakdown: CompoundInterestResult['yearlyBreakdown'] = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyRate;
    balance += interest + monthlyContribution;
    totalContributions += monthlyContribution;

    if (month % 12 === 0) {
      yearlyBreakdown.push({
        year: month / 12,
        balance,
        contributions: totalContributions,
        interest: balance - totalContributions,
      });
    }
  }

  return {
    futureValue: balance,
    totalContributions,
    totalInterest: balance - totalContributions,
    yearlyBreakdown,
  };
}
