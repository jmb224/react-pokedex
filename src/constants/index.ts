export namespace AppRoutes {
  export const HomePage = "/";
  export const PokemonDetails = `${HomePage}:pokemonName`;
}

export const dynamicRoutes = {
  getPokemonDetails: (name: string) => `/${name}`,
};
