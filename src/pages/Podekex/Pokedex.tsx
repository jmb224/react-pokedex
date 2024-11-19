import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Table, Toolbar } from './components';
import { SortConfig, SortDirection } from './types';
import { useLocalStorage } from '../../hooks';
import { Pokemon, SavedPokemon } from '../../types';
import { transformDataFromLS } from './utils';
import { useNavigate } from 'react-router-dom';

export type RowData = Pick<Pokemon, 'id' | 'name'> & {
  date: string;
  isSelected: boolean;
};

export function Pokedex() {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage<SavedPokemon>('mypokemon', {});
  const [data, setData] = useState<RowData[]>(transformDataFromLS(storedValue));
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

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

  const handleDelete = () => {
    setData((prevData) => prevData.filter((row) => !row.isSelected));
    setIsAllSelected(false);
  };

  const handleViewDetails = () => {
    const selectedRow = data.find((row) => row.isSelected);

    if (!selectedRow) return;

    navigate(selectedRow.name);
  };

  const selectedCount = data.filter((row) => row.isSelected).length;

  return (
    <Container className="mt-2">
      <Toolbar
        selectedCount={selectedCount}
        handleDelete={handleDelete}
        handleViewDetails={handleViewDetails}
      />
      <Table
        data={data}
        isAllSelected={isAllSelected}
        sortConfig={sortConfig}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAllChange={handleSelectAllChange}
        handleSort={handleSort}
      ></Table>
    </Container>
  );
}
