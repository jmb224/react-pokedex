import { download, generateCsv, mkConfig } from 'export-to-csv';
import React from 'react';
import { Container } from 'react-bootstrap';
import { ViewDetailsModal } from '../../components';
import { useGlobalContext, useModal } from '../../hooks';
import { Pokemon } from '../../types';
import { Table, Toolbar } from './components';
import { SortConfig, SortDirection } from './types';
import { transformDataFromLS } from './utils';

const csvConfig = mkConfig({ columnHeaders: ['id', 'name', 'height', 'types', 'date'] });

export type RowData = Pick<Pokemon, 'id' | 'name' | 'height'> & {
  types: string;
  date: string;
  isSelected: boolean;
};

export function Pokedex() {
  const { name, showCard, setName, toggleModal } = useModal();
  const { storedValueLS, removeEntry } = useGlobalContext();
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
    const notSelected = [...data].reduce<Array<RowData>>((acc, curr) => {
      if (curr.isSelected) removeEntry(curr.name);
      else acc.push(curr);

      return acc;
    }, []);

    setData(notSelected);
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
    const csv = generateCsv(csvConfig)(data);

    download(csvConfig)(csv);
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
