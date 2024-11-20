import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function Analytics() {
  return (
    <Container className="mt-2">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Captured vs. Uncaptured Pokémon</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Type Distribution</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
