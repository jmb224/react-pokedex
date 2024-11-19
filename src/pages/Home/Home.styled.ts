import { CardTitle, CardHeader, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";

export const StyledCardTitle = styled(CardTitle)`
  text-transform: capitalize;
`;

export const StyledCardHeader = styled(CardHeader)`
  text-transform: capitalize;
  font-weight: 700;
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
`;
