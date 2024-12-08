import { useQuery } from '@tanstack/react-query';
import { fetchAllPokemonFromDB } from '../api';

export function useGetAllPokemonFromDb() {
  const { data, isLoading, isError } = useQuery<Array<{ name: string; url: string }>>({
    queryKey: ['getAllPokemonFromDB'],
    queryFn: () => fetchAllPokemonFromDB()
  });

  return { data, isLoading, isError };
}


export function useGetAllPokemon() {
    
}