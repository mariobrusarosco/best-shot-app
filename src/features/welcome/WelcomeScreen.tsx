import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors, spacing, typography } from '@/src/ui/theme';

export const WelcomeScreen = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Best Shot</Text>
        <Text style={styles.subtitle}>
          Running on: {Platform.OS === 'web' ? 'Web' : Platform.OS}
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          This is a cross-platform app built with Expo that works on Web, iOS, and Android!
        </Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Button pressed: {count} times</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.buttonText}>Press Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.select({
      ios: spacing.lg,
      android: spacing.md,
      web: spacing.xl,
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl + spacing.lg,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.subheading,
    color: colors.textSecondary,
  },
  content: {
    width: Platform.OS === 'web' ? '80%' : '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  counterContainer: {
    alignItems: 'center', 
  },
  counterText: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: Platform.select({
      ios: '#007AFF',
      android: colors.secondary,
      web: colors.primary,
    }),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - spacing.xs,
    borderRadius: spacing.sm,
  },
  buttonText: {
    ...typography.button,
    color: 'white',
  },
}); 