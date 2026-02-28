import { useCallback, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { setPlayerOptions } from '../utils/react-native-track-player';

export function BackgroundPlaybackToggle() {
  const [isEnabled, setIsEnabled] = useState(true);

  const onChange = useCallback((value: boolean) => {
    setPlayerOptions(value);
    setIsEnabled(value);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Continue Playback on Dismiss:</Text>
      <Switch
        value={isEnabled}
        onValueChange={onChange}
        thumbColor="#D71921"
        trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: 16,
  },
  text: {
    fontSize: 14,
  },
});
