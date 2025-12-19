import { Account, THEME } from '@/constants/accounts';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AccountCardProps {
    item: Account;
    isSelected?: boolean;
    onToggleSelection?: () => void;
    symbol?: string;
}

export const AccountCard: React.FC<AccountCardProps> = ({ item, isSelected = true, onToggleSelection, symbol = '$' }) => {
    return (
        <View style={[styles.cardWrapper, !isSelected && styles.cardDeselected]}>
            <TouchableOpacity
                style={[styles.selectionToggle, { backgroundColor: item.color }]}
                onPress={onToggleSelection}
                activeOpacity={0.8}
            >
                <MaterialIcons name={item.icon as any} size={24} color="#fff" />
                {isSelected && (
                    <View style={styles.checkBadge}>
                        <MaterialIcons name="check" size={10} color={item.color} />
                    </View>
                )}
            </TouchableOpacity>

            <Link
                href={{
                    pathname: "/account/[id]",
                    params: { id: item.id, name: item.name, balance: item.balance }
                }}
                asChild
            >
                <TouchableOpacity style={styles.cardInfo} activeOpacity={0.7}>
                    <View style={styles.details}>
                        <Text style={styles.accountName}>{item.name}</Text>
                        <Text style={styles.accountBalance}>
                            {symbol}{item.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color={THEME.textSecondary} />
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.cardBg,
        padding: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        width: 180,
        marginRight: 12,
    },
    cardDeselected: {
        opacity: 0.5,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    selectionToggle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        position: 'relative',
    },
    checkBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    cardInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    details: {
        flex: 1,
    },
    accountName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    accountBalance: {
        fontSize: 12,
        color: THEME.accent,
        fontWeight: '700',
        marginTop: 1,
    },
});
