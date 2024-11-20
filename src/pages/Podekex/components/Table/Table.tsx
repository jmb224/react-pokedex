import { Form, Table as TableLib } from 'react-bootstrap';
import { RowData } from '../../Pokedex';
import { Arrow, SortConfig, SortDirection } from '../../types';
import styled from 'styled-components';

type TableProps = {
  isAllSelected: boolean;
  data: RowData[];
  sortConfig: SortConfig | null;
  handleSelectAllChange: () => void;
  handleCheckboxChange: (id: number) => void;
  handleSort: (key: keyof RowData) => void;
};

const StyledTableHeader = styled.th`
  cursor: pointer;
`;

export function Table({
  data,
  sortConfig,
  isAllSelected,
  handleSort,
  handleCheckboxChange,
  handleSelectAllChange
}: TableProps) {
  const getArrowType = () => (sortConfig?.direction === SortDirection.Asc ? Arrow.Up : Arrow.Down);

  return (
    <TableLib striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check type="checkbox" checked={isAllSelected} onChange={handleSelectAllChange} />
          </th>
          <StyledTableHeader onClick={() => handleSort('name')}>
            Name
            {sortConfig?.key === 'name' && getArrowType()}
          </StyledTableHeader>
          <StyledTableHeader onClick={() => handleSort('height')}>
            Height
            {sortConfig?.key === 'height' && getArrowType()}
          </StyledTableHeader>
          <StyledTableHeader onClick={() => handleSort('types')}>
            Types
            {sortConfig?.key === 'types' && getArrowType()}
          </StyledTableHeader>
          <StyledTableHeader onClick={() => handleSort('date')}>
            Date
            {sortConfig?.key === 'date' && getArrowType()}
          </StyledTableHeader>
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
