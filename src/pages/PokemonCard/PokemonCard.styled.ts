import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import styled, { css } from 'styled-components';

const capitalize = css`
  text-transform: capitalize;
`;

export const StyledCardHeader = styled(Card.Header)`
  ${capitalize}
  font-weight: 700;
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  ${capitalize}
`;
