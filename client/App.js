import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Fooder from './Components/Fooder';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Fooder/>
      </PaperProvider>
    </NavigationContainer>
  );
}
