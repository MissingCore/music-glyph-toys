import type { Track } from 'react-native-audio-browser';
import { Image } from 'expo-image';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';

import { Text } from './UI';

export function Track(props: Track & { onPlay: () => void }) {
  return (
    <Pressable
      onPress={props.onPlay}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      <Image source={props.artwork} style={styles.image} />
      <View style={styles.stack}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title ?? 'No Title'}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {props.artist ?? '—'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    maxWidth: Dimensions.get('screen').width - 32,
    paddingRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
  },
  containerPressed: {
    backgroundColor: '#CCCCCC40',
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
