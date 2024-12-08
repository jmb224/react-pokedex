import React from 'react';
import Form from 'react-bootstrap/Form';
import { SearchResults } from './SearchResults';
import debounce from 'debounce';
import { Pokemon } from '../../types';

type SearchBarProps = {
  pokemonDb: Pokemon[];
};

export function SearchBar({ pokemonDb }: SearchBarProps) {
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<typeof pokemonDb>([]);

  const performSearch = debounce((search: string) => {
    const results = pokemonDb.filter(({ name }) => name.includes(search.toLowerCase()));

    setSearchResults(results);
  }, 400);

  function handleOnChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(target.value);
    performSearch(target.value);
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Find your favorite pokemon</Form.Label>
          <Form.Control
            type="text"
            value={searchInput}
            placeholder="Enter pokemon name"
            onChange={handleOnChange}
          />
        </Form.Group>
      </Form>
      {searchInput && <SearchResults searchInput={searchInput} searchResults={searchResults} />}
    </div>
  );
}
