import { ButtonGroup, Button } from 'react-bootstrap';

export function Toolbar({
  handleDelete,
  handleViewDetails,
  selectedCount,
  disableExport,
  handleExport
}: {
  disableExport: boolean;
  selectedCount: number;
  handleDelete: () => void;
  handleExport: () => void;
  handleViewDetails: () => void;
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <ButtonGroup>
        <Button variant="success" onClick={handleExport} disabled={disableExport}>
          Export pokemon data
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="primary" onClick={handleViewDetails} disabled={selectedCount !== 1}>
          View pokemon details
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={selectedCount === 0}>
          Delete pokemon
        </Button>
      </ButtonGroup>
    </div>
  );
}
