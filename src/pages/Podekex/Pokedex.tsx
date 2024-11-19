import { useState } from "react";
import { Container } from "react-bootstrap";
import { Table, Toolbar } from "./components";

export interface RowData {
  id: number;
  name: string;
  date: string;
  isSelected: boolean;
}

enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export type SortConfig = {
  key: keyof RowData;
  direction: SortDirection;
};

export function Pokedex() {
  const [data, setData] = useState<RowData[]>([
    { id: 1, name: "John Doe", date: "2024-11-19", isSelected: false },
    { id: 2, name: "Jane Smith", date: "2024-11-18", isSelected: false },
    { id: 3, name: "Alice Johnson", date: "2024-11-17", isSelected: false },
  ]);

  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleCheckboxChange = (id: number) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isSelected: !row.isSelected } : row
      )
    );

    setIsAllSelected(false); // Reset "Select All" if not all rows are selected
  };

  const handleSelectAllChange = () => {
    const newSelectionState = !isAllSelected;

    setIsAllSelected(newSelectionState);
    setData((prevData) =>
      prevData.map((row) => ({ ...row, isSelected: newSelectionState }))
    );
  };

  const handleSort = (key: keyof RowData) => {
    let direction = SortDirection.Asc;

    if (
      sortConfig?.key === key &&
      sortConfig?.direction === SortDirection.Asc
    ) {
      direction = SortDirection.Desc;
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === SortDirection.Asc ? -1 : 1;
      if (a[key] > b[key]) return direction === SortDirection.Asc ? 1 : -1;

      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((row) => !row.isSelected));
    setIsAllSelected(false);
  };

  const handleViewDetails = () => {
    const selectedRow = data.find((row) => row.isSelected);

    if (selectedRow) {
    }
  };

  const selectedCount = data.filter((row) => row.isSelected).length;

  return (
    <Container className="mt-5">
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
