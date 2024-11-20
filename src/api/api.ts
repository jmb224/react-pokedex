import axios from 'axios';

export const apiURL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchAllPokemon(limit = 20) {
  const { data } = await axios.get(`${apiURL}?limit=${limit}`);
  return data.results;
}

export async function fetchPokemonByName(name: string) {
  const { data } = await axios.get(`${apiURL}/${name}`);
  return data;
}
