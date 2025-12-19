import { BalanceCard } from '@/components/BalanceCard';
import { TransactionItem } from '@/components/TransactionItem';
import { THEME, Transaction } from '@/constants/accounts';
import { storage } from '@/constants/storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AccountDetailScreen() {
    const { id, name, balance } = useLocalSearchParams();
    const router = useRouter();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Load account-specific transactions on mount
    useEffect(() => {
        const loadAccountData = async () => {
            const allTransactions = await storage.loadTransactions();
            const filtered = allTransactions.filter(tx => tx.accountId === id);
            setTransactions(filtered);
        };
        loadAccountData();
    }, [id]);

    const currentBalance = useMemo(() => {
        const initial = parseFloat(balance as string) || 0;
        const txBalance = transactions.reduce((sum, tx) => {
            return tx.type === 'credit' ? sum + tx.amount : sum - tx.amount;
        }, 0);
        return initial + txBalance;
    }, [balance, transactions]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionItem transaction={item} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                                <MaterialIcons name="chevron-left" size={32} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.title}>{name}</Text>
                            <View style={{ width: 44 }} />
                        </View>

                        <BalanceCard balance={currentBalance} label={`${name} Balance`} />

                        <View style={styles.transactionSectionHeader}>
                            <Text style={styles.sectionTitle}>Recent Activity</Text>
                        </View>
                    </>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No activity for this account.</Text>
                }
                contentContainerStyle={styles.listContent}
            />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backBtn: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: THEME.cardBg,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    transactionSectionHeader: {
        marginTop: 30,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: THEME.text,
        marginLeft: 20,
    },
    listContent: {
        paddingBottom: 40,
    },
    emptyText: {
        textAlign: 'center',
        color: THEME.textSecondary,
        marginTop: 40,
    },
});
