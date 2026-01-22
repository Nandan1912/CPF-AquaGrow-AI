import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { UserContext, defaultUser } from './UserContext';
import { theme } from './styles/theme';

// Screens
import AccountScreen from './screens/AccountScreen';
import AlertsScreen from './screens/AlertsScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import MarketScreen from './screens/MarketScreen';
import MyPondsScreen from './screens/MyPondsScreen';
import PondDetailsScreen from './screens/PondDetailsScreen';
import ToolsScreen from './screens/ToolsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* =========================
   NAV THEME (SYNCED)
========================= */
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    primary: theme.colors.primary,
    text: theme.colors.textPrimary,
    border: theme.colors.border,
  },
};

/* =========================
   STATUS BACKGROUND
========================= */
function StatusBackground({ alertActive, children }) {
  return (
    <LinearGradient
      colors={
        alertActive
          ? ['#0B0E14', '#2A0E14'] // subtle deep red tint
          : ['#0B0E14', '#0F172A'] // deep navy
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      {children}

      {/* Subtle glow overlay */}
      {alertActive && <View style={styles.alertGlow} />}
    </LinearGradient>
  );
}

/* =========================
   BOTTOM TABS
========================= */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.textPrimary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: '#0f172a',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName = 'ellipse';

          if (route.name === 'Dashboard')
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          else if (route.name === 'Ponds')
            iconName = focused ? 'water' : 'water-outline';
          else if (route.name === 'Market')
            iconName = focused ? 'pricetags' : 'pricetags-outline';
          else if (route.name === 'Tools')
            iconName = focused ? 'construct' : 'construct-outline';
          else if (route.name === 'Account')
            iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Ponds" component={MyPondsScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

/* =========================
   ROOT APP
========================= */
export default function App() {
  const [user, setUser] = useState(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔔 DEMO FLAG — later can come from alerts logic
  const globalAlertActive = false;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <StatusBackground alertActive={globalAlertActive}>
        <NavigationContainer theme={MyTheme}>
          <StatusBar barStyle="light-content" />

          <Stack.Navigator>
            {!isAuthenticated && (
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => (
                  <LoginScreen
                    {...props}
                    onLoginSuccess={() => {
                      setIsAuthenticated(true);
                      props.navigation.replace('MainTabs');
                    }}
                  />
                )}
              </Stack.Screen>
            )}

            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Alerts"
              component={AlertsScreen}
              options={{ title: 'Alerts & Notifications' }}
            />

            <Stack.Screen
              name="PondDetails"
              component={PondDetailsScreen}
              options={{ title: 'Pond Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StatusBackground>
    </UserContext.Provider>
  );
}

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  alertGlow: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(248,113,113,0.12)',
  },
});
