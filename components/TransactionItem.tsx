import { THEME, Transaction } from '@/constants/accounts';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TransactionItemProps {
    transaction: Transaction;
    accountName?: string;
    symbol?: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, accountName, symbol = '$' }) => {
    const isExpense = transaction.type === 'expense';

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name={transaction.icon as any} size={24} color="#fff" />
                </View>
                <View style={styles.details}>
                    <Text style={styles.category}>{transaction.category}</Text>
                    <Text style={styles.date}>
                        {accountName ? `${accountName} • ` : ''}
                        {transaction.date}
                    </Text>
                </View>
            </View>
            <Text style={[styles.amount, { color: isExpense ? THEME.negative : THEME.positive }]}>
                {isExpense ? `-${symbol}${transaction.amount.toLocaleString()}` : `+${symbol}${transaction.amount.toLocaleString()}`}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: THEME.cardBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    details: {
        justifyContent: 'center',
    },
    category: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.text,
    },
    date: {
        fontSize: 12,
        color: THEME.textSecondary,
        marginTop: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: '800',
    },
});
