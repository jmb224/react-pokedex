import React from 'react';

export function useModal() {
  const [name, setName] = React.useState('');
  const [showCard, setShowCard] = React.useState(false);

  function toggleModal() {
    setShowCard((prev) => !prev);
  }

  return { name, showCard, toggleModal, setName };
}
