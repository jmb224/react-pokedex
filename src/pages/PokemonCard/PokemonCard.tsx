import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import { useParams } from 'react-router-dom';
import { CapturedPokemon } from '../../components';
import { useGlobalContext } from '../../context/context';
import { useLocalStorage } from '../../hooks';
import { SavedPokemon } from '../../types';
import { PokemonImage, PokemonStats } from './components';
import { StyledCardHeader, StyledCardTitle, StyledListGroupItem } from './PokemonCard.styled';

export function PokemonCard() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [captured, setCaptured] = React.useState(false);
  const { isLoadingData, pokemon, getPokemonByName } = useGlobalContext();
  const [storedValue, addOrUpdateEntry, removeEntry] = useLocalStorage<SavedPokemon>('mypokemon', {});

  function handleOnButtonClick() {
    const { id, name, height, types } = pokemon;

    addOrUpdateEntry(pokemonName!, { id, name, height, types, addedOn: Date.now().toString() });
    setCaptured(true);
  }

  function handleOnDeleteClick() {
    removeEntry(pokemonName!);
    setCaptured(false);
  }

  React.useEffect(() => {
    if (!pokemonName) return;

    setCaptured(Boolean(storedValue[pokemonName]));
    getPokemonByName(pokemonName);
  }, []);

  return (
    <>
      {!isLoadingData && pokemon && (
        <div>
          <Card style={{ width: '20rem', margin: 'auto' }}>
            <StyledCardHeader>
              <StyledCardTitle>
                {pokemon.id} - {pokemon.name}
              </StyledCardTitle>
            </StyledCardHeader>
            <PokemonImage pokemon={pokemon} />
            <Card.Body>
              <Card.Text>Types: {pokemon.types.map(({ type }) => type.name).join()}</Card.Text>
              <CapturedPokemon name={pokemon.name} />
              <Stack gap={2}>
                <ListGroup>
                  <StyledListGroupItem>
                    Height <Badge pill>{pokemon.height}</Badge>
                  </StyledListGroupItem>
                  <StyledListGroupItem>
                    Weight <Badge pill>{pokemon.weight}</Badge>
                  </StyledListGroupItem>
                  <PokemonStats stats={pokemon.stats} />
                </ListGroup>
                {!captured ? (
                  <Button variant="outline-primary" onClick={handleOnButtonClick}>
                    Add to my pokedex
                  </Button>
                ) : (
                  <Button variant="outline-danger" onClick={handleOnDeleteClick}>
                    Removed from my pokedex
                  </Button>
                )}
              </Stack>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
