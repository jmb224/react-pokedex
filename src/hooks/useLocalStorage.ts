import React from 'react';

export function useLocalStorage<T extends Record<string, object>>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
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
      const updatedValue = { ...storedValue, [entryKey]: entryValue };

      setStoredValue(updatedValue);

      localStorage.setItem(key, JSON.stringify(updatedValue));
    } catch (error) {
      console.error('Error adding/updating entry in localStorage', error);
    }
  }

  // Remove an entry from the data object by key
  function removeEntry(entryKey: string) {
    try {
      const { [entryKey]: _, ...remaining } = storedValue;

      setStoredValue(remaining as T);

      localStorage.setItem(key, JSON.stringify(remaining));
    } catch (error) {
      console.error('Error removing entry from localStorage', error);
    }
  }

  return [storedValue, addOrUpdateEntry, removeEntry] as const;
}
