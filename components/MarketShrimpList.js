import { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

/* ------------------ DATA ------------------ */

const SHRIMP_DATA = [
  {
    id: '1',
    size: '30 Count',
    location: 'Nellore',
    grade: 'Export',
    price: 420,
    trend: 'up',
    insight: 'Export demand improving',
    monthly: [380, 390, 395, 405, 412, 420],
  },
  {
    id: '2',
    size: '40 Count',
    location: 'Ongole',
    grade: 'Export',
    price: 395,
    trend: 'down',
    insight: 'High supply pressure',
    monthly: [420, 415, 410, 405, 400, 395],
  },
  {
    id: '3',
    size: '50 Count',
    location: 'Bhimavaram',
    grade: 'Domestic',
    price: 360,
    trend: 'up',
    insight: 'Seasonal demand support',
    monthly: [330, 335, 340, 350, 355, 360],
  },
  {
    id: '4',
    size: '60 Count',
    location: 'Chennai',
    grade: 'Domestic',
    price: 335,
    trend: 'stable',
    insight: 'Balanced market',
    monthly: [332, 334, 335, 335, 336, 335],
  },
];

/* ------------------ BACKGROUND GRAPH ------------------ */

function BackgroundGraph({ data, trend }) {
  const width = 260;
  const height = 90;
  const padding = 6;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const color =
    trend === 'up'
      ? '#22c55e'
      : trend === 'down'
      ? '#f97316'
      : '#9ca3af';

  const points = data
    .map((v, i) => {
      const x =
        padding +
        (i / (data.length - 1)) * (width - padding * 2);
      const y =
        padding +
        ((max - v) / (max - min || 1)) *
          (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={styles.graphBackground}>
      <Svg width={width} height={height}>
        <Polyline
          points={points}
          fill="none"
          stroke={color + '55'}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
}

/* ------------------ COMPONENT ------------------ */

export default function MarketShrimpList() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return SHRIMP_DATA;
    const q = query.toLowerCase();
    return SHRIMP_DATA.filter(
      (i) =>
        i.size.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.grade.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by size or location"
        placeholderTextColor="#6b7280"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Background graph */}
            <BackgroundGraph
              data={item.monthly}
              trend={item.trend}
            />

            {/* Foreground content */}
            <View style={styles.cardContent}>
              <View style={styles.topRow}>
                <View>
                  <Text style={styles.size}>{item.size}</Text>
                  <Text style={styles.meta}>
                    {item.location} • {item.grade}
                  </Text>
                </View>

                <Text style={styles.price}>
                  ₹{item.price}
                  <Text style={styles.unit}> / kg</Text>
                </Text>
              </View>

              <Text
                style={[
                  styles.trend,
                  item.trend === 'up'
                    ? styles.up
                    : item.trend === 'down'
                    ? styles.down
                    : styles.stable,
                ]}
              >
                {item.trend === 'up'
                  ? '▲'
                  : item.trend === 'down'
                  ? '▼'
                  : '●'}
              </Text>

              <Text style={styles.insight}>
                {item.insight}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  search: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 999,
    padding: 10,
    color: '#f9fafb',
    fontSize: 13,
    margin: 16,
  },

  card: {
    position: 'relative',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#020617',
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: 'hidden',
  },

  graphBackground: {
    position: 'absolute',
    right: -20,
    top: 10,
    opacity: 0.35,
  },

  cardContent: {
    padding: 16,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  size: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '700',
  },

  meta: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },

  price: {
    color: '#22c55e',
    fontSize: 20,
    fontWeight: '800',
  },

  unit: {
    fontSize: 11,
    color: '#6b7280',
  },

  trend: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '800',
  },

  up: { color: '#22c55e' },
  down: { color: '#f97316' },
  stable: { color: '#9ca3af' },

  insight: {
    marginTop: 6,
    fontSize: 12,
    color: '#9ca3af',
  },
});
