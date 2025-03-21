import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WelcomeScreen } from '@/src/features/welcome/WelcomeScreen';
import { colors } from '@/src/ui/theme';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WelcomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
}); 