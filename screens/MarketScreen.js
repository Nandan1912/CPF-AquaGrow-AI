import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MarketFeedList from '../components/MarketFeedList';
import MarketShrimpList from '../components/MarketShrimpList';

export default function MarketScreen({ route }) {
  const initialTab =
    route?.params?.tab === 'feed' ? 'feed' : 'shrimp';

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (route?.params?.tab) {
      setActiveTab(
        route.params.tab === 'feed' ? 'feed' : 'shrimp'
      );
    }
  }, [route?.params?.tab]);

  return (
    <View style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <Text style={styles.title}>Market</Text>

        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            Updated periodically
          </Text>
        </View>
      </View>

      {/* ---------- TABS ---------- */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          onPress={() => setActiveTab('shrimp')}
          style={styles.tabButton}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'shrimp' &&
                styles.tabTextActive,
            ]}
          >
            📈 Shrimp Market
          </Text>
          {activeTab === 'shrimp' && (
            <View style={styles.tabIndicator} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('feed')}
          style={styles.tabButton}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'feed' &&
                styles.tabTextActive,
            ]}
          >
            🏷 Feed Products
          </Text>
          {activeTab === 'feed' && (
            <View style={styles.tabIndicator} />
          )}
        </TouchableOpacity>
      </View>

      {/* ---------- DIVIDER ---------- */}
      <View style={styles.divider} />

      {/* ---------- CONTENT ---------- */}
      <View style={styles.content}>
        {activeTab === 'shrimp' ? (
          <MarketShrimpList />
        ) : (
          <MarketFeedList />
        )}
      </View>
    </View>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  /* Header */
  header: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
  },
  title: {
    color: '#f9fafb',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  statusText: {
    color: '#9ca3af',
    fontSize: 11,
  },

  /* Tabs */
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#f9fafb',
    fontWeight: '800',
  },
  tabIndicator: {
    marginTop: 6,
    height: 3,
    width: 36,
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },

  /* Divider */
  divider: {
    height: 1,
    backgroundColor: '#1f2937',
    marginHorizontal: 16,
    marginTop: 4,
  },

  /* Content */
  content: {
    flex: 1,
    marginTop: 6,
  },
});
