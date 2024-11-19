import { Form, Table as TableLib } from "react-bootstrap";
import { RowData, SortConfig } from "../../Pokedex";

type TableProps = {
  isAllSelected: boolean;
  data: RowData[];
  sortConfig: SortConfig | null;
  handleSelectAllChange: () => void;
  handleCheckboxChange: (id: number) => void;
  handleSort: (key: keyof RowData) => void;
};

enum Arrow {
  Up = "🔼",
  Down = "🔽",
}

export function Table({
  data,
  sortConfig,
  isAllSelected,
  handleSort,
  handleCheckboxChange,
  handleSelectAllChange,
}: TableProps) {
  return (
    <TableLib striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAllChange}
            />
          </th>
          <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
            Name
            {sortConfig?.key === "name" &&
              (sortConfig.direction === "asc" ? Arrow.Up : Arrow.Down)}
          </th>
          <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
            Date
            {sortConfig?.key === "date" &&
              (sortConfig.direction === "asc" ? Arrow.Up : Arrow.Down)}
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
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </TableLib>
  );
}
