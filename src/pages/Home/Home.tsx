import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar';
import { useGlobalContext } from '../../context/context';
import { StyledListGroupItem } from '../PokemonCard/PokemonCard.styled';
import { Pokemon } from '../../types';

export interface SavedPokemon {
  [key: string]: {
    addedOn: string;
  };
}

export function Home() {
  const navigate = useNavigate();
  const { allPokemonsData } = useGlobalContext();

  function handleOnCardClick(e: React.MouseEvent, pokemonName: string) {
    e.preventDefault();

    navigate(`pokemon/${pokemonName}`);
  }

  return (
    <Container fluid className="mt-5">
      <Row>
        <SearchBar />
        {allPokemonsData.map((pokemon) => (
          <Col md={6} lg={3} sm={6} xs={12} className="mb-4" key={pokemon.name}>
            <Card>
              <CardImg
                className="card-image"
                variant="top"
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
              <CardBody>
                <CardTitle>{pokemon.name} </CardTitle>
                {/* <CardText>
                  Caught by me:{" "}
                  <strong>{myPokemonsLS[pokemon.name] ? "Yes" : "No"} </strong>
                </CardText> */}
                <Button variant="primary" onClick={(e) => handleOnCardClick(e, pokemon.name)}>
                  Details
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
