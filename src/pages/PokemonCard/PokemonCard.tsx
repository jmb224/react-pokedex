import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import { useParams } from 'react-router-dom';
import { CapturedPokemon } from '../../components';
import { useLocalStorage, useGlobalContext } from '../../hooks';
import { SavedPokemon } from '../../types';
import { joinPokemonTypes } from '../Podekex/utils';
import { PokemonImage, PokemonStats } from './components';
import { StyledCardHeader, StyledListGroupItem } from './PokemonCard.styled';

export function PokemonCard() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [captured, setCaptured] = React.useState(false);
  const { isLoadingData, pokemon, getPokemonByName } = useGlobalContext();
  const [storedValue, addOrUpdateEntry, removeEntry] = useLocalStorage<SavedPokemon>('mypokemon', {});

  function handleOnButtonClick() {
    const { id, name, height, types } = pokemon;
    const allTypes = joinPokemonTypes(types);

    addOrUpdateEntry(name, { id, height, types: allTypes, addedOn: Date.now().toString() });
    setCaptured(true);
  }

  function handleOnDeleteClick() {
    removeEntry(pokemon.name);
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
          <Card className="mt-2" style={{ width: '20rem', margin: 'auto' }}>
            <StyledCardHeader>
              <Card.Title>
                {pokemon.id} - {pokemon.name}
              </Card.Title>
            </StyledCardHeader>
            <PokemonImage pokemon={pokemon} />
            <Card.Body>
              <Card.Text>Types: {joinPokemonTypes(pokemon.types)}</Card.Text>
              <CapturedPokemon captured={captured} capturedDate={storedValue[pokemon.name]?.addedOn} />
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
