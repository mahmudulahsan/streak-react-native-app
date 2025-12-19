import { AccountCard } from '@/components/AccountCard';
import { AddAccountModal } from '@/components/AddAccountModal';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { BalanceCard } from '@/components/BalanceCard';
import { TransactionItem } from '@/components/TransactionItem';
import { Account, THEME, Transaction } from '@/constants/accounts';
import { storage } from '@/constants/storage';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isTransactionModalVisible, setTransactionModalVisible] = useState(false);

  // Load data on mount
  useEffect(() => {
    const initData = async () => {
      const savedAccounts = await storage.loadAccounts();
      const savedTransactions = await storage.loadTransactions();
      setAccounts(savedAccounts);
      setTransactions(savedTransactions);
      // Select all by default
      setSelectedAccountIds(savedAccounts.map(a => a.id));
    };
    initData();
  }, []);

  const totalBalance = useMemo(() => {
    const activeAccounts = accounts.filter(a => selectedAccountIds.includes(a.id));
    const accountBalance = activeAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const transactionBalance = transactions.reduce((sum, tx) => {
      if (!selectedAccountIds.includes(tx.accountId)) return sum;
      return tx.type === 'credit' ? sum + tx.amount : sum - tx.amount;
    }, 0);
    return accountBalance + transactionBalance;
  }, [accounts, transactions, selectedAccountIds]);

  const monthlySummary = useMemo(() => {
    return transactions.reduce(
      (acc, tx) => {
        if (!selectedAccountIds.includes(tx.accountId)) return acc;
        if (tx.type === 'credit') acc.earned += tx.amount;
        else acc.spent += tx.amount;
        return acc;
      },
      { spent: 0, earned: 0 }
    );
  }, [transactions, selectedAccountIds]);

  const handleAddAccount = async (newAccount: Account) => {
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    setSelectedAccountIds(prev => [...prev, newAccount.id]);
    await storage.saveAccounts(updated);
  };

  const handleToggleAccountSelection = (id: string) => {
    setSelectedAccountIds(prev =>
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const handleAddTransaction = async (newTx: Transaction) => {
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    await storage.saveTransactions(updated);
  };

  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <>
                {/* Header */}
                <View style={styles.header}>
                  <View>
                    <Text style={styles.brandTitle}>Amanah</Text>
                    <Text style={styles.brandSubtitle}>Manage your wealth</Text>
                  </View>
                  <TouchableOpacity style={styles.avatarBtn}>
                    <Image
                      source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                </View>

                {/* Balance Card */}
                <BalanceCard balance={totalBalance} />

                {/* Monthly Summary */}
                <View style={styles.summarySection}>
                  <Text style={styles.sectionTitle}>{currentMonth} Summary</Text>
                  <View style={styles.summaryCard}>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Spent</Text>
                      <Text style={[styles.summaryValue, { color: THEME.negative }]}>
                        -${monthlySummary.spent.toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Earned</Text>
                      <Text style={[styles.summaryValue, { color: THEME.positive }]}>
                        +${monthlySummary.earned.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Accounts Horizontal List */}
                <View style={styles.accountsSection}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>My Accounts</Text>
                    <TouchableOpacity onPress={() => setAccountModalVisible(true)}>
                      <MaterialIcons name="add-circle-outline" size={24} color={THEME.accent} />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    horizontal
                    data={accounts}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.accountsList}
                    renderItem={({ item }) => (
                      <AccountCard
                        item={item}
                        isSelected={selectedAccountIds.includes(item.id)}
                        onToggleSelection={() => handleToggleAccountSelection(item.id)}
                      />
                    )}
                    ListEmptyComponent={
                      <TouchableOpacity style={styles.emptyAccount} onPress={() => setAccountModalVisible(true)}>
                        <Text style={styles.emptyAccountText}>+ Add Account</Text>
                      </TouchableOpacity>
                    }
                  />
                </View>

                {/* Transactions Header */}
                <View style={styles.transactionSectionHeader}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                      <Text style={styles.filterText}>All</Text>
                      <MaterialIcons name="keyboard-arrow-down" size={20} color={THEME.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            }
            renderItem={({ item }) => <TransactionItem transaction={item} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No transactions yet.</Text>
            }
          />

          {/* Floating Plus Button */}
          <View style={styles.fabContainer}>
            <TouchableOpacity
              style={styles.fab}
              onPress={() => setTransactionModalVisible(true)}
            >
              <MaterialIcons name="add" size={32} color={THEME.background} />
            </TouchableOpacity>
          </View>

          <AddAccountModal
            visible={isAccountModalVisible}
            onClose={() => setAccountModalVisible(false)}
            onAdd={handleAddAccount}
          />

          <AddTransactionModal
            visible={isTransactionModalVisible}
            onClose={() => setTransactionModalVisible(false)}
            onAdd={handleAddTransaction}
            accounts={accounts}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: THEME.accent,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: THEME.textSecondary,
    fontWeight: '600',
    marginTop: -2,
  },
  avatarBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: THEME.accent,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },

  summarySection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: THEME.cardBg,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    color: THEME.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  summaryDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  accountsSection: {
    marginTop: 30,
  },
  accountsList: {
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10,
    gap: 12,
  },
  emptyAccount: {
    width: 150,
    height: 80,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: THEME.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyAccountText: {
    color: THEME.textSecondary,
    fontWeight: '600',
  },
  transactionSectionHeader: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.text,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterText: {
    color: THEME.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    color: THEME.textSecondary,
    marginTop: 30,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: THEME.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});
