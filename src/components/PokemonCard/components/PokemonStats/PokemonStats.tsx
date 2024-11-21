import { Badge } from 'react-bootstrap';
import { StyledListGroupItem } from '../../PokemonCard.styled';
import { Stats } from '../../../../types';

export function PokemonStats({ stats }: { stats: Stats[] }) {
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
