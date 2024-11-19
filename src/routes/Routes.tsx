import { Route, Routes } from "react-router-dom";
import { Home, PokemonCard } from "../pages";

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/pokemon/:pokemonName" element={<PokemonCard />}></Route>
    </Routes>
  );
}
