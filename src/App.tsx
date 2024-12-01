import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fetchAllPokemon, fetchAllPokemonFromDB } from './api';
import { Navigation } from './components';
import { GlobalContext } from './context';
import { ActionType, reducerFn, useLocalStorage } from './hooks';
import { ApplicationRoutes } from './routes';
import { GlobalState, Pokemon, SavedPokemon } from './types';

const initialState: GlobalState = Object.create({});
const queryClient = new QueryClient();

export function App() {
  const [state, dispatch] = React.useReducer(reducerFn, initialState);
  const [allPokemonData, setAllPokemonData] = React.useState<Pokemon[]>([]);
  const { storedValueLS, addOrUpdateEntry, removeEntry } = useLocalStorage<SavedPokemon>({});

  async function getAllPokemon() {
    dispatch({ type: ActionType.Loading });

    const allPokemon: [{ id: string; url: string }] = await fetchAllPokemon();

    dispatch({ type: ActionType.GetAllPokemon, payload: allPokemon });

    const detailedPokemonData = await Promise.all(
      allPokemon.map(({ url }) => axios.get(url).then((res) => res.data))
    );

    setAllPokemonData(detailedPokemonData);
  }

  async function getAllPokemonFromDB() {
    dispatch({ type: ActionType.Loading });

    const allPokemonFromDB = await fetchAllPokemonFromDB();

    dispatch({ type: ActionType.GetAllPokemonFromDb, payload: allPokemonFromDB });
  }

  const contextData = React.useMemo(() => {
    console.log('HERE', { storedValueLS });
    return { ...state, addOrUpdateEntry, removeEntry, allPokemonsData: allPokemonData, storedValueLS };
  }, [addOrUpdateEntry, allPokemonData, removeEntry, state, storedValueLS]);

  React.useEffect(() => {
    getAllPokemon();
    getAllPokemonFromDB();
  }, []);

  console.log('Render');

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalContext.Provider value={contextData}>
          <Navigation />
          <ApplicationRoutes />
        </GlobalContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
