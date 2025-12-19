import { Account, THEME, Transaction } from '@/constants/accounts';
import React, { useState } from 'react';
import {
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

interface AddTransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (transaction: Transaction) => void;
    accounts: Account[];
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
    visible,
    onClose,
    onAdd,
    accounts,
}) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'credit' | 'expense'>('expense');
    const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || '');

    const handleAdd = () => {
        if (!amount || !category || !selectedAccountId) return;

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            accountId: selectedAccountId,
            amount: parseFloat(amount),
            category,
            icon: type === 'credit' ? 'attach-money' : 'shopping-cart',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }),
            type,
        };

        onAdd(newTransaction);
        setAmount('');
        setCategory('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Transaction</Text>

                        <View style={styles.typeContainer}>
                            <TouchableOpacity
                                style={[styles.typeButton, type === 'expense' && styles.activeExpense]}
                                onPress={() => setType('expense')}
                            >
                                <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Expense</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.typeButton, type === 'credit' && styles.activeCredit]}
                                onPress={() => setType('credit')}
                            >
                                <Text style={[styles.typeText, type === 'credit' && styles.activeTypeText]}>Income</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Amount ($)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.00"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="decimal-pad"
                            placeholderTextColor="#64748b"
                        />

                        <Text style={styles.label}>Category</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Shopping, Salary, Gaming..."
                            value={category}
                            onChangeText={setCategory}
                            placeholderTextColor="#64748b"
                        />

                        <Text style={styles.label}>Select Account</Text>
                        <View style={styles.accountList}>
                            {accounts.map((acc) => (
                                <TouchableOpacity
                                    key={acc.id}
                                    style={[
                                        styles.accountItem,
                                        selectedAccountId === acc.id && { borderColor: THEME.accent },
                                    ]}
                                    onPress={() => setSelectedAccountId(acc.id)}
                                >
                                    <Text style={[styles.accountItemText, selectedAccountId === acc.id && { color: THEME.accent }]}>
                                        {acc.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.submitButton]} onPress={handleAdd}>
                                <Text style={styles.submitText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: THEME.cardBg,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        minHeight: '60%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    typeContainer: {
        flexDirection: 'row',
        backgroundColor: THEME.background,
        borderRadius: 15,
        padding: 5,
        marginBottom: 20,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeExpense: {
        backgroundColor: '#ef4444',
    },
    activeCredit: {
        backgroundColor: THEME.positive,
    },
    typeText: {
        color: THEME.textSecondary,
        fontWeight: '700',
    },
    activeTypeText: {
        color: '#fff',
    },
    label: {
        color: THEME.textSecondary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 10,
    },
    input: {
        backgroundColor: THEME.background,
        borderRadius: 15,
        padding: 15,
        color: '#fff',
        fontSize: 16,
        marginBottom: 15,
    },
    accountList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    accountItem: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: THEME.cardBg,
        backgroundColor: THEME.background,
    },
    accountItemText: {
        color: THEME.textSecondary,
        fontWeight: '600',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#334155',
    },
    submitButton: {
        backgroundColor: THEME.accent,
    },
    cancelText: {
        color: '#fff',
        fontWeight: '700',
    },
    submitText: {
        color: THEME.background,
        fontWeight: '700',
    },
});
