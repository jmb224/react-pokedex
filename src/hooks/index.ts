import { useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonByName, getPokemons } from "../api";
import React from "react";

export const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

interface Pokemon {
  name: string;
  image: string;
}

// const fetchPokemonList = async (): Promise<Pokemon[]> => {
//   const response = await fetch(`${POKEMON_API_URL}?limit=151`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch Pokémon data');
//   }

//   const data = await response.json();

//   // Map the results to extract names and images
//   return data.results.map((pokemon: { name: string; url: string }) => ({
//     name: pokemon.name,
//     image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//       pokemon.url.split('/').slice(-2, -1)[0]
//     }.png`
//   }));
// };

// export const usePokemonList = () => {
//   return useQuery<Pokemon[]>(['pokemonList'], fetchPokemonList);
// };

export function useGetPokemonList(url: string) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["PokemonList", url],
    queryFn: () => getPokemons(url),
    select: (data) => data.data.results,
  });

  return { data, isFetching, isError };
}

export function useGetPokemonByName(name: string) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["PokemonByName", name],
    queryFn: () => getPokemonByName(name),
    select: (data) => data.data,
  });

  return { data, isFetching, isError };
}

export function useGetPokemon(url: string, name: string) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["PokemonItem", name],
    queryFn: () => getPokemon(url),
    select: (data) => data.data,
  });

  return { data, isFetching, isError };
}

export function useLocalStorage(key: string) {
  const [myPokemons, setMyPokemons] = React.useState<
    Record<string, { capturedDate: number }>
  >({});

  function setItem(value: string, capturedDate: number) {
    const savedItems = getItem();

    savedItems[value] = { capturedDate };

    window.localStorage.setItem(key, JSON.stringify(savedItems));
  }

  function getItem() {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  }

  function removeItem(name: string) {
    const savedItems = getItem();

    delete savedItems[name];

    window.localStorage.setItem(key, JSON.stringify(savedItems));
  }

  React.useEffect(() => {
    setMyPokemons(getItem());
  }, [removeItem]);

  return { setItem, getItem, removeItem, myPokemonsLS: getItem() };
}

async function getAllPokemons(url: string) {
  const data = await getPokemons(url);
}
