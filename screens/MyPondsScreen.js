import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddPondModal from '../components/AddPondModal';
import PondCard from '../components/PondCard';

import { API_URL } from '../config/api';


export default function MyPondsScreen({ navigation }) {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pairingId, setPairingId] = useState(null);
  const [connectedId, setConnectedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => { fetchPonds(); }, []);

  const fetchPonds = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/ponds`);
      setPonds(res.data);
    } catch {
      Alert.alert('Connection Error', 'Backend not reachable');
    } finally { setLoading(false); }
  };

  const addPond = async (pondData) => {
    try {
      const res = await axios.post(`${API_URL}/api/ponds`, pondData);
      setPonds(res.data);
      setShowAddModal(false);
    } catch { Alert.alert('Error', 'Failed to add pond'); }
  };

  const pairDevice = async (pondId) => {
    setPairingId(pondId);
    try {
      await new Promise(r => setTimeout(r, 2000)); // Show spinner
      await axios.post(`${API_URL}/api/ponds/${pondId}/pair`);
      
      setPairingId(null);
      setConnectedId(pondId); // Show success message
      
      await new Promise(r => setTimeout(r, 1500)); // Hold success message
      await fetchPonds(); // Get the new metrics
    } catch {
      await fetchPonds();
    } finally {
      setPairingId(null);
      setConnectedId(null);
    }
  };

  const togglePriority = async (pondId) => {
    const res = await axios.patch(`${API_URL}/api/ponds/${pondId}/priority`);
    setPonds(res.data);
  };

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color="#22d3ee" /></View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>My Ponds</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddModal(true)}>
            <Text style={styles.addBtnText}>＋ Add Pond</Text>
          </TouchableOpacity>
        </View>

        {ponds.length === 0 ? (
          <Text style={styles.empty}>No ponds found. Click + to start.</Text>
        ) : (
          ponds.map((pond) => (
            <PondCard
              key={pond.id}
              pond={pond}
              pairing={pairingId === pond.id}
              connected={connectedId === pond.id}
              onPair={() => pairDevice(pond.id)}
              onTogglePriority={() => togglePriority(pond.id)}
              onPress={() => navigation.navigate('PondDetails', { pond })}
            />
          ))
        )}
      </ScrollView>

      <AddPondModal visible={showAddModal} onClose={() => setShowAddModal(false)} onAddPond={addPond} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageTitle: { color: '#f8fafc', fontSize: 24, fontWeight: '800' },
  addBtn: { backgroundColor: '#22d3ee', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  addBtnText: { color: '#022c22', fontWeight: '700' },
  empty: { color: '#64748b', textAlign: 'center', marginTop: 50 },
  center: { flex: 1, backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' },
});