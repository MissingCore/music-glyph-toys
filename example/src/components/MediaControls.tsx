import Ionicons from '@expo/vector-icons/Ionicons';
import {
  GlyphButtonEvent,
  MatrixAction,
  triggerEvent,
} from '@missingcore/music-glyph-toys';
import { Pressable, StyleSheet, View } from 'react-native';

import { MusicControls } from '../services/MusicControls';
import { useIsPlaying } from '../hooks/useIsPlaying';

export function MediaControls() {
  const isPlaying = useIsPlaying();
  return (
    <View style={styles.container}>
      <IconButton name="play-skip-back" onPress={() => MusicControls.prev()} />
      <IconButton
        name={isPlaying ? 'pause' : 'play'}
        onPress={() =>
          triggerEvent(
            GlyphButtonEvent.TOUCH_UP,
            'media-controls',
            MatrixAction.PLAY_PAUSE
          )
        }
      />
      <IconButton
        name="play-skip-forward"
        onPress={() =>
          triggerEvent(
            GlyphButtonEvent.TOUCH_UP,
            'media-controls',
            MatrixAction.SKIP
          )
        }
      />
    </View>
  );
}

function IconButton(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Ionicons name={props.name} size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  button: {
    padding: 12,
    borderRadius: 9999,
  },
  buttonPressed: {
    backgroundColor: '#CCCCCC40',
  },
});
