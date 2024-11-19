export type Pokemon = {
  id: string;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: { front_default: string };
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
  types: [
    {
      type: { name: string };
    }
  ];
  weight: number;
  height: number;
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
      };
    }
  ];
};
