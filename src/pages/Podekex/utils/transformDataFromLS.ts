import { RowData } from '../Pokedex';

export function transformDataFromLS(data: Record<string, { addedOn: string }>): RowData[] {
  return Object.entries(data).map(([key, value], index) => ({
    id: index + 1,
    name: key,
    date: new Date(Number(value.addedOn)).toLocaleString(),
    isSelected: false
  }));
}