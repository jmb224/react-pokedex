import CardText from 'react-bootstrap/CardText';
import { useLocalStorage } from '../../hooks';
import { SavedPokemon } from '../../types';
import React from 'react';

type CapturedPokemonProps = { name: string; captured: boolean };

export function CapturedPokemon({ name, captured }: CapturedPokemonProps) {
  const [storedValue] = useLocalStorage<SavedPokemon>('mypokemon', {});
  const capturedPokemon = storedValue[name];

  return (
    <CardText>
      <strong>
        {captured
          ? `Captured on - ${new Date(+capturedPokemon.addedOn).toLocaleString()}`
          : '*Not yet captured'}
      </strong>
    </CardText>
  );
}
