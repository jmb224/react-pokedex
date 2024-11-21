import React from 'react';
import { Container } from 'react-bootstrap';
import { ViewDetailsModal } from '../../components';
import { useLocalStorage, useModal } from '../../hooks';
import { Pokemon, SavedPokemon } from '../../types';
import { Table, Toolbar } from './components';
import { SortConfig, SortDirection } from './types';
import { transformDataFromLS } from './utils';

export type RowData = Pick<Pokemon, 'id' | 'name' | 'height'> & {
  types: string;
  date: string;
  isSelected: boolean;
};

export function Pokedex() {
  const { name, showCard, setName, toggleModal } = useModal();
  const { storedValueLS, removeEntry } = useLocalStorage<SavedPokemon>('mypokemon', {});
  const [data, setData] = React.useState<RowData[]>(transformDataFromLS(storedValueLS));
  const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
  const [sortConfig, setSortConfig] = React.useState<SortConfig | null>(null);

  function handleCheckboxChange(id: number) {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, isSelected: !row.isSelected } : row))
    );

    setIsAllSelected(false);
  }

  function handleSelectAllChange() {
    const newSelectionState = !isAllSelected;

    setIsAllSelected(newSelectionState);
    setData((prevData) => prevData.map((row) => ({ ...row, isSelected: newSelectionState })));
  }

  function handleSort(key: keyof RowData) {
    let direction = SortDirection.Asc;

    if (sortConfig?.key === key && sortConfig?.direction === SortDirection.Asc) {
      direction = SortDirection.Desc;
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === SortDirection.Asc ? -1 : 1;
      if (a[key] > b[key]) return direction === SortDirection.Asc ? 1 : -1;

      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  }

  function handleDelete() {
    setData((prevData) =>
      prevData.filter((row) => {
        row.isSelected && removeEntry(row.name);

        return !row.isSelected;
      })
    );

    setIsAllSelected(false);
  }

  function handleViewDetails() {
    const selectedRow = data.find((row) => row.isSelected);

    if (!selectedRow) return;

    setName(selectedRow.name);
    toggleModal();
  }

  const selectedCount = data.filter((row) => row.isSelected).length;

  function handleExport() {
    const headers = ['name', 'height', 'types', 'date'];
    const rows = data.map((row) => `${row.name},${row.date}`);
    const csvContent = [headers.join('\n'), rows.join('\n')].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'exported_pokemon_data.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Container className="mt-2">
      <Toolbar
        disableExport={data.length === 0}
        selectedCount={selectedCount}
        handleDelete={handleDelete}
        handleExport={handleExport}
        handleViewDetails={handleViewDetails}
      />
      <Table
        data={data}
        isAllSelected={isAllSelected}
        sortConfig={sortConfig}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAllChange={handleSelectAllChange}
        handleSort={handleSort}
      />
      <ViewDetailsModal show={showCard} setShow={toggleModal} pokemonName={name} />
    </Container>
  );
}
