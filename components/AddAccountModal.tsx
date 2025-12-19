import { Account, COLORS, ICONS, THEME } from '@/constants/accounts';
import { MaterialIcons } from '@expo/vector-icons';
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Create Account</Text>

                        <Text style={styles.label}>Account Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Savings, Salary..."
                            value={accountName}
                            onChangeText={setAccountName}
                            placeholderTextColor={THEME.textSecondary}
                        />

                        <Text style={styles.label}>Initial Balance ($)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.00"
                            value={initialBalance}
                            onChangeText={setInitialBalance}
                            keyboardType="decimal-pad"
                            placeholderTextColor={THEME.textSecondary}
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
                                        color={selectedIcon === icon ? THEME.accent : THEME.textSecondary}
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
                                <Text style={styles.submitButtonText}>Create Account</Text>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: THEME.cardBg,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        minHeight: '60%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 20,
        color: THEME.text,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textSecondary,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: THEME.background,
        padding: 15,
        borderRadius: 15,
        fontSize: 16,
        color: THEME.text,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
    },
    gridItem: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: THEME.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    selectedGridItem: {
        borderColor: THEME.accent,
        backgroundColor: 'rgba(255, 180, 113, 0.1)',
    },
    colorItem: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedColorItem: {
        borderColor: THEME.text,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
        marginBottom: 20,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    submitButton: {
        backgroundColor: THEME.accent,
    },
    cancelButtonText: {
        color: THEME.textSecondary,
        fontWeight: '700',
    },
    submitButtonText: {
        color: THEME.background,
        fontWeight: '700',
    },
});
