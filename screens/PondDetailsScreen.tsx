import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';



export default function PondDetailsScreen({ route }) {
  const { pond } = route.params;

  const m = pond.metrics || {
    ph: '--',
    oxygen: '--',
    temperature: '--',
    ammonia: '--',
  };

  /* =========================================================
     HEALTH COLOR (BACKEND-DRIVEN)
  ========================================================= */

  const getHealthColor = () => {
    if (pond.healthStatus) {
      if (pond.healthStatus.toLowerCase().includes('critical')) return '#F87171';
      if (pond.healthStatus.toLowerCase().includes('warning')) return '#FACC15';
      return '#4ADE80';
    }

    if (pond.healthScore !== undefined) {
      if (pond.healthScore < 50) return '#F87171';
      if (pond.healthScore < 75) return '#FACC15';
      return '#4ADE80';
    }

    return '#9ca3af';
  };

  const healthColor = getHealthColor();

  /* =========================================================
     METRIC STATUS COLORS
  ========================================================= */

  const statusColor = (type, value) => {
    if (value === '--') return '#9ca3af';

    if (type === 'ph') {
      if (value < 7.5 || value > 8.2) return '#FACC15';
      return '#4ADE80';
    }
    if (type === 'oxygen') {
      if (value < 4) return '#F87171';
      if (value < 5.5) return '#FACC15';
      return '#4ADE80';
    }
    if (type === 'temperature') {
      if (value < 26 || value > 32) return '#FACC15';
      return '#4ADE80';
    }
    if (type === 'ammonia') {
      if (value > 0.5) return '#F87171';
      if (value > 0.3) return '#FACC15';
      return '#4ADE80';
    }
    return '#4ADE80';
  };

  /* =========================================================
     INSIGHT ENGINE (WITH GUARANTEED PRODUCTS)
  ========================================================= */

  const insights = {
    keyConcern: null,
    microorganism: [],
    diseases: [],
    actions: [],
    products: [],
  };

  let confidenceScore = 0;

  // Temperature
  if (m.temperature !== '--' && m.temperature > 30) {
    insights.keyConcern = 'Elevated water temperature is accelerating biological activity.';
    insights.microorganism.push(
      `High temperature (${m.temperature}°C) increases plankton bloom and bacterial metabolism.`
    );
    insights.diseases.push(
      'Sustained heat stress may suppress shrimp immunity and increase disease susceptibility.'
    );
    insights.actions.push(
      'Reduce feeding during peak afternoon hours and strengthen night-time aeration.'
    );
    insights.products.push(
      'CPF SmartBalance Feed – formulated for stress conditions.'
    );
    confidenceScore++;
  }

  // Ammonia
  if (m.ammonia !== '--' && m.ammonia > 0.5) {
    insights.keyConcern =
      insights.keyConcern ||
      'Elevated ammonia levels pose a direct physiological risk to shrimp.';
    insights.microorganism.push(
      `Ammonia at ${m.ammonia} ppm indicates organic waste accumulation.`
    );
    insights.diseases.push(
      'High ammonia exposure can damage gill tissue and impair oxygen absorption.'
    );
    insights.actions.push(
      'Siphon bottom sludge and perform partial water exchange.'
    );
    insights.products.push(
      'CPF EcoCare Feed – reduces organic waste impact.'
    );
    confidenceScore++;
  }

  // Oxygen
  if (m.oxygen !== '--' && m.oxygen < 5) {
    insights.keyConcern =
      insights.keyConcern ||
      'Low dissolved oxygen may limit shrimp respiration efficiency.';
    insights.diseases.push(
      `Dissolved oxygen at ${m.oxygen} mg/L can cause respiratory stress.`
    );
    insights.actions.push(
      'Increase aeration immediately, especially at night.'
    );
    insights.products.push(
      'CPF OxygenBoost Additive – supports oxygen utilization.'
    );
    confidenceScore++;
  }

  // pH
  if (m.ph !== '--' && (m.ph < 7.5 || m.ph > 8.2)) {
    insights.diseases.push(
      `pH imbalance (${m.ph}) may interfere with molting efficiency.`
    );
    insights.actions.push(
      'Correct pH gradually through controlled water exchange.'
    );
    confidenceScore++;
  }

  /* ---------------- FALLBACK (ALWAYS RECOMMEND PRODUCT) ---------------- */

  if (!insights.keyConcern) {
    insights.keyConcern =
      'Water quality parameters are stable and suitable for healthy growth.';
    insights.microorganism.push(
      'Balanced conditions support efficient nutrient cycling and microbial stability.'
    );
    insights.actions.push(
      'Continue routine monitoring and maintain feeding schedule.'
    );
  }

  // 🔒 GUARANTEE at least one product
  if (insights.products.length === 0) {
    insights.products.push(
      'CPF GrowthPlus Feed – optimized for daily growth under stable conditions.'
    );
  }

  const confidenceLabel =
    confidenceScore >= 3 ? 'High Confidence' :
    confidenceScore === 2 ? 'Moderate Confidence' :
    'Low Confidence';

  /* =========================================================
     UI
  ========================================================= */

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>{pond.name}</Text>
      <Text style={styles.subTitle}>
        {pond.breed} • {pond.location}
      </Text>

      {/* HEALTH CARD */}
      <View style={styles.card}>
        <View style={styles.healthRow}>
          <View>
            <Text style={styles.healthLabel}>Health Score</Text>
            <Text style={[styles.healthScore, { color: healthColor }]}>
              {pond.healthScore ?? '--'}
            </Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: healthColor + '22' }]}>
            <Text style={[styles.statusText, { color: healthColor }]}>
              {pond.healthStatus || 'Initializing'}
            </Text>
          </View>
        </View>
        <Text style={styles.caption}>
          Health score is calculated by backend analytics using water quality parameters.
        </Text>
      </View>

      {/* KEY CONCERN */}
      <View style={styles.keyConcernCard}>
        <Text style={styles.keyConcernTitle}>Primary Concern</Text>
        <Text style={styles.keyConcernText}>{insights.keyConcern}</Text>
        <Text style={styles.confidence}>Confidence: {confidenceLabel}</Text>
      </View>

      {/* METRICS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current Water Metrics</Text>
        <View style={styles.metricGrid}>
          <Metric label="pH" value={m.ph} unit="" color={statusColor('ph', m.ph)} />
          <Metric label="Oxygen" value={m.oxygen} unit="mg/L" color={statusColor('oxygen', m.oxygen)} />
          <Metric label="Temperature" value={m.temperature} unit="°C" color={statusColor('temperature', m.temperature)} />
          <Metric label="Ammonia" value={m.ammonia} unit="ppm" color={statusColor('ammonia', m.ammonia)} />
        </View>
      </View>

      <InsightCard title="Microbiological Interpretation" items={insights.microorganism} />
      <InsightCard title="Potential Health Implications" items={insights.diseases} />
      <InsightCard title="Recommended Management Actions" items={insights.actions} />
      <InsightCard title="Recommended CPF Products" items={insights.products} />
    </ScrollView>
  );
}

/* =========================================================
   SUB COMPONENTS
========================================================= */

function Metric({ label, value, unit, color }) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color }]}>
        {value} <Text style={styles.metricUnit}>{unit}</Text>
      </Text>
    </View>
  );
}

