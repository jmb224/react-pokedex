import { GlobalState } from '../types';

export enum ActionType {
  Loading,
  GetPokemon,
  GetAllPokemon,
  GetAllPokemonFromDb,
  GetPokemonData,
  Search
}

export type Action = {
  type: ActionType;
  payload?: any;
};

export function reducerFn(state: GlobalState, action: Action): GlobalState {
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
