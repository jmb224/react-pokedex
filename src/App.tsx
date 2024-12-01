import axios from 'axios';
import debounce from 'debounce';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fetchAllPokemon, fetchAllPokemonFromDB, fetchPokemonByName } from './api';
import { Navigation } from './components';
import { GlobalContext } from './context';
import { ActionType, reducerFn } from './hooks';
import { ApplicationRoutes } from './routes';
import { GlobalState, Pokemon } from './types';

const initialState: GlobalState = Object.create({});

export function App() {
  const [state, dispatch] = React.useReducer(reducerFn, initialState);
  const [allPokemonData, setAllPokemonData] = React.useState<Pokemon[]>([]);

  async function getAllPokemon() {
    dispatch({ type: ActionType.Loading });

    const allPokemon: [{ id: string; url: string }] = await fetchAllPokemon();

    dispatch({ type: ActionType.GetAllPokemon, payload: allPokemon });

    const detailedPokemonData = await Promise.all(
      allPokemon.map(({ url }) => axios.get(url).then((res) => res.data))
    );

    setAllPokemonData(detailedPokemonData);
  }

  async function getPokemonByName(name: string) {
    dispatch({ type: ActionType.Loading });

    const pokemon = await fetchPokemonByName(name);

    dispatch({ type: ActionType.GetPokemon, payload: pokemon });
  }

  async function getAllPokemonFromDB() {
    dispatch({ type: ActionType.Loading });

    const allPokemonFromDB = await fetchAllPokemonFromDB();

    dispatch({ type: ActionType.GetAllPokemonFromDb, payload: allPokemonFromDB });
  }

  const contextData = React.useMemo(() => {
    console.log('HERE');
    return { ...state, allPokemonsData: allPokemonData, getPokemonByName };
  }, [allPokemonData, state]);

  React.useEffect(() => {
    getAllPokemon();
    getAllPokemonFromDB();
  }, []);

  console.log('Render');

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={contextData}>
        <Navigation />
        <ApplicationRoutes />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}
