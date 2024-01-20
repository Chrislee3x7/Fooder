import { PaperProvider } from 'react-native-paper';
import Fooder from './Components/Fooder';

export default function App() {
  return (
    <PaperProvider>
      <Fooder/>
    </PaperProvider>
  );
}
