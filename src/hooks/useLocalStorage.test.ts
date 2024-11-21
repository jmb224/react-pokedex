import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = {
    name1: { addedOn: '133492394', height: '23', types: 'normal, flying' }
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with initial value when no localStorage item exists', () => {
    const { result } = renderHook(() => useLocalStorage<typeof initialValue>(key, initialValue));

    const { storedValueLS } = result.current;

    expect(storedValueLS).toEqual(initialValue);
  });

  test('should initialize with value from localStorage if it exists', () => {
    const existingValue = {
      name2: { addedOn: '99999999', height: '30', types: 'fire, flying' }
    };

    localStorage.setItem(key, JSON.stringify(existingValue));

    const { result } = renderHook(() => useLocalStorage<typeof initialValue>(key, initialValue));

    const { storedValueLS } = result.current;

    expect(storedValueLS).toEqual(existingValue);
  });

  test('should add or update an entry in the object', async () => {
    const { result } = renderHook(() => useLocalStorage<typeof initialValue>(key, initialValue));

    const { addOrUpdateEntry } = result.current;

    act(() => {
      addOrUpdateEntry('name2', { addedOn: '99999999', height: '30', types: 'another, and another' });
    });

    const { storedValueLS } = result.current;

    expect(storedValueLS).toEqual({
      ...initialValue,
      name2: { addedOn: '99999999', height: '30', types: 'another, and another' }
    });

    expect(localStorage.getItem(key)).toBe(
      JSON.stringify({
        ...initialValue,
        name2: { addedOn: '99999999', height: '30', types: 'another, and another' }
      })
    );
  });

  test('should remove an entry from the object', () => {
    const { result } = renderHook(() => useLocalStorage<typeof initialValue>(key, initialValue));
    const { removeEntry } = result.current;

    act(() => {
      removeEntry('name1');
    });

    const { storedValueLS } = result.current;

    expect(storedValueLS).toEqual({});
    expect(localStorage.getItem(key)).toBe(JSON.stringify({}));
  });
});
