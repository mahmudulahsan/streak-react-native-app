export const ICONS = [
    'account-balance',
    'payments',
    'credit-card',
    'savings',
    'account-balance-wallet',
    'trending-up',
    'attach-money',
    'shopping-cart',
    'videogame-asset',
    'charity',
] as const;

export const COLORS = [
    '#2563eb', // Blue
    '#10b981', // Green
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#f59e0b', // Orange
    '#ec4899', // Pink
    '#64748b', // Slate
] as const;

export const THEME = {
    background: '#1b2e35',
    cardBg: '#243b44',
    accent: '#ffb471',
    accentDark: '#ff8a3d',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    positive: '#10b981',
    negative: '#ffb471', // Matching the yellow/orange in the image for transactions
};

export interface Currency {
    code: string;
    symbol: string;
    label: string;
}

export const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'BDT', symbol: '৳', label: 'Taka' },
    { code: 'INR', symbol: '₹', label: 'Rupee' },
    { code: 'SAR', symbol: '﷼', label: 'Riyal' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
];

export interface Transaction {
    id: string;
    accountId: string;
    amount: number;
    category: string;
    icon: string;
    date: string;
    type: 'credit' | 'expense';
}

export interface Account {
    id: string;
    name: string;
    icon: typeof ICONS[number];
    color: string;
    balance: number;
}
