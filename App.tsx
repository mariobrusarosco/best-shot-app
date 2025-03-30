import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/src/features/welcome/WelcomeScreen';
import { ProfileScreen } from '@/src/features/profile/ProfileScreen';
import { SettingsScreen } from '@/src/features/settings/SettingsScreen';
import { colors } from '@/src/ui/theme';
import { Ionicons } from '@expo/vector-icons';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home stack navigator
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Profile stack navigator
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
      />
    </Stack.Navigator>
  );
};

// Main tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ 
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack} 
        options={{ 
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
