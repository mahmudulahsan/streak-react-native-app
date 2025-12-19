import { THEME } from '@/constants/accounts';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BalanceCardProps {
    balance: number;
    label?: string;
    symbol?: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, label = 'Your Balance', symbol = '$' }) => {
    const formattedBalance = `${symbol}${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <LinearGradient
            colors={[THEME.accent, THEME.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <Text style={styles.balanceText}>{formattedBalance}</Text>
            <View style={styles.labelContainer}>
                <View style={styles.dot} />
                <Text style={styles.label}>{label}</Text>
                <View style={styles.dot} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: THEME.accentDark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    balanceText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1b2e35', // Dark color for contrast against orange
        letterSpacing: 1,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        opacity: 0.8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1b2e35',
        marginHorizontal: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#1b2e35',
    },
});
