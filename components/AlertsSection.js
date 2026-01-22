import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AlertsSection() {
  const navigation = useNavigation();

  // Demo latest alert (later can be fetched from backend)
  const latest = {
    type: 'warning',
    title: 'Ammonia slightly elevated in Pond 2',
    detail: 'Consider partial water exchange within 6 hours.',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Alerts')}
      style={styles.card}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>Latest Alert</Text>
        <Text style={styles.badge}>View All</Text>
      </View>

      <View
        style={[
          styles.alertBox,
          latest.type === 'warning' ? styles.alertWarning : styles.alertInfo,
        ]}
      >
        <Text style={styles.alertTitle}>{latest.title}</Text>
        <Text style={styles.alertDetail}>{latest.detail}</Text>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#020617',
    padding: 14,
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  title: {
    color: '#f9fafb',
    fontSize: 14,
    fontWeight: '700',
  },
  badge: {
    color: '#06b6d4',
    fontSize: 11,
    fontWeight: '600',
  },
  alertBox: {
    borderRadius: 12,
    padding: 10,
    marginTop: 4,
  },
  alertWarning: {
    backgroundColor: 'rgba(248,113,113,0.1)',
    borderWidth: 1,
    borderColor: '#b91c1c',
  },
  alertInfo: {
    backgroundColor: 'rgba(56,189,248,0.1)',
    borderWidth: 1,
    borderColor: '#0ea5e9',
  },
  alertTitle: {
    color: '#e5e7eb',
    fontSize: 13,
    fontWeight: '600',
  },
  alertDetail: {
    color: '#9ca3af',
    fontSize: 12,
  },
  footerText: {
    marginTop: 8,
    color: '#6b7280',
    fontSize: 11,
  },
});
