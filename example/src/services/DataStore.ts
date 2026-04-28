import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Track } from 'react-native-audio-browser';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';

type DataStore = {
  _hasHydrated: boolean;
  _init: (state: DataStore) => void;

  tracks: Track[];
  activeTrack: Track | null;
};

const OMITTED_FIELDS = ['_hasHydrated', '_init'];

export const dataStore = createStore<DataStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        _hasHydrated: false,
        _init: () => {
          set({ _hasHydrated: true });
        },

        tracks: [],
        activeTrack: null,
      }),
      {
        name: 'example::data-store',
        storage: createJSONStorage(() => AsyncStorage),
        // Only store some fields in AsyncStorage.
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !OMITTED_FIELDS.includes(key)
            )
          ),
        // Listen to when the store is hydrated.
        onRehydrateStorage: () => {
          return (state, error) => {
            if (error) console.log('[User Preferences Store]', error);
            else state?._init(state);
          };
        },
        skipHydration: true,
      }
    )
  )
);

export const useDataStore = <T>(selector: (state: DataStore) => T): T =>
  useStore(dataStore, selector);
