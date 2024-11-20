import axios from 'axios';
export * from './api';

export const apiURL = 'https://pokeapi.co/api/v2/pokemon';

export const request = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

// export function getPokemons(): Promise<{ results: { name: string; url: string } }[]> {
export function getPokemons(url: string): Promise<GetPokemonResponse> {
  return request.get(url);
}
// export function getPokemons(): Promise<GetPokemonResponse> {
//   return request.get(`${apiURL}?limit=20`);
// }

export function getPokemon(url: string): Promise<{ data: PokemonItem }> {
  return request.get(url);
}

export function getPokemonByName(name: string): Promise<{ data: PokemonItem }> {
  return request.get(`${apiURL}/${name}`);
}

export type PokemonItem = {
  id: string;
  name: string;
  sprites: {
    front_default: string;
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
  weight: number;
  height: string;
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

type GetPokemonResponse = {
  data: {
    results: [
      {
        url: string;
        name: string;
      }
    ];
  };
};

type CaughtPokemon = {
  name: string;
};
