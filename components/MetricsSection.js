import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { API_URL } from '../config/api';

export default function MetricsSection() {
  const [priorityPonds, setPriorityPonds] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPriorityPonds();
    }, [])
  );

  const fetchPriorityPonds = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/ponds`);
      setPriorityPonds(res.data.filter(p => p.isHighPriority));
    } catch {}
  };

  if (priorityPonds.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Today’s Pond Snapshot</Text>
        <Text style={styles.empty}>No high-priority ponds selected</Text>
      </View>
    );
  }

  return (
    <>
      {priorityPonds.map(pond => (
        <View key={pond.id} style={styles.card}>
          <Text style={styles.title}>{pond.name} — Snapshot</Text>

          <View style={styles.grid}>
            <Gauge label="pH" value={pond.metrics.ph} min={6.5} max={9} />
            <Gauge label="Oxygen" value={pond.metrics.oxygen} min={2} max={8} criticalBelow={4} />
            <Gauge label="Temp" value={pond.metrics.temperature} min={20} max={35} unit="°C" />
            <Gauge label="Ammonia" value={pond.metrics.ammonia} min={0} max={1} />
          </View>
        </View>
      ))}
    </>
  );
}

/* =========================
   GAUGE LOGIC
========================= */

function getGaugeColor(label, value) {
  if (label === 'pH') {
    if (value < 7.5 || value > 8.2) return '#FACC15';
    return '#4ADE80';
  }

  if (label === 'Oxygen') {
    if (value < 4) return '#F87171';
    if (value < 5.5) return '#FACC15';
    return '#4ADE80';
  }

  if (label === 'Temp') {
    if (value < 26 || value > 32) return '#FACC15';
    return '#4ADE80';
  }

  if (label === 'Ammonia') {
    if (value > 0.5) return '#F87171';
    if (value > 0.3) return '#FACC15';
    return '#4ADE80';
  }

  return '#4ADE80';
}

/* =========================
   FULL CIRCLE GAUGE
========================= */

function Gauge({ label, value, min, max, unit = '', criticalBelow }) {
  const size = 90;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const offset = circumference * (1 - pct);

  const color = getGaugeColor(label, value);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (criticalBelow && value < criticalBelow) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [value, criticalBelow, pulse]);

  return (
    <View style={styles.gaugeBox}>
      <Animated.View style={{ opacity: pulse }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1f2937"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </Animated.View>

      <View style={styles.centerText}>
        <Text style={styles.value}>
          {value}
          <Text style={styles.unit}> {unit}</Text>
        </Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#020617',
    padding: 14,
    marginBottom: 14,
  },
  title: {
    color: '#f9fafb',
    fontWeight: '700',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gaugeBox: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 14,
  },
  centerText: {
    position: 'absolute',
    top: 32,
    alignItems: 'center',
  },
  value: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '700',
  },
  unit: {
    fontSize: 11,
    color: '#9ca3af',
  },
  label: {
    color: '#9ca3af',
    fontSize: 11,
  },
  empty: {
    color: '#6b7280',
    fontSize: 12,
  },
});
