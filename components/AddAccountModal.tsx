import { Account, COLORS, ICONS } from '@/constants/accounts';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface AddAccountModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (account: Account) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
    visible,
    onClose,
    onAdd,
}) => {
    const [accountName, setAccountName] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<typeof ICONS[number]>(ICONS[0]);
    const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);

    const handleAdd = () => {
        if (!accountName.trim()) return;

        const newAccount: Account = {
            id: Date.now().toString(),
            name: accountName,
            icon: selectedIcon,
            color: selectedColor,
            balance: parseFloat(initialBalance) || 0,
        };

        onAdd(newAccount);
        setAccountName('');
        setInitialBalance('');
        setSelectedIcon(ICONS[0]);
        setSelectedColor(COLORS[0]);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Create Account</Text>

                    <Text style={styles.label}>Account Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Savings, Salary..."
                        value={accountName}
                        onChangeText={setAccountName}
                        placeholderTextColor="#64748b"
                    />

                    <Text style={styles.label}>Initial Balance ($)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        value={initialBalance}
                        onChangeText={setInitialBalance}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#64748b"
                    />

                    <Text style={styles.label}>Select Icon</Text>
                    <View style={styles.grid}>
                        {ICONS.map((icon) => (
                            <TouchableOpacity
                                key={icon}
                                style={[
                                    styles.gridItem,
                                    selectedIcon === icon && styles.selectedGridItem,
                                ]}
                                onPress={() => setSelectedIcon(icon)}
                            >
                                <MaterialIcons
                                    name={icon as any}
                                    size={24}
                                    color={selectedIcon === icon ? '#2563eb' : '#64748b'}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Select Color</Text>
                    <View style={styles.grid}>
                        {COLORS.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[
                                    styles.colorItem,
                                    { backgroundColor: color },
                                    selectedColor === color && styles.selectedColorItem,
                                ]}
                                onPress={() => setSelectedColor(color)}
                            />
                        ))}
                    </View>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.submitButton]}
                            onPress={handleAdd}
                        >
                            <Text style={styles.submitButtonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        minHeight: '60%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0f172a',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#f1f5f9',
        padding: 12,
        borderRadius: 12,
        fontSize: 16,
        color: '#0f172a',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
    },
    gridItem: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedGridItem: {
        borderColor: '#2563eb',
        backgroundColor: '#eff6ff',
    },
    colorItem: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedColorItem: {
        borderColor: '#0f172a',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
        marginBottom: 20,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f1f5f9',
    },
    submitButton: {
        backgroundColor: '#2563eb',
    },
    cancelButtonText: {
        color: '#64748b',
        fontWeight: '600',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
