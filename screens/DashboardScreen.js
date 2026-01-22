import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AlertsSection from '../components/AlertsSection';
import MetricsSection from '../components/MetricsSection';
import RecommendedProductCard from '../components/RecommendedProductCard';
import WaterQualityChart from '../components/WaterQualityChart';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <Text style={styles.title}>CPF AquaGrow AI</Text>
        <Text style={styles.subtitle}>Farm Operations Dashboard</Text>

        {/* Alerts */}
        <AlertsSection />

        {/* Pond Snapshot */}
        <MetricsSection />

        {/* Trends */}
        <WaterQualityChart />

        {/* Business */}
        <RecommendedProductCard navigation={navigation} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16 },
  title: { color: '#f9fafb', fontSize: 20, fontWeight: '800' },
  subtitle: { color: '#9ca3af', fontSize: 12, marginBottom: 12 },
});
