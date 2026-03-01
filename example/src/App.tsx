import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useSetup } from './hooks/useSetup';

import { BackgroundPlaybackToggle } from './components/BackgroundPlaybackToggle';
import { DeviceInfoBanner } from './components/DeviceInfoBanner';
import { MediaControls } from './components/MediaControls';
import { TrackList } from './components/TrackList';

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

  if (!setUpCompleted) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <DeviceInfoBanner />
      <TrackList />
      <MediaControls />
      <BackgroundPlaybackToggle />
    </>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 32 }]}>
      <StatusBar style="dark" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
