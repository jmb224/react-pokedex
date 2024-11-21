import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { capitalize, PokemonCard } from '../PokemonCard';

type ViewDetailsProps = {
  show: boolean;
  pokemonName: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledModalHeader = styled(Modal.Header)`
  ${capitalize}
`;

export function ViewDetailsModal({ setShow, show, pokemonName }: ViewDetailsProps) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <StyledModalHeader closeButton>
        <Modal.Title>{pokemonName}</Modal.Title>
      </StyledModalHeader>
      <Modal.Body>
        <PokemonCard pokemonName={pokemonName} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
