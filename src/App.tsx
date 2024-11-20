import axios from 'axios';
import debounce from 'debounce';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { apiURL, fetchAllPokemon, fetchPokemonByName } from './api';
import { Navigation } from './components';
import { GlobalContext } from './context';
import { ApplicationRoutes } from './routes';
import { GlobalState, Pokemon } from './types';
import { ActionType, reducerFn } from './hooks';

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

    const { data } = await axios.get(`${apiURL}?limit=100000&offset=0`);

    dispatch({ type: ActionType.GetAllPokemonFromDb, payload: data.results });
  }

  const realTimeSearch = debounce(
    (search: string) => {
      dispatch({ type: ActionType.Loading });

      const results = state.pokemonDb?.filter((pokemon) => pokemon.name.includes(search.toLowerCase()));

      dispatch({ type: ActionType.Search, payload: results });
    },
    400,
    { immediate: true }
  );

  const contextData = React.useMemo(
    () => ({ ...state, allPokemonsData: allPokemonData, getPokemonByName, realTimeSearch }),
    [allPokemonData, realTimeSearch, state]
  );

  React.useEffect(() => {
    getAllPokemon();
    getAllPokemonFromDB();
  }, []);

  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{ ...state, allPokemonsData: allPokemonData, getPokemonByName, realTimeSearch }}
      >
        <Navigation />
        <ApplicationRoutes />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}
