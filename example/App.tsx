import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  getDeviceInfo,
  setPlaybackHandlers,
} from '@missingcore/music-glyph-toys';

const onPlayPause = () => {
  console.log('Play/Pause callback function called.');
};

const onSkip = () => {
  console.log('Skip callback function called.');
};

export default function App() {
  const [result, setResult] = useState<Record<string, string>>({});

  useEffect(() => {
    getDeviceInfo().then(setResult);
    setPlaybackHandlers({ onPlayPause, onSkip });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Model: {result.model}</Text>
      <Text>Manufacturer: {result.manufacturer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
