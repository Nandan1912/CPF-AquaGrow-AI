import React, { useContext, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserContext } from '../UserContext';

export default function LoginScreen({ onLoginSuccess }) {
  const { setUser } = useContext(UserContext);

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendVerificationCode = () => {
    Alert.alert(
      'Verification Code Sent',
      'Use the demo verification code: 1234'
    );
    setIsModalVisible(true);
  };

  const handleVerifyCode = () => {
    if (verificationCode === '1234') {
      setIsVerified(true);
      setIsModalVisible(false);
      Alert.alert('Verified', 'Contact verified successfully.');
    } else {
      Alert.alert('Invalid Code', 'Incorrect verification code.');
    }
  };

  const handleLogin = () => {
    // ✅ SET USER CONTEXT HERE
    setUser({
      name: username,
      contact: emailOrPhone,
      profilePic: null,
      role: 'Farmer',
    });

    onLoginSuccess();
  };

  const canLogin = isVerified && emailOrPhone && username && password;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>CPF AquaGrow AI</Text>
        <Text style={styles.subtitle}>Smart aquaculture assistant</Text>

        <TextInput
          style={styles.input}
          placeholder="Email or Phone"
          placeholderTextColor="#6b7280"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#6b7280"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSendVerificationCode}>
          <Text style={styles.secondaryButtonText}>Send Verification Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, !canLogin && styles.disabled]}
          disabled={!canLogin}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TextInput
              style={styles.input}
              placeholder="Enter code (1234)"
              placeholderTextColor="#6b7280"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyCode}>
              <Text style={styles.primaryButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  inner: { padding: 24, paddingTop: 80 },
  title: { color: '#f9fafb', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#9ca3af', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: '#f9fafb',
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 12,
  },
  disabled: { opacity: 0.5 },
  primaryButtonText: { fontWeight: '700', color: '#022c22' },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#06b6d4',
    padding: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#06b6d4' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#020617',
    padding: 20,
    borderRadius: 16,
  },
});