function InsightCard({ title, items }) {
  if (!items.length) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.slice(0, 3).map((t, i) => (
        <Text key={i} style={styles.bullet}>• {t}</Text>
      ))}
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 16 },
  title: { color: '#f9fafb', fontSize: 22, fontWeight: '800' },
  subTitle: { color: '#9ca3af', marginBottom: 16 },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#020617',
  },

  healthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  healthLabel: { color: '#94a3b8', fontSize: 12 },
  healthScore: { fontSize: 32, fontWeight: '800' },
  statusPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  statusText: { fontWeight: '700' },
  caption: { color: '#94a3b8', fontSize: 12, marginTop: 6 },

  keyConcernCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#020617',
  },
  keyConcernTitle: { color: '#facc15', fontWeight: '700', marginBottom: 4 },
  keyConcernText: { color: '#e5e7eb', fontSize: 14 },
  confidence: { color: '#94a3b8', fontSize: 11, marginTop: 6 },

  sectionTitle: { color: '#f8fafc', fontSize: 16, fontWeight: '700', marginBottom: 12 },

  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricBox: { width: '48%' },
  metricLabel: { color: '#94a3b8', fontSize: 12 },
  metricValue: { fontSize: 20, fontWeight: '700' },
  metricUnit: { fontSize: 12, color: '#94a3b8' },

  bullet: { color: '#e5e7eb', marginBottom: 6 },
});
