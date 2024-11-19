import { SavedPokemon } from '../../../types';
import { RowData } from '../Pokedex';

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
