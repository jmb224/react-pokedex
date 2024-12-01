import React from 'react';

const key = 'mypokemon';

export function useLocalStorage<T extends Record<string, object>>(initialValue: T) {
  const [storedValueLS, setStoredValueLS] = React.useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage', error);

      return initialValue;
    }
  });

  // Add or update an entry in the data object
  function addOrUpdateEntry(entryKey: string, entryValue: T[string]) {
    try {
      const updatedValue = { ...storedValueLS, [entryKey]: entryValue };

      setStoredValueLS(updatedValue);

      localStorage.setItem(key, JSON.stringify(updatedValue));
    } catch (error) {
      console.error('Error adding/updating entry in localStorage', error);
    }
  }

  // Remove an entry from the data object by key
  function removeEntry(entryKey: string) {
    try {
      setStoredValueLS((prev) => {
        const { [entryKey]: _, ...remaining } = prev;

        delete prev[entryKey];

        localStorage.setItem(key, JSON.stringify(remaining));

        return remaining as T;
      });
    } catch (error) {
      console.error('Error removing entry from localStorage', error);
    }
  }

  return { storedValueLS, addOrUpdateEntry, removeEntry };
}
