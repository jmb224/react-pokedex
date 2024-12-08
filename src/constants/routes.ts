export namespace AppRoutes {
  export const HomePage = '/';
  export const Analytics = `${HomePage}analytics/`;
  export const Pokedex = `${HomePage}mypokedex/`;
  export const PokeDexDetails = `${Pokedex}/:pokemonName`;
  export const PokemonDetails = `${HomePage}/pokemon/:pokemonName`;
}
