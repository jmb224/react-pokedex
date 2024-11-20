import React from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { SearchResults } from './SearchResults';
import { useGlobalContext } from '../../hooks';

export function SearchBar() {
  const [searchInput, setSearchInput] = React.useState('');
  const { realTimeSearch, searchResult } = useGlobalContext();

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);

    realTimeSearch(searchInput);
  }

  return (
    <div>
      <Form>
        <FormGroup className="mb-3" controlId="formBasicEmail">
          <FormLabel>Find your favorite pokemon</FormLabel>
          <FormControl
            type="text"
            value={searchInput}
            placeholder="Enter pokemon name"
            onChange={handleOnChange}
          />
        </FormGroup>
      </Form>
      {searchInput && <SearchResults searchResults={searchResult} />}
    </div>
  );
}
