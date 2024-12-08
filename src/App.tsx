import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './components';
import { GlobalContext } from './context';
import { useLocalStorage } from './hooks';
import { ApplicationRoutes } from './routes';
import { SavedPokemon } from './types';

export function App() {
  const { storedValueLS, addOrUpdateEntry, removeEntry } = useLocalStorage<SavedPokemon>({});

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{ storedValueLS, addOrUpdateEntry, removeEntry }}>
        <Navigation />
        <ApplicationRoutes />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}
