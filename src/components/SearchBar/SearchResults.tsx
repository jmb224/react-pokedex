import { useModal } from '../../hooks';
import { Pokemon } from '../../types';
import { ViewDetailsModal } from '../Modal';
import { StyledPokemonName, StyledSearchResults } from './SearchResult.styled';

type SearchResultsProps = {
  searchResults: Pokemon[];
};

export function SearchResults({ searchResults }: SearchResultsProps) {
  const { name, showCard, setName, toggleModal } = useModal();

  function handleSearchClick(pokemonName: string) {
    setName(pokemonName);
    toggleModal();
  }

  return (
    <>
      <StyledSearchResults>
        {searchResults?.map((pokemon) => {
          return (
            <StyledPokemonName key={pokemon.name} onClick={() => handleSearchClick(pokemon.name)}>
              {pokemon.name}
            </StyledPokemonName>
          );
        })}
      </StyledSearchResults>
      <ViewDetailsModal show={showCard} setShow={toggleModal} pokemonName={name} />
    </>
  );
}
