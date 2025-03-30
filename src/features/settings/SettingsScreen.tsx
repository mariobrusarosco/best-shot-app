import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import { colors, spacing, typography } from '@/src/ui/theme';

export const SettingsScreen = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#d1d1d1', true: colors.primary }}
          thumbColor={Platform.OS === 'android' ? colors.primary : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#d1d1d1', true: colors.primary }}
          thumbColor={Platform.OS === 'android' ? colors.primary : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>
          App Version: 1.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  settingLabel: {
    ...typography.body,
    color: colors.text,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  version: {
    ...typography.subheading,
    color: colors.textSecondary,
  },
}); 