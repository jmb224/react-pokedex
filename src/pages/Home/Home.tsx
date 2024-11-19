import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { useNavigate, useParams } from "react-router-dom";
import { Pokemon } from "../../App";
import { useGlobalContext } from "../../context/context";
import {
  StyledCardHeader,
  StyledCardTitle,
  StyledListGroupItem,
} from "./Home.styled";

export function Home() {
  const navigate = useNavigate();
  const { allPokemonsData, searchResult, realTimeSearch } = useGlobalContext();
  const [searchInput, setSeachInput] = React.useState("");

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSeachInput(event.target.value);

    realTimeSearch(searchInput);
  }

  function handleOnCardClick(e: React.MouseEvent, pokemonName: string) {
    e.preventDefault();

    navigate(`pokemon/${pokemonName}`);
  }

  function displaySearchResults() {
    function handleSearchClick(pokemonName: string) {
      navigate(`pokemon/${pokemonName}`);
    }

    return searchResult?.map((pokemon) => {
      return (
        <div
          key={pokemon.id}
          onClick={() => handleSearchClick(pokemon.name)}
          className="pokemon-name"
        >
          {pokemon.name}
        </div>
      );
    });
  }

  return (
    <Container fluid className="mt-5">
      <Row>
        <div>
          <Form>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Type your search</FormLabel>
              <FormControl
                value={searchInput}
                type="text"
                placeholder="Enter pokemon name"
                onChange={handleOnChange}
              />
            </FormGroup>
          </Form>
          {searchInput && searchResult?.length > 0 && (
            <div className="search-results">{displaySearchResults()}</div>
          )}
          {/* {searchInput && <div className="search-results">Search Results</div>} */}
        </div>
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
                <Button
                  variant="primary"
                  onClick={(e) => handleOnCardClick(e, pokemon.name)}
                >
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

export function PokemonCard() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const {
    isLoadingData,
    allPokemonsData,
    pokemon,
    getPokemonByName,
    addToMyPokedex,
  } = useGlobalContext();

  console.log(allPokemonsData);

  React.useEffect(() => {
    pokemonName && getPokemonByName(pokemonName);
  }, []);

  function handleOnButtonClick() {
    const dateCaptured = Date.now();

    addToMyPokedex(pokemonName!, dateCaptured);
    // setItem(pokemonName, dateCaptured);
    // setCaughtByMe({ capturedDate: dateCaptured });
  }

  function handleOnDeleteClick() {
    // removeItem(name);
    // setCaughtByMe({});
  }

  return (
    <>
      {!isLoadingData && pokemon && (
        <div>
          <Card style={{ width: "20rem", margin: "auto" }}>
            <StyledCardHeader>
              <StyledCardTitle>
                {pokemon.id} - {pokemon.name}
              </StyledCardTitle>
            </StyledCardHeader>
            <CardImg
              variant="top"
              className="card-image"
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
            <CardBody>
              <CardText>
                Types: {pokemon.types.map(({ type }) => type.name).join()}
              </CardText>
              {/* <CardText>
          Caught by me:
          <strong>
            {caughtByMe
              ? ` ${new Date(caughtByMe.capturedDate).toDateString()}`
              : "No"}
          </strong>
        </CardText> */}
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
                <Button variant="outline-primary" onClick={handleOnButtonClick}>
                  Add to my pokedex
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

export function PokemonStats({ stats }: Pick<Pokemon, "stats">) {
  return (
    <>
      {stats.map(({ stat, base_stat }) => (
        <StyledListGroupItem key={stat.name}>
          {stat.name} <Badge pill>{base_stat}</Badge>
        </StyledListGroupItem>
      ))}
    </>
  );
}

export function SearchForm() {
  const [searchInput, setSeachInput] = React.useState("");

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSeachInput(event.target.value);
  }

  return (
    <Form>
      <FormGroup className="mb-3" controlId="formBasicEmail">
        <FormLabel>Type your search</FormLabel>
        <FormControl
          value={searchInput}
          type="text"
          placeholder="Enter pokemon name"
          onChange={handleOnChange}
        />
      </FormGroup>
    </Form>
  );
}
