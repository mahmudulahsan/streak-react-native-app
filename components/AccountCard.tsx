import { Account, THEME } from '@/constants/accounts';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AccountCardProps {
    item: Account;
}

export const AccountCard: React.FC<AccountCardProps> = ({ item }) => {
    return (
        <Link
            href={{
                pathname: "/account/[id]",
                params: { id: item.id, name: item.name, balance: item.balance }
            }}
            asChild
        >
            <TouchableOpacity style={styles.accountCard} activeOpacity={0.7}>
                <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                    <MaterialIcons name={item.icon as any} size={24} color="#fff" />
                </View>
                <View style={styles.details}>
                    <Text style={styles.accountName}>{item.name}</Text>
                    <Text style={styles.accountBalance}>${item.balance.toFixed(2)}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={THEME.textSecondary} />
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    accountCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.cardBg,
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    details: {
        flex: 1,
    },
    accountName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    accountBalance: {
        fontSize: 14,
        color: THEME.accent,
        fontWeight: '600',
        marginTop: 2,
    },
});
