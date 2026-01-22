// components/AddPondModal.js
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function AddPondModal({ visible, onClose, onAddPond }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onAddPond({
      name: name.trim(),
      breed: breed.trim() || 'Vannamei',
      location: location.trim() || 'Farm',
    });
    setName('');
    setBreed('');
    setLocation('');
    onClose();
  };

  const canSave = name.trim().length > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Add New Pond</Text>
          <Text style={styles.subtitle}>
            Basic details help us calculate a better health score.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Pond Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Pond 3 - Main"
              placeholderTextColor="#6b7280"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Breed</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Vannamei"
              placeholderTextColor="#6b7280"
              value={breed}
              onChangeText={setBreed}
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. East Farm"
              placeholderTextColor="#6b7280"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                !canSave && styles.primaryButtonDisabled,
              ]}
              disabled={!canSave}
              onPress={handleSave}
            >
              <Text style={styles.primaryButtonText}>Save Pond</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#020617',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  title: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 14,
  },
  form: {
    gap: 10,
  },
  label: {
    color: '#d1d5db',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#f9fafb',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
    gap: 10,
  },
  secondaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
  },
  secondaryButtonText: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '500',
  },
  primaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },
  primaryButtonDisabled: {
    backgroundColor: '#16a34a55',
  },
  primaryButtonText: {
    color: '#022c22',
    fontSize: 13,
    fontWeight: '700',
  },
});
