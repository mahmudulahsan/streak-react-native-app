import { CURRENCIES, Currency, THEME } from '@/constants/accounts';
import { storage } from '@/constants/storage';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
    currentCurrencyCode: string;
    onCurrencyChange: (currency: Currency) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    visible,
    onClose,
    currentCurrencyCode,
    onCurrencyChange,
}) => {
    const handleSelectCurrency = async (currency: Currency) => {
        await storage.saveCurrency(currency.code);
        onCurrencyChange(currency);
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>Settings</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <MaterialIcons name="close" size={24} color={THEME.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Choose Currency</Text>
                    <ScrollView style={styles.currencyList}>
                        {CURRENCIES.map((currency) => {
                            const isSelected = currentCurrencyCode === currency.code;
                            return (
                                <TouchableOpacity
                                    key={currency.code}
                                    style={[
                                        styles.currencyItem,
                                        isSelected && styles.selectedItem,
                                    ]}
                                    onPress={() => handleSelectCurrency(currency)}
                                >
                                    <View style={styles.currencyInfo}>
                                        <View style={[styles.symbolCircle, isSelected && styles.selectedSymbolCircle]}>
                                            <Text style={[styles.symbolText, isSelected && styles.selectedSymbolText]}>
                                                {currency.symbol}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.currencyLabel, isSelected && styles.selectedText]}>
                                                {currency.label}
                                            </Text>
                                            <Text style={styles.currencyCode}>{currency.code}</Text>
                                        </View>
                                    </View>
                                    {isSelected && (
                                        <MaterialIcons name="check-circle" size={24} color={THEME.accent} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: THEME.cardBg,
        borderRadius: 30,
        padding: 24,
        width: '100%',
        maxHeight: '80%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: THEME.text,
    },
    closeBtn: {
        padding: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textSecondary,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    currencyList: {
        marginBottom: 10,
    },
    currencyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 15,
        backgroundColor: THEME.background,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    selectedItem: {
        borderColor: THEME.accent,
        backgroundColor: 'rgba(255, 180, 113, 0.05)',
    },
    currencyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    symbolCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: THEME.cardBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    selectedSymbolCircle: {
        backgroundColor: THEME.accent,
        borderColor: THEME.accent,
    },
    symbolText: {
        fontSize: 18,
        fontWeight: '700',
        color: THEME.text,
    },
    selectedSymbolText: {
        color: THEME.background,
    },
    currencyLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.text,
    },
    selectedText: {
        color: THEME.accent,
    },
    currencyCode: {
        fontSize: 12,
        color: THEME.textSecondary,
        fontWeight: '500',
    },
});
