export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: { front_default: string };
    };
  };
  types: [
    {
      type: { name: string };
    }
  ];
  weight: number;
  height: number;
  stats: Stats[];
};

export type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
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
  pokemonDb: Array<{ name: string; url: string }>;
  storedValueLS: SavedPokemon;
  addOrUpdateEntry: (entryKey: string, entryValue: any) => void;
  removeEntry: (key: string) => void;
};
