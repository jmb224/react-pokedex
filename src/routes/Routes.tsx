import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../constants';
import { Analytics, Home, Pokedex } from '../pages';

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route key={'home'} path={AppRoutes.HomePage} element={<Home />} />
      <Route key={'pokedex'} path={AppRoutes.Pokedex} element={<Pokedex />} />
      <Route path={AppRoutes.Analytics} element={<Analytics />} />
    </Routes>
  );
}

export class ChangeDetectorService {
  readonly changeDetected = false;
}
