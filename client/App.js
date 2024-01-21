import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Fooder from './Components/Fooder';
import { SocketProvider } from './Components/SocketContext';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <SocketProvider>
          <Fooder/>
        </SocketProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
