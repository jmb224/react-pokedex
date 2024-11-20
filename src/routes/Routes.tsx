import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../constants';
import { Analytics, Home, Pokedex, PokemonCard } from '../pages';

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route path={AppRoutes.HomePage} element={<Home />} />
      <Route path={AppRoutes.Pokedex} element={<Pokedex />} />
      <Route path={AppRoutes.Analytics} element={<Analytics />} />
      <Route path={AppRoutes.PokemonDetails} element={<PokemonCard />} />
      <Route path={AppRoutes.PokeDexDetails} element={<PokemonCard />} />
    </Routes>
  );
}
