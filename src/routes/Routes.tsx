import { Route, Routes } from 'react-router-dom';
import { Home, Pokedex, PokemonCard } from '../pages';

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypokedex" element={<Pokedex />} />
      <Route path="/mypokedex/:pokemonName" element={<PokemonCard />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonCard />} />
    </Routes>
  );
}
