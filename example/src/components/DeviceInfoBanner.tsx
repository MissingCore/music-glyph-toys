import { DeviceInfo, GlyphButton } from '@missingcore/music-glyph-toys';
import { StyleSheet, View } from 'react-native';

import { Text } from './UI';

export function DeviceInfoBanner() {
  return (
    <View style={styles.container}>
      <Text>Model: {DeviceInfo.model}</Text>
      <Text>Manufacturer: {DeviceInfo.manufacturer}</Text>
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
