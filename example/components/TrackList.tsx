import { FlatList, StyleSheet } from 'react-native';

import { useDataStore } from 'example/services/DataStore';

import { Track } from './Track';

export function TrackList() {
  const tracks = useDataStore((s) => s.tracks);

  return (
    <FlatList
      data={tracks}
      keyExtractor={(_, idx) => `${idx}`}
      renderItem={({ item }) => <Track {...item} />}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
});
