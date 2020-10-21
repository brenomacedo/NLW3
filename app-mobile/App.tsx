import React from 'react'
import { StatusBar, Text, View } from 'react-native'
import { useFonts, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
import Routes from './src/routes'

export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if(!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <>
      <StatusBar hidden />
      <Routes />
    </>
  );
}