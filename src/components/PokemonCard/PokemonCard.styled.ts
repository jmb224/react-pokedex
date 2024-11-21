import ListGroupItem from 'react-bootstrap/ListGroupItem';
import styled, { css } from 'styled-components';

export const capitalize = css`
  text-transform: capitalize;
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  ${capitalize}
`;
