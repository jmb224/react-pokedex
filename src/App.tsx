import axios from 'axios';
import debounce from 'debounce';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { apiURL, fetchAllPokemon, fetchPokemonByName } from './api';
import { Navigation } from './components';
import { GlobalContext } from './context';
import { ApplicationRoutes } from './routes';
import { Pokemon } from './types';

enum ActionType {
  Loading,
  GetPokemon,
  GetAllPokemon,
  GetAllPokemonFromDb,
  GetPokemonData,
  Search
}

type Action = {
  type: ActionType;
  payload?: any;
};

const initialState: GlobalState = Object.create({});

function reducerFn(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case ActionType.Loading: {
      return { ...state, isLoadingData: true };
    }

    case ActionType.GetPokemonData: {
      return { ...state, allPokemons: action.payload, isLoadingData: false };
    }

    case ActionType.GetPokemon: {
      return { ...state, pokemon: action.payload, isLoadingData: false };
    }

    case ActionType.GetAllPokemonFromDb: {
      console.log({ payload: action.payload });

      return { ...state, pokemonDb: action.payload, isLoadingData: false };
    }

    case ActionType.Search: {
      return { ...state, searchResult: action.payload, isLoadingData: false };
    }

    default:
      break;
  }

  return state;
}

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

  React.useEffect(() => {
    getAllPokemon();
    getAllPokemonFromDB();
  }, []);

  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          ...state,
          allPokemonsData: allPokemonData,
          getPokemonByName,
          realTimeSearch
        }}
      >
        <Navigation />
        <ApplicationRoutes />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export type GlobalState = {
  allPokemons: [];
  allPokemonsData: Pokemon[];
  pokemon: Pokemon;
  nextPage: string;
  searchResult: [Pick<Pokemon, 'id' | 'name'>];
  isLoadingData: boolean;
  pokemonDb: [{ name: string; url: string }];
  getPokemonByName: (name: string) => void;
  realTimeSearch: debounce.DebouncedFunction<(search: string) => void>;
};
