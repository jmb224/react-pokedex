import styled from 'styled-components';
import { useModal } from '../../hooks';
import { ViewDetailsModal } from '../Modal';
import { Pokemon } from '../../types';

type SearchResultsProps = {
  searchResults: Pokemon[];
};

const StyledPokemonName = styled.span`
  cursor: pointer;
  background-color: none;
  display: block;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #333;
  text-transform: capitalize;
  font-weight: 500;

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

export function SearchResults({ searchResults }: SearchResultsProps) {
  const { name, showCard, setName, toggleModal } = useModal();

  function handleSearchClick(pokemonName: string) {
    setName(pokemonName);
    toggleModal();
  }

  return (
    <>
      {searchResults.length > 0 && (
        <StyledSearchResults>
          {searchResults.map((pokemon) => {
            return (
              <StyledPokemonName key={pokemon.name} onClick={() => handleSearchClick(pokemon.name)}>
                {pokemon.name}
              </StyledPokemonName>
            );
          })}
        </StyledSearchResults>
      )}
      <ViewDetailsModal show={showCard} setShow={toggleModal} pokemonName={name} />
    </>
  );
}
