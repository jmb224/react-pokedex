import CardText from 'react-bootstrap/CardText';

type CapturedPokemonProps = { captured: boolean; capturedDate: string };

export function CapturedPokemon({ captured, capturedDate }: CapturedPokemonProps) {
  return (
    <CardText>
      <strong>
        {captured ? `Captured on - ${new Date(+capturedDate).toLocaleString()}` : '*Not yet captured'}
      </strong>
    </CardText>
  );
}
