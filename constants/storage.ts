import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Transaction } from './accounts';

const ACCOUNTS_KEY = '@amanah_accounts';
const TRANSACTIONS_KEY = '@amanah_transactions';
const CURRENCY_KEY = '@amanah_currency';

export const storage = {
    // Save Currency
    saveCurrency: async (currencyCode: string) => {
        try {
            await AsyncStorage.setItem(CURRENCY_KEY, currencyCode);
        } catch (e) {
            console.error('Failed to save currency', e);
        }
    },

    // Load Currency
    loadCurrency: async (): Promise<string> => {
        try {
            const code = await AsyncStorage.getItem(CURRENCY_KEY);
            return code || 'USD';
        } catch (e) {
            console.error('Failed to load currency', e);
            return 'USD';
        }
    },

    // Save Accounts
    saveAccounts: async (accounts: Account[]) => {
        try {
            await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
        } catch (e) {
            console.error('Failed to save accounts', e);
        }
    },

    // Load Accounts
    loadAccounts: async (): Promise<Account[]> => {
        try {
            const data = await AsyncStorage.getItem(ACCOUNTS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load accounts', e);
            return [];
        }
    },

    // Save Transactions
    saveTransactions: async (transactions: Transaction[]) => {
        try {
            await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
        } catch (e) {
            console.error('Failed to save transactions', e);
        }
    },

    // Load Transactions
    loadTransactions: async (): Promise<Transaction[]> => {
        try {
            const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load transactions', e);
            return [];
        }
    },

    // Clear Storage (for reset)
    clearAll: async () => {
        try {
            await AsyncStorage.multiRemove([ACCOUNTS_KEY, TRANSACTIONS_KEY]);
        } catch (e) {
            console.error('Failed to clear storage', e);
        }
    }
};
