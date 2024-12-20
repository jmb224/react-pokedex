import React from 'react';
import { useClickOutside, useModal } from '../../hooks';
import { Pokemon } from '../../types';
import { ViewDetailsModal } from '../Modal';
import { StyledPokemonName, StyledSearchResults } from './SearchResult.styled';

type SearchResultsProps = {
  searchInput: string;
  searchResults: Pokemon[];
};

export function SearchResults({ searchInput, searchResults }: SearchResultsProps) {
  const { name, showCard, setName, toggleModal } = useModal();
  const [showResults, setShowResults] = React.useState(true);
  const modalRef = React.useRef(null);

  useClickOutside(modalRef, () => setShowResults(false));

  function handleSearchClick(pokemonName: string) {
    setName(pokemonName);
    toggleModal();
    setShowResults(false);
  }

  React.useEffect(() => {
    setShowResults(true);
  }, [searchInput]);

  return (
    <>
      {searchResults.length > 0 && showResults && (
        <StyledSearchResults ref={modalRef}>
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
