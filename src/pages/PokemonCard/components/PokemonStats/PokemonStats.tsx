import { Badge } from 'react-bootstrap';
import { StyledListGroupItem } from '../../PokemonCard.styled';
import { Pokemon } from '../../../../types';

export function PokemonStats({ stats }: Pick<Pokemon, 'stats'>) {
  return (
    <>
      {stats.map(({ stat, base_stat }) => (
        <StyledListGroupItem key={stat.name}>
          {stat.name} <Badge pill>{base_stat}</Badge>
        </StyledListGroupItem>
      ))}
    </>
  );
}
