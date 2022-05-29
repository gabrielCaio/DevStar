import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'

import { MainStack } from './src/Stacks/MainStack'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </>
  );
}

