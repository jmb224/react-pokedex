import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { CapturedPokemon, SearchBar } from '../../components';
import { useGlobalContext } from '../../context/context';

export function Home() {
  const navigate = useNavigate();
  const { allPokemonsData } = useGlobalContext();

  function handleOnCardClick(event: React.MouseEvent, pokemonName: string) {
    event.preventDefault();

    navigate(`pokemon/${pokemonName}`);
  }

  return (
    <Container fluid className="mt-5">
      <Row>
        <SearchBar />
        {allPokemonsData.map((pokemon) => (
          <Col md={6} lg={3} sm={6} xs={12} className="mb-4" key={pokemon.name}>
            <Card>
              <Card.Img
                variant="top"
                className="card-image"
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
              <Card.Body>
                <Card.Title>{pokemon.name} </Card.Title>
                <CapturedPokemon name={pokemon.name} />
                <Button variant="primary" onClick={(e) => handleOnCardClick(e, pokemon.name)}>
                  Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
