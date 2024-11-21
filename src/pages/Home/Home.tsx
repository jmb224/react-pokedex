import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { CapturedPokemon, SearchBar } from '../../components';
import { useGlobalContext, useLocalStorage } from '../../hooks';
import { SavedPokemon } from '../../types';
import { PokemonImage } from '../PokemonCard';

export function Home() {
  const navigate = useNavigate();
  const { allPokemonsData } = useGlobalContext();
  const { storedValueLS } = useLocalStorage<SavedPokemon>('mypokemon', {});

  function handleOnCardClick(event: React.MouseEvent, pokemonName: string) {
    event.preventDefault();

    navigate(`pokemon/${pokemonName}`);
  }

  return (
    <Container fluid>
      <h1 style={{ textAlign: 'center' }}>Welcome to Pokemon challenge</h1>
      <Row className="mt-5">
        <SearchBar />
        {allPokemonsData.map((pokemon) => (
          <Col md={6} lg={3} sm={6} xs={12} className="mb-4" key={pokemon.name}>
            <Card>
              <PokemonImage pokemon={pokemon} />
              <Card.Body>
                <Card.Title>{pokemon.name} </Card.Title>
                <CapturedPokemon
                  captured={Boolean(storedValueLS[pokemon.name])}
                  capturedDate={storedValueLS[pokemon.name]?.addedOn}
                />
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
