import { setUpToy } from '@missingcore/music-glyph-toys';
import { usePermissions } from 'expo-media-library';
import { useEffect, useState } from 'react';

import { dataStore, useDataStore } from '../services/DataStore';
import { getSampleData } from '../data/getSampleData';

import { createImageDirectory } from '../utils/file-system';
import { setupPlayer } from '../utils/react-native-track-player';

export function useSetup() {
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ['audio'],
  });

  const dataStoreHydrated = useDataStore((s) => s._hasHydrated);
  const [completedSetUp, setCompletedSetUp] = useState(false);

  useEffect(() => {
    async function checkPermissions() {
      if (permissionResponse?.status !== 'granted') {
        const { canAskAgain, status } = await requestPermission();
        if (canAskAgain || status === 'denied') return;
      } else {
        setUpToy();
        await setupPlayer();

        // Start getting data after we have media library permissions.
        await dataStore.persist.rehydrate();
        createImageDirectory();

        const hasTracks = dataStore.getState().tracks;
        if (hasTracks.length === 0) {
          const newTracks = await getSampleData();
          dataStore.setState({ tracks: newTracks });
        }

        setCompletedSetUp(true);
      }
    }
    checkPermissions();
  }, [permissionResponse?.status, requestPermission]);

  return dataStoreHydrated && completedSetUp;
}
