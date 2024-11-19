import { ButtonGroup, Button } from "react-bootstrap";

export function Toolbar({
  handleDelete,
  handleViewDetails,
  selectedCount,
}: {
  selectedCount: number;
  handleDelete: () => void;
  handleViewDetails: () => void;
}) {
  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <ButtonGroup>
        <Button
          variant="primary"
          onClick={handleViewDetails}
          disabled={selectedCount !== 1}
        >
          View Details
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={selectedCount === 0}
        >
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
}
