import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { GlobalContext } from "./context/context";
import { ApplicationRoutes } from "./routes/Routes";
import React from "react";
import axios from "axios";
import { apiURL } from "./api";
import debounce from "debounce";
import { truncate } from "fs";

enum ActionType {
  Loading,
  GetPokemon,
  GetAllPokemon,
  GetAllPokemonFromDb,
  GetPokemonData,
  Search,
  NextPage,
  AddToMyPokedex,
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
      console.log({ payload: action.payload });

      return { ...state, pokemon: action.payload, isLoadingData: false };
    }

    case ActionType.GetAllPokemonFromDb: {
      console.log({ payload: action.payload });

      return { ...state, pokemonDb: action.payload, isLoadingData: false };
    }

    case ActionType.Search: {
      return { ...state, searchResult: action.payload, isLoadingData: false };
    }

    case ActionType.AddToMyPokedex: {
      return { ...state, pokedex: action.payload, isLoadingData: false };
    }

    default:
      break;
  }

  return state;
}

export function App() {
  const [state, dispatch] = React.useReducer(reducerFn, initialState);
  const [allPokemonData, setAllPokemonData] = React.useState<Pokemon[]>([]);
  // const [pokemonData, setPokemonData] = React.useState<PokemonData[]>([]);

  async function getAllPokemon() {
    dispatch({ type: ActionType.Loading });

    const { data } = await axios.get(`${apiURL}?limit=20`);

    dispatch({ type: ActionType.GetAllPokemon, payload: data.results });

    const pokemonData = [];

    for (const pokemon of data.results) {
      const { data } = await axios.get(pokemon.url);

      pokemonData.push(data);
    }

    setAllPokemonData(pokemonData);
  }

  async function getPokemonByName(name: string) {
    dispatch({ type: ActionType.Loading });

    const { data } = await axios.get(`${apiURL}/${name}`);

    dispatch({ type: ActionType.GetPokemon, payload: data });
  }

  async function getAllPokemonFromDB() {
    dispatch({ type: ActionType.Loading });

    const { data } = await axios.get(`${apiURL}?limit=100000&offset=0`);

    dispatch({ type: ActionType.GetAllPokemonFromDb, payload: data.results });
  }

  function addToMyPokedex(pokemonName: string, date: number) {
    dispatch({
      type: ActionType.AddToMyPokedex,
      payload: { name: pokemonName, dateCaptured: date },
    });

    console.log(state.pokedex);
  }

  const realTimeSearch = debounce(
    (search: string) => {
      dispatch({ type: ActionType.Loading });

      const res = state.pokemonDb?.filter((pokemon) =>
        pokemon.name.includes(search)
      );

      dispatch({ type: ActionType.Search, payload: res });

      console.log(res);
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
          addToMyPokedex,
          realTimeSearch,
        }}
      >
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
  searchResult: [{ id: string; name: string }];
  isLoadingData: boolean;
  pokemonDb: [{ name: string; url: string }];
  getPokemonByName: (name: string) => void;
  realTimeSearch: debounce.DebouncedFunction<(search: string) => void>;
  pokedex: [{ name: string; dateCaptured: number }];
  addToMyPokedex: (pokemonName: string, date: number) => void;
};

type AllPokemon = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: string;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: { front_default: string };
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  types: [
    {
      type: { name: string };
    }
  ];
  weight: number;
  height: number;
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
      };
    }
  ];
};
