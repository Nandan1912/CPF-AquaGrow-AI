import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecommendedProductCard({ navigation }) {
  const handlePress = () => {
    navigation.navigate('Market', { tab: 'feed' });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recommended Feed</Text>
      <Text style={styles.subtitle}>
        Based on current pond conditions and biomass.
      </Text>

      <View style={styles.productRow}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1604909053195-56c5c6b3c5b3',
          }}
          style={styles.image}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>CPF GrowFast HD 35%</Text>
          <Text style={styles.productInfo}>
            High-density grower feed to improve FCR and growth consistency.
          </Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.priceHint}>Available via CPF dealers</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePress}
          activeOpacity={0.85}
        >
          <Text style={styles.actionButtonText}>View in Market</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#020617',
    padding: 14,
    marginBottom: 24,
  },
  title: {
    color: '#f9fafb',
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#020617',
  },
  productName: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '700',
  },
  productInfo: {
    color: '#9ca3af',
    fontSize: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceHint: {
    flex: 1,
    color: '#6b7280',
    fontSize: 11,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },
  actionButtonText: {
    color: '#022c22',
    fontSize: 11,
    fontWeight: '700',
  },
});
