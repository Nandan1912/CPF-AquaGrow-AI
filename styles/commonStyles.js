// styles/commonStyles.js

import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const commonStyles = StyleSheet.create({
  /* =========================
     GLASS CARD
  ========================= */
  glassCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },

  /* =========================
     METRIC VALUE (MONO)
  ========================= */
  metricValue: {
    fontFamily: 'RobotoMono-Regular', // falls back safely if not available
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },

  metricLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
});

