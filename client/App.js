import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Fooder from './Components/Fooder';
import { SocketProvider } from './Components/SocketContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <SocketProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Fooder />
          </GestureHandlerRootView>
        </SocketProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
