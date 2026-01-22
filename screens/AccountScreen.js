// screens/AccountScreen.js
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserContext } from '../UserContext';

export default function AccountScreen() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || '');
  const [contact, setContact] = useState(user?.contact || '');
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);

  useEffect(() => {
    setName(user?.name || '');
    setContact(user?.contact || '');
    setProfilePic(user?.profilePic || null);
  }, [user]);

  const handlePickImage = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need access to your gallery to pick a profile picture.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setProfilePic(asset.uri);
    }
  };

  const handleSave = () => {
    setUser({
      ...user,
      name: name || user.name,
      contact: contact || user.contact,
      profilePic,
    });

    Alert.alert('Profile Updated', 'Your account details have been saved.');
  };

return (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <Text style={styles.title}>My Account</Text>
    <Text style={styles.subtitle}>Manage your CPF AquaGrow profile</Text>

    {/* Avatar Section */}
    <View style={styles.avatarSection}>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarInitials}>
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.avatarButton} onPress={handlePickImage}>
        <Text style={styles.avatarButtonText}>Change Photo</Text>
      </TouchableOpacity>
    </View>

    {/* Form */}
    <View style={styles.form}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
        placeholderTextColor="#6b7280"
      />

      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholder="Email / Phone number"
        placeholderTextColor="#6b7280"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>

    {/* Logout Button — ✅ NOW INSIDE SAME PARENT */}
    <TouchableOpacity
      style={{
        marginTop: 28,
        paddingVertical: 14,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#b91c1c',
        alignItems: 'center',
      }}
      onPress={() => setUser(null)}
    >
      <Text style={{ color: '#fca5a5', fontWeight: '700' }}>
        Logout
      </Text>
    </TouchableOpacity>
  </ScrollView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: '#f9fafb',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: '#0f172a',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  avatarInitials: {
    color: '#e5e7eb',
    fontSize: 32,
    fontWeight: '700',
  },
  avatarButton: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#06b6d4',
  },
  avatarButtonText: {
    color: '#06b6d4',
    fontSize: 13,
    fontWeight: '600',
  },
  form: {
    gap: 12,
  },
  label: {
    color: '#d1d5db',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#f9fafb',
    fontSize: 14,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#022c22',
    fontSize: 16,
    fontWeight: '700',
  },
  infoCard: {
    marginTop: 24,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  infoTitle: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    color: '#9ca3af',
    fontSize: 12,
  },
});


