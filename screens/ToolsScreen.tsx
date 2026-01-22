import React, { useState } from 'react';
import {
  FlatList,
  KeyboardTypeOptions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ToolTab = 'cost' | 'feed' | 'journal';

/* ---------------- TAB BUTTON ---------------- */

function ToolTabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.tabPill,
        active && styles.tabPillActive,
      ]}
    >
      <Text
        style={[
          styles.tabPillText,
          active && styles.tabPillTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ---------------- INPUT HELPERS ---------------- */

function ToolInput({
  label,
  ...props
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}) {
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#6b7280"
      />
    </View>
  );
}

function ResultRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text
        style={[
          styles.resultValue,
          highlight && styles.resultValueHighlight,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* ---------------- COST TOOL ---------------- */

function CostCalculator() {
  const [prod, setProd] = useState('');
  const [price, setPrice] = useState('');
  const [seed, setSeed] = useState('');
  const [feed, setFeed] = useState('');
  const [other, setOther] = useState('');
  const [res, setRes] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(prod) || 0;
    const pr = parseFloat(price) || 0;
    const s = parseFloat(seed) || 0;
    const f = parseFloat(feed) || 0;
    const o = parseFloat(other) || 0;

    const revenue = p * pr;
    const cost = s + f + o;
    const profit = revenue - cost;

    setRes({
      revenue,
      cost,
      profit,
      margin: revenue ? (profit / revenue) * 100 : 0,
    });
  };

  return (
    <ScrollView style={styles.toolContainer}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Cost Calculator</Text>
        <Text style={styles.sectionHint}>
          Estimate profit for one crop cycle.
        </Text>

        <ToolInput label="Production (kg)" value={prod} onChangeText={setProd} keyboardType="numeric" />
        <ToolInput label="Price (₹ / kg)" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <ToolInput label="Seed cost (₹)" value={seed} onChangeText={setSeed} keyboardType="numeric" />
        <ToolInput label="Feed cost (₹)" value={feed} onChangeText={setFeed} keyboardType="numeric" />
        <ToolInput label="Other costs (₹)" value={other} onChangeText={setOther} keyboardType="numeric" />

        <TouchableOpacity style={styles.primaryButton} onPress={calculate}>
          <Text style={styles.primaryButtonText}>Calculate</Text>
        </TouchableOpacity>

        {res && (
          <View style={styles.resultCard}>
            <ResultRow label="Revenue" value={`₹${res.revenue.toFixed(0)}`} />
            <ResultRow label="Total Cost" value={`₹${res.cost.toFixed(0)}`} />
            <ResultRow
              label="Profit"
              value={`₹${res.profit.toFixed(0)}`}
              highlight
            />
            <ResultRow
              label="Margin"
              value={`${res.margin.toFixed(1)}%`}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

/* ---------------- FEED TOOL ---------------- */

function FeedPlanner() {
  const [bw, setBw] = useState('');
  const [count, setCount] = useState('');
  const [rate, setRate] = useState('3');
  const [daily, setDaily] = useState<number | null>(null);

  const calc = () => {
    const b = parseFloat(bw) || 0;
    const c = parseInt(count || '0', 10);
    const r = parseFloat(rate) || 0;
    setDaily((b / 1000) * c * (r / 100));
  };

  return (
    <ScrollView style={styles.toolContainer}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Feed Planner</Text>
        <Text style={styles.sectionHint}>
          Calculate daily feed based on biomass.
        </Text>

        <ToolInput label="Avg body weight (g)" value={bw} onChangeText={setBw} keyboardType="numeric" />
        <ToolInput label="Shrimp count" value={count} onChangeText={setCount} keyboardType="numeric" />
        <ToolInput label="Feeding rate (%)" value={rate} onChangeText={setRate} keyboardType="numeric" />

        <TouchableOpacity style={styles.primaryButton} onPress={calc}>
          <Text style={styles.primaryButtonText}>Calculate</Text>
        </TouchableOpacity>

        {daily !== null && (
          <View style={styles.resultCard}>
            <ResultRow
              label="Daily feed required"
              value={`${daily.toFixed(1)} kg`}
              highlight
            />
            <Text style={styles.microHint}>
              Split into multiple meals and adjust using feed trays.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

/* ---------------- JOURNAL ---------------- */

function DigitalJournal() {
  const [entries, setEntries] = useState<any[]>([]);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setEntries([
      { id: Date.now().toString(), text },
      ...entries,
    ]);
    setText('');
  };

  return (
    <ScrollView style={styles.toolContainer}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Digital Journal</Text>
        <Text style={styles.sectionHint}>
          Maintain daily pond notes.
        </Text>

        <TextInput
          style={styles.journalInput}
          placeholder="Write today's note..."
          placeholderTextColor="#6b7280"
          value={text}
          onChangeText={setText}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.primaryButton,
            !text.trim() && styles.primaryButtonDisabled,
          ]}
          onPress={add}
          disabled={!text.trim()}
        >
          <Text style={styles.primaryButtonText}>Save Entry</Text>
        </TouchableOpacity>

        <FlatList
          data={entries}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.journalCard}>
              <Text style={styles.journalText}>{item.text}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

/* ---------------- MAIN ---------------- */

export default function ToolsScreen() {
  const [tab, setTab] = useState<ToolTab>('cost');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Tools</Text>
        <Text style={styles.subtitle}>
          Cost, feed and daily farm utilities
        </Text>
      </View>

      <View style={styles.tabRow}>
        <ToolTabButton label="Cost" active={tab === 'cost'} onPress={() => setTab('cost')} />
        <ToolTabButton label="Feed" active={tab === 'feed'} onPress={() => setTab('feed')} />
        <ToolTabButton label="Journal" active={tab === 'journal'} onPress={() => setTab('journal')} />
      </View>

      {tab === 'cost' && <CostCalculator />}
      {tab === 'feed' && <FeedPlanner />}
      {tab === 'journal' && <DigitalJournal />}
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },

  header: { padding: 16 },
  title: { color: '#f9fafb', fontSize: 22, fontWeight: '800' },
  subtitle: { color: '#9ca3af', fontSize: 12, marginTop: 2 },

  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tabPill: {
    flex: 1,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f2937',
    alignItems: 'center',
  },
  tabPillActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  tabPillText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '700',
  },
  tabPillTextActive: {
    color: '#022c22',
  },

  toolContainer: { flex: 1, paddingHorizontal: 16 },

  sectionCard: {
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  sectionTitle: { color: '#e5e7eb', fontSize: 16, fontWeight: '700' },
  sectionHint: { color: '#9ca3af', fontSize: 12, marginBottom: 8 },

  inputLabel: { color: '#d1d5db', fontSize: 13 },
  input: {
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    padding: 10,
    color: '#f9fafb',
  },

  primaryButton: {
    marginTop: 14,
    borderRadius: 999,
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    alignItems: 'center',
  },
  primaryButtonDisabled: { backgroundColor: '#16a34a55' },
  primaryButtonText: {
    color: '#022c22',
    fontWeight: '700',
    fontSize: 14,
  },

  resultCard: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resultLabel: { color: '#9ca3af', fontSize: 12 },
  resultValue: { color: '#e5e7eb', fontSize: 14, fontWeight: '600' },
  resultValueHighlight: { color: '#22c55e' },
  microHint: { color: '#6b7280', fontSize: 11, marginTop: 6 },

  journalInput: {
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    padding: 10,
    color: '#f9fafb',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  journalCard: {
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
  },
  journalText: { color: '#e5e7eb', fontSize: 13 },
});
