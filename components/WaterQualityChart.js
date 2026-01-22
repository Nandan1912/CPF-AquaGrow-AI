import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

export default function WaterQualityChart() {
  const safeMin = 7.5;
  const safeMax = 8.2;

  const labels = ['D1','D2','D3','D4','D5','D6','D7'];

  const data = {
    labels,
    datasets: [
      {
        data: Array(7).fill(safeMax),
        withDots: false,
        color: () => 'rgba(74,222,128,0.12)',
      },
      {
        data: Array(7).fill(safeMin),
        withDots: false,
        color: () => 'rgba(74,222,128,0.12)',
      },
      {
        data: [7.5,7.6,7.4,7.7,7.8,7.6,7.5],
        strokeWidth: 2,
        color: () => '#00D1FF',
      },
    ],
  };

const chartConfig = {
  backgroundGradientFrom: '#020617',
  backgroundGradientTo: '#020617',
  decimalPlaces: 1,

  // 🔴 REQUIRED — must be a function
  color: (opacity = 1) => `rgba(0, 209, 255, ${opacity})`,

  labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,

  propsForDots: {
    r: '4',
  },

  propsForBackgroundLines: {
    strokeDasharray: '',
    strokeWidth: 0.3,
    stroke: 'rgba(255,255,255,0.1)',
  },
};


  return (
    <View style={styles.card}>
      <Text style={styles.title}>7-day pH Trend</Text>

      <LineChart
        data={data}
        width={screenWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        withVerticalLines={false}
        withHorizontalLines
        style={styles.chart}
      />
    </View>
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
  title: { color: '#f9fafb', fontWeight: '700', marginBottom: 8 },
  chart: { borderRadius: 16 },
});
