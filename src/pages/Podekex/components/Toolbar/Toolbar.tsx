import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

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
    <ButtonToolbar aria-label="Toolbar with button groups" className="justify-content-between mb-3">
      <ButtonGroup aria-label="export">
        <Button variant="success" onClick={handleExport} disabled={disableExport}>
          Export pokemon data
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="view and delete">
        <Button variant="primary" onClick={handleViewDetails} disabled={selectedCount !== 1}>
          View pokemon details
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={selectedCount === 0}>
          Delete pokemon
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}
