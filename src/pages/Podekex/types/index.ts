import { SavedPokemon } from '../../../types';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum Arrow {
  Up = '🔼',
  Down = '🔽'
}

export type SortConfig = {
  key: keyof SavedPokemon;
  direction: SortDirection;
};
