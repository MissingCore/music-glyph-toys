import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { getDeviceInfo } from '@missingcore/music-glyph-toys';

export default function App() {
  const [result, setResult] = useState<Record<string, string>>({});

  useEffect(() => {
    getDeviceInfo().then(setResult);
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
