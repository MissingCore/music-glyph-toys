import {
  getDeviceInfo,
  isDeviceSupported,
  setPlaybackHandlers,
} from '@missingcore/music-glyph-toys';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useSetup } from './hooks/useSetup';

import { Text } from './components/UI';

const onPlayPause = () => {
  console.log('Play/Pause callback function called.');
};

const onSkip = () => {
  console.log('Skip callback function called.');
};

export default function RootLayer() {
  return (
    <SafeAreaProvider>
      <Container>
        <App />
      </Container>
    </SafeAreaProvider>
  );
}

function App() {
  const setUpCompleted = useSetup();
  const [result, setResult] = useState<Record<string, string>>({});

  useEffect(() => {
    getDeviceInfo().then(setResult);
    setPlaybackHandlers({ onPlayPause, onSkip });
  }, []);

  if (!setUpCompleted) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.centerContainer}>
      <Text>Model: {result.model}</Text>
      <Text>Manufacturer: {result.manufacturer}</Text>
      <Text>Device Supports Glyph Toys: {String(isDeviceSupported)}</Text>
    </View>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 64 }]}>
      <StatusBar style="dark" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
