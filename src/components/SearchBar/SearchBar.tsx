import React from 'react';
import Form from 'react-bootstrap/Form';
import { useGlobalContext } from '../../hooks';
import { SearchResults } from './SearchResults';
import debounce from 'debounce';

export function SearchBar() {
  const { pokemonDb } = useGlobalContext();
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<typeof pokemonDb>([]);

  const performSearch = debounce((search: string) => {
    const results = pokemonDb.filter(({ name }) => name.includes(search.toLowerCase()));

    console.log('Searching...');

    setSearchResults(results);
  }, 400);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);

    performSearch(searchInput);
  };

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
      {searchInput && <SearchResults searchResults={searchResults} />}
    </div>
  );
}
