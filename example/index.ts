import { setUpToy } from '@missingcore/music-glyph-toys';
import TrackPlayer from '@weights-ai/react-native-track-player';
import { registerRootComponent } from 'expo';

import { PlaybackService } from './services/RNTPService';

import { setupPlayer } from './utils/react-native-track-player';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
setUpToy();
setupPlayer(); // async
TrackPlayer.registerPlaybackService(() => PlaybackService);
