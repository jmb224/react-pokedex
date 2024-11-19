import { Pokemon } from '../../../types';

export function joinTypes(types: Pokemon['types']) {
  return types.map(({ type }) => type.name).join(', ');
}
