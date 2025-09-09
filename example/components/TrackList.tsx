import { FlatList, StyleSheet } from 'react-native';

import { useDataStore } from '../services/DataStore';
import { MusicControls } from '../services/MusicControls';

import { Track } from './Track';

export function TrackList() {
  const tracks = useDataStore((s) => s.tracks);
  return (
    <FlatList
      data={tracks}
      keyExtractor={(_, idx) => `${idx}`}
      renderItem={({ item }) => (
        <Track {...item} onPlay={() => MusicControls.skipTo(item)} />
      )}
      style={styles.wrapperContainer}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
  },
  container: {
    gap: 4,
  },
});
