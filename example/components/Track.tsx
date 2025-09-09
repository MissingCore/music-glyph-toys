import type { AddTrack } from '@weights-ai/react-native-track-player';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet, View } from 'react-native';

import { Text } from './UI';

export function Track(props: AddTrack) {
  return (
    <View style={styles.container}>
      <Image source={props.artwork} style={styles.image} />
      <View style={styles.stack}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title ?? 'No Title'}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {props.artist ?? '—'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    maxWidth: Dimensions.get('screen').width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stack: {
    flexShrink: 1,
    flexGrow: 1,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 8,
    backgroundColor: '#cccccc',
  },
  title: {
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    opacity: 80,
  },
});
