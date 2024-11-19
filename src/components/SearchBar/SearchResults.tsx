import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Pokemon } from '../../types';

type SearchResultsProps = {
  searchResults: Pick<Pokemon, 'id' | 'name'>[];
};

const StyledPokemonName = styled.span`
  cursor: pointer;
  background-color: none;
  display: block;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #333;
  text-transform: capitalize;

  &:hover {
    color: #7263f3;
    background-color: #f0f0f0;
  }
`;

const StyledSearchResults = styled.div`
  position: relative;
  max-height: 15rem;
  overflow: auto;
  z-index: 2;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: white;
  box-shadow: 0.2rem 0.25rem 0.9rem rgba(0, 0, 0, 0.2);
`;

export function SearchResults({ searchResults: searchResult }: SearchResultsProps) {
  const navigate = useNavigate();

  function handleSearchClick(pokemonName: string) {
    navigate(`pokemon/${pokemonName}`);
  }

  return (
    <>
      {searchResult.length > 0 && (
        <StyledSearchResults>
          {searchResult.map((pokemon) => {
            return (
              <StyledPokemonName key={pokemon.name} onClick={() => handleSearchClick(pokemon.name)}>
                {pokemon.name}
              </StyledPokemonName>
            );
          })}
        </StyledSearchResults>
      )}
    </>
  );
}
