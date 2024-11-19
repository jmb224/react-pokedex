import { Form, Table as TableLib } from 'react-bootstrap';
import { RowData } from '../../Pokedex';
import { Arrow, SortConfig } from '../../types';

type TableProps = {
  isAllSelected: boolean;
  data: RowData[];
  sortConfig: SortConfig | null;
  handleSelectAllChange: () => void;
  handleCheckboxChange: (id: number) => void;
  handleSort: (key: keyof RowData) => void;
};

export function Table({
  data,
  sortConfig,
  isAllSelected,
  handleSort,
  handleCheckboxChange,
  handleSelectAllChange
}: TableProps) {
  return (
    <TableLib striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check type="checkbox" checked={isAllSelected} onChange={handleSelectAllChange} />
          </th>
          <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
            Name
            {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? Arrow.Up : Arrow.Down)}
          </th>
          <th onClick={() => handleSort('height')} style={{ cursor: 'pointer' }}>
            Height
            {sortConfig?.key === 'height' && (sortConfig.direction === 'asc' ? Arrow.Up : Arrow.Down)}
          </th>
          <th onClick={() => handleSort('types')} style={{ cursor: 'pointer' }}>
            Types
            {sortConfig?.key === 'types' && (sortConfig.direction === 'asc' ? Arrow.Up : Arrow.Down)}
          </th>
          <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
            Date
            {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? Arrow.Up : Arrow.Down)}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={row.isSelected}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </td>
            <td>{row.name}</td>
            <td>{row.height}</td>
            <td>{row.types}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </TableLib>
  );
}
