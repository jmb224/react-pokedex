import { useQuery } from '@tanstack/react-query';
import { fetchPokemonByName } from '../api';

export function useGetPokemonByName(name: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getPokemonByName', name],
    queryFn: () => fetchPokemonByName(name)
  });

  return { data, isLoading, isError };
}
