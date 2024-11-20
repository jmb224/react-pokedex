import { Pokemon } from '../../../types';

export function joinPokemonTypes(types: Pokemon['types']) {
  return types.map(({ type }) => type.name).join(', ');
}
