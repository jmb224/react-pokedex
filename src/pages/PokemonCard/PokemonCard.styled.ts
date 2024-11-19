import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import styled from 'styled-components';

export const StyledCardTitle = styled(Card.Title)`
  text-transform: capitalize;
`;

export const StyledCardHeader = styled(Card.Header)`
  text-transform: capitalize;
  font-weight: 700;
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
`;
