import { DebouncedFunction } from 'debounce';

export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: { front_default: string };
      ['official-artwork']: {
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

export interface SavedPokemon {
  [key: string]: {
    types: string;
    addedOn: string;
  } & Pick<Pokemon, 'id' | 'height'>;
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
  realTimeSearch: DebouncedFunction<(search: string) => void>;
};
