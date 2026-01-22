import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PondCard({ pond, pairing, connected, onPair, onTogglePriority, onPress }) {
  const isPaired = pond.device?.paired;

  const statusColor =
    pond.healthStatus === 'Healthy' ? '#22c55e' :
    pond.healthStatus === 'Warning' ? '#f97316' : '#ef4444';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={isPaired ? onPress : undefined}
      activeOpacity={isPaired ? 0.8 : 1}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>{pond.name}</Text>
          <Text style={styles.breed}>{pond.breed}</Text>
        </View>

        {isPaired && (
          <View style={styles.healthBadge}>
            <Text style={styles.healthLabel}>Health</Text>
            <Text style={[styles.healthValue, { color: statusColor }]}>
              {pond.healthScore ?? '--'}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.location}>📍 {pond.location}</Text>

      {/* PAIRING STATES */}
      {!isPaired && !pairing && !connected && (
        <TouchableOpacity style={styles.pairBtn} onPress={onPair}>
          <Text style={styles.pairText}>Pair Device</Text>
        </TouchableOpacity>
      )}

      {pairing && (
        <View style={styles.statusRow}>
          <ActivityIndicator size="small" color="#22d3ee" />
          <Text style={styles.pairingText}>Pairing device…</Text>
        </View>
      )}

      {connected && (
        <View style={styles.statusRow}>
          <Text style={styles.connectedText}>✓ Connected successfully</Text>
        </View>
      )}

      {/* METRICS SECTION - SAFE RENDERING */}
      {isPaired && !connected && (
        <>
          <View style={styles.statusRow}>
            <Text style={[styles.status, { color: statusColor }]}>
              {pond.healthStatus || 'Initializing...'}
            </Text>
            <TouchableOpacity onPress={onTogglePriority}>
              <Text style={[styles.star, pond.isHighPriority && styles.starActive]}>★</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.metrics}>
            pH {pond.metrics?.ph ?? '--'} · 
            O₂ {pond.metrics?.oxygen ?? '--'} mg/L ·
            Temp {pond.metrics?.temperature ?? '--'}°C ·
            NH₃ {pond.metrics?.ammonia ?? '--'} ppm
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#020617', borderRadius: 20, borderWidth: 1, borderColor: '#1e293b', padding: 16, marginBottom: 14 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: '#f8fafc', fontSize: 16, fontWeight: '700' },
  breed: { color: '#94a3b8', fontSize: 12 },
  healthBadge: { alignItems: 'center', backgroundColor: '#0f172a', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  healthLabel: { color: '#94a3b8', fontSize: 10 },
  healthValue: { fontSize: 18, fontWeight: '800' },
  location: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  pairBtn: { marginTop: 12, backgroundColor: '#22d3ee', borderRadius: 12, paddingVertical: 10 },
  pairText: { textAlign: 'center', fontWeight: '700', color: '#022c22' },
  pairingText: { color: '#22d3ee', marginLeft: 8 },
  connectedText: { color: '#22c55e', fontWeight: '700' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  status: { fontWeight: '700' },
  star: { fontSize: 22, color: '#475569' },
  starActive: { color: '#facc15' },
  metrics: { color: '#94a3b8', fontSize: 12, marginTop: 6 },
});