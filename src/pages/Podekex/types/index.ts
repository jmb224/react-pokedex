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
  key: keyof RowData;
  direction: SortDirection;
};
