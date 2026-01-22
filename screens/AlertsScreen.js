import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState([]);

  // DEMO ALERT GENERATION (SAFE, DETERMINISTIC)
  const generateDemoAlerts = () => {
    return [
      {
        id: '1',
        title: 'Ammonia slightly elevated',
        description:
          'Ammonia levels are above optimal range. Consider partial water exchange.',
        time: new Date().toISOString(),
        type: 'warning',
      },
      {
        id: '2',
        title: 'Low oxygen during night hours',
        description:
          'Dissolved oxygen may drop at night. Increase aeration as a precaution.',
        time: new Date(Date.now() - 3600 * 1000).toISOString(),
        type: 'info',
      },
    ];
  };

  useFocusEffect(
    useCallback(() => {
      // Always succeeds
      setAlerts(generateDemoAlerts());
    }, [])
  );

  return (
    <FlatList
      data={alerts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View
          style={[
            styles.card,
            item.type === 'warning' ? styles.warning : styles.info,
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.time}>
            {new Date(item.time).toLocaleString()}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>
          No alerts. All ponds are operating normally.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#020617',
    flexGrow: 1,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  warning: {
    borderColor: '#b91c1c',
    backgroundColor: 'rgba(248,113,113,0.08)',
  },
  info: {
    borderColor: '#0ea5e9',
    backgroundColor: 'rgba(56,189,248,0.08)',
  },
  title: {
    color: '#f9fafb',
    fontWeight: '700',
    fontSize: 14,
  },
  desc: {
    color: '#9ca3af',
    marginVertical: 4,
    fontSize: 13,
  },
  time: {
    color: '#6b7280',
    fontSize: 11,
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
  },
});
