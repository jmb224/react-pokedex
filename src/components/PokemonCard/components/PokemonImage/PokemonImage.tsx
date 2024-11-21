import CardImg from 'react-bootstrap/CardImg';
import { Pokemon } from '../../../../types';

export function PokemonImage({ pokemon }: { pokemon: Pokemon }) {
  return (
    <CardImg
      variant="top"
      className="card-image"
      style={{ height: '12rem !important' }}
      src={pokemon.sprites.other.dream_world.front_default}
      alt={pokemon.name}
    />
  );
}
