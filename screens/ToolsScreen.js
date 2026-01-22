// screens/ToolsScreen.js
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// TODO: later connect each tool button to proper feature routes or web APIs

export default function ToolsScreen() {
  const ToolButton = ({ label, description }) => (
    <TouchableOpacity style={styles.toolButton} activeOpacity={0.8}>
      <View style={styles.toolBadge}>
        <Text style={styles.toolBadgeText}>Tool</Text>
      </View>
      <Text style={styles.toolLabel}>{label}</Text>
      <Text style={styles.toolDescription}>{description}</Text>
      <Text style={styles.toolComingSoon}>Coming soon</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Smart Tools</Text>
        <Text style={styles.subtitle}>
          Plan your costs, feed and daily farm logs in one place.
        </Text>

        <ToolButton
          label="Cost Calculator"
          description="Estimate total crop cost and profit for each pond."
        />
        <ToolButton
          label="Feed Planner"
          description="Auto-generate feeding schedules based on biomass."
        />
        <ToolButton
          label="Digital Journal"
          description="Record daily pond notes, treatments and events."
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    color: '#f9fafb',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 16,
  },
  toolButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#020617',
    padding: 16,
    marginBottom: 12,
  },
  toolBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#0f172a',
    marginBottom: 8,
  },
  toolBadgeText: {
    color: '#06b6d4',
    fontSize: 11,
    fontWeight: '600',
  },
  toolLabel: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  toolDescription: {
    color: '#9ca3af',
    fontSize: 13,
  },
  toolComingSoon: {
    marginTop: 8,
    color: '#22c55e',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
