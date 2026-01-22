import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FeedBagIcon from './FeedBagIcon';

/* =========================================================
   DEMO PRODUCT DATA (MARKET-ONLY)
   – No backend
   – No PondDetails dependency
========================================================= */

const PRODUCTS = [
  {
    id: 'cpf-premium-45',
    title: 'CPF Premium Shrimp Feed',
    protein: '45%',
    stage: 'Grower',
    description:
      'High-protein shrimp feed formulated for rapid biomass gain and improved FCR in intensive culture systems.',
    price: '₹95 / kg',
    recommended: true,
  },
  {
    id: 'cpf-balanced-38',
    title: 'CPF Balanced Shrimp Feed',
    protein: '38%',
    stage: 'Grower / Finisher',
    description:
      'Balanced nutrition feed for stable pond environments and consistent shrimp growth.',
    price: '₹92 / kg',
    recommended: true,
  },
  {
    id: 'cpf-ecocare-30',
    title: 'CPF EcoCare Feed',
    protein: '30%',
    stage: 'Stress / Recovery',
    description:
      'Low-pollution formulation designed to reduce organic waste and support pond recovery.',
    price: '₹90 / kg',
    recommended: false,
  },
  {
    id: 'cpf-starter-32',
    title: 'CPF Starter Shrimp Feed',
    protein: '32%',
    stage: 'Nursery',
    description:
      'Highly digestible starter feed to support early-stage shrimp growth and uniform development.',
    price: '₹105 / kg',
    recommended: false,
  },
];

export default function MarketFeedList() {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.stage.toLowerCase().includes(q) ||
        p.protein.toLowerCase().includes(q)
    );
  }, [query]);

  const renderProduct = ({ item }) => {
    const isRecommended = item.recommended;

    return (
      <View
        style={[
          styles.card,
          isRecommended && styles.recommendedCard,
        ]}
      >
        <FeedBagIcon
          size={68}
          color={isRecommended ? '#4ADE80' : '#00D1FF'}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.protein} • {item.stage}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.price}>{item.price}</Text>
            {isRecommended && (
              <Text style={styles.badge}>Recommended</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search feed by name, stage or protein"
        placeholderTextColor="#6b7280"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  searchInput: {
    margin: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    color: '#f9fafb',
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#020617',
  },

  recommendedCard: {
    borderColor: '#4ADE80',
    shadowColor: '#4ADE80',
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '700',
  },

  meta: {
    color: '#9ca3af',
    fontSize: 11,
    marginVertical: 4,
  },

  description: {
    color: '#d1d5db',
    fontSize: 12,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  price: {
    flex: 1,
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '700',
  },

  badge: {
    backgroundColor: '#4ADE80',
    color: '#020617',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
  },
});
