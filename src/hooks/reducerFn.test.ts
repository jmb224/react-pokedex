import { GlobalState } from '../types';
import { ActionType, reducerFn } from './reducerFn';

describe('reducerFn', () => {
  let initialState: GlobalState;

  beforeEach(() => {
    initialState = Object.create({});
  });

  test('should handle Loading action and set isLoadingData to true', () => {
    const action = { type: ActionType.Loading };
    const newState = reducerFn(initialState, action);

    expect(newState.isLoadingData).toBe(true);
  });

  test('should handle GetPokemonData action and update allPokemons', () => {
    const action = { type: ActionType.GetPokemonData, payload: [{ name: 'Pikachu' }] };
    const newState = reducerFn(initialState, action);

    expect(newState.isLoadingData).toBe(false);
    expect(newState.allPokemons).toEqual([{ name: 'Pikachu' }]);
  });

  test('should handle GetPokemon action and update pokemon', () => {
    const action = { type: ActionType.GetPokemon, payload: { name: 'Pikachu', id: 25 } };
    const newState = reducerFn(initialState, action);

    expect(newState.isLoadingData).toBe(false);
    expect(newState.pokemon).toEqual({ name: 'Pikachu', id: 25 });
  });

  test('should handle GetAllPokemonFromDb action and update pokemonDb', () => {
    const action = { type: ActionType.GetAllPokemonFromDb, payload: [{ name: 'Pikachu' }] };
    const newState = reducerFn(initialState, action);

    expect(newState.isLoadingData).toBe(false);
    expect(newState.pokemonDb).toEqual([{ name: 'Pikachu' }]);
  });

  test('should handle Search action and update searchResult', () => {
    const action = { type: ActionType.Search, payload: [{ name: 'Pikachu' }] };
    const newState = reducerFn(initialState, action);

    expect(newState.isLoadingData).toBe(false);
    expect(newState.searchResult).toEqual([{ name: 'Pikachu' }]);
  });

  test('should return the same state if the action type is not matched', () => {
    const action = { type: 'UNKNOWN_ACTION' as unknown as ActionType }; // action type not in enum
    const newState = reducerFn(initialState, action);

    expect(newState).toEqual(initialState); // state should remain the same
  });
});
