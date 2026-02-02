// Cal.com booking link
export const CAL_COM_LINK = 'https://cal.com/simpliflow-office-e6a9co/leadflow';

// Webhook URL for form submissions
export const WEBHOOK_URL = 'https://n8n.simpliflow.me/webhook/c850324e-a33a-4c53-aca8-3ef4d020bc23';

// Demo video URL (YouTube/Vimeo)
export const DEMO_VIDEO_URL = 'https://youtube.com/shorts/CP2oHQsYhiE';

// Pricing
export const PRICE_ILS = '2,930';
export const PRICE_USD = '799';

// Contact information
export const CONTACT = {
  whatsapp: '+972-55-992-8087',
  email: 'moshe@pahutomazia.com',
};

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/p/%D7%A4%D7%A9%D7%95%D7%98%D7%95%D7%9E%D7%A6%D7%99%D7%94-%D7%9E%D7%A4%D7%A9%D7%98%D7%99%D7%9D-%D7%AA%D7%94%D7%9C%D7%99%D7%9B%D7%99%D7%9D-%D7%9E%D7%A7%D7%93%D7%9E%D7%99%D7%9D-%D7%A2%D7%A1%D7%A7%D7%99%D7%9D-61571198279699/',
  linkedin: '',  // TODO: Add LinkedIn company URL if available
  twitter: '',   // TODO: Add Twitter/X profile URL if available
  instagram: '', // TODO: Add Instagram profile URL if available
  youtube: 'https://www.youtube.com/@pashutomazia',
};

// Company legal information
// TODO: Fill in your company's legal details
export const COMPANY_INFO = {
  legalName: '',              // TODO: Add official company name (e.g., 'LeadWise Ltd.')
  registrationNumber: '',     // TODO: Add company registration number or business license (e.g., 'ח.פ 514567890')
  address: '',                // TODO: Add official address (optional, e.g., 'Rothschild 123, Tel Aviv')
  foundedYear: '2025',        // Year the company was founded
};

// ROI Calculator defaults
export const ROI_DEFAULTS = {
  conversionImprovement: 0.20, // 20% improvement in lead conversion
  minLeadValue: 100,
  maxLeadValue: 10000,
  minLeadsPerMonth: 1,
  maxLeadsPerMonth: 1000,
};

// Urgency settings (Set these based on your actual capacity)
export const URGENCY = {
  enabled: true,                    // Set to false to disable all urgency elements
  monthlySlotsTotal: 10,            // Total onboarding slots per month
  bonusDeadline: '2026-02-28',      // Early bird bonus deadline (YYYY-MM-DD)
  showRecentSignups: false,         // Show "X just signed up" notifications (only if real)
  timerHoursFromNow: 72,            // Timer shows this many hours from when the user visits (72 = 3 days)
};

// Dynamic function to calculate how many slots are used based on the day of the month
export const getDynamicSlotsUsed = (): number => {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  // Calculate month progress (0-1)
  const monthProgress = dayOfMonth / lastDayOfMonth;

  // Beginning of month (days 1-5): 2-3 slots used (8-7 remaining)
  // Mid-month (days 10-15): 4-5 slots used (6-5 remaining)
  // End of month (days 20-30): 6-8 slots used (4-2 remaining)

  if (monthProgress < 0.15) {
    // Days 1-4/5 of the month
    return 2;
  } else if (monthProgress < 0.35) {
    // Days 5-10 of the month
    return 3;
  } else if (monthProgress < 0.5) {
    // Days 11-15 of the month
    return 4;
  } else if (monthProgress < 0.65) {
    // Days 16-19 of the month
    return 5;
  } else if (monthProgress < 0.8) {
    // Days 20-24 of the month
    return 6;
  } else if (monthProgress < 0.9) {
    // Days 25-27 of the month
    return 7;
  } else {
    // Days 28-end of month
    return 8;
  }
};
