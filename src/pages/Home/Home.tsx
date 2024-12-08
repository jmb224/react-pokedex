import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { fetchAllPokemon } from '../../api';
import { CapturedPokemon, PokemonImage, SearchBar, ViewDetailsModal } from '../../components';
import { useGlobalContext, useModal } from '../../hooks';
import { Pokemon } from '../../types';

export function Home() {
  const { storedValueLS } = useGlobalContext();
  const { name, showCard, setName, toggleModal } = useModal();
  const [allPokemonsData, setAllPokemonsData] = React.useState<Pokemon[]>([]);

  async function getAllPokemon() {
    const allPokemon: [{ id: string; url: string }] = await fetchAllPokemon();
    const detailedPokemonData = await Promise.all(
      allPokemon.map(({ url }) => axios.get(url).then((res) => res.data))
    );

    setAllPokemonsData(detailedPokemonData);
  }

  function handleOnCardClick(event: React.MouseEvent, pokemonName: string) {
    event.preventDefault();

    setName(pokemonName);
    toggleModal();
  }

  React.useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <Container fluid>
      <h1 style={{ textAlign: 'center' }}>Welcome to Pokemon challenge</h1>
      <Row className="mt-5">
        <SearchBar pokemonDb={allPokemonsData} />
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
        <ViewDetailsModal show={showCard} setShow={toggleModal} pokemonName={name} />
      </Row>
    </Container>
  );
}
