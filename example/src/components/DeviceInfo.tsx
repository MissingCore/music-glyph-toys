import { GlyphButton, getDeviceInfo } from '@missingcore/music-glyph-toys';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from './UI';

export function DeviceInfo() {
  const [result, setResult] = useState<Record<string, string>>({});

  useEffect(() => {
    getDeviceInfo().then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Model: {result.model}</Text>
      <Text>Manufacturer: {result.manufacturer}</Text>
      <Text>Device Supports Glyph Toys: {String(GlyphButton.isSupported)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
