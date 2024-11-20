import CardText from 'react-bootstrap/CardText';
import { useLocalStorage } from '../../hooks';
import { SavedPokemon } from '../../types';

type CapturedPokemonProps = { name: string };

export function CapturedPokemon({ name }: CapturedPokemonProps) {
  const [storedValue] = useLocalStorage<SavedPokemon>('mypokemon', {});
  const capturedPokemon = storedValue[name];

  return (
    <CardText>
      <strong>
        {capturedPokemon
          ? `Captured on - ${new Date(+capturedPokemon.addedOn).toLocaleString()}`
          : '*Not yet captured'}
      </strong>
    </CardText>
  );
}
