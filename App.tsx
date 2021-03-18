import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import Routes from './src/routes';

const App: React.FC = () => {
  const [fonstLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fonstLoaded) {
    return null;
  }

  return <Routes />;
};

export default App;
