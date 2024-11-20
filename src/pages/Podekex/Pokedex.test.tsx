import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { useLocalStorage } from '../../hooks';
import { render } from '../../tests';
import { Pokedex } from './Pokedex';
import userEvent from '@testing-library/user-event';

// Mock the useLocalStorage hook
jest.mock('../../hooks', () => ({
  useLocalStorage: jest.fn()
}));

// Mock the navigate function from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Pokedex', () => {
  const mockLocalStorageData = {
    pikachu: { addedOn: Date.now(), height: '4', types: 'electric' },
    bulbasaur: { addedOn: Date.now(), height: '7', types: 'grass, poison' }
  };

  const renderComponent = () => render(<Pokedex />);

  beforeEach(() => {
    (useLocalStorage as jest.Mock).mockReturnValue([mockLocalStorageData, jest.fn(), jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Toolbar', () => {
    test('should render toolbar and its buttons', () => {
      renderComponent();

      const toolbar = screen.getByRole('toolbar', { name: /toolbar/i });

      expect(toolbar).toBeVisible();

      const [exportButton, viewButton, deleteButton] = within(toolbar).getAllByRole('button');

      // Check Toolbar buttons
      expect(exportButton).toBeEnabled();
      expect(viewButton).toBeDisabled();
      expect(deleteButton).toBeDisabled();
    });

    test('selects and deletes a Pokémon', () => {
      const mockRemoveEntry = jest.fn();

      (useLocalStorage as jest.Mock).mockReturnValue([mockLocalStorageData, jest.fn(), mockRemoveEntry]);

      renderComponent();

      // Select Pikachu
      const pikachuCheckbox = screen.getAllByRole('checkbox')[1]; // 1st row checkbox

      fireEvent.click(pikachuCheckbox);

      // Click Delete
      const deleteButton = screen.getByText(/delete pokemon/i);

      fireEvent.click(deleteButton);

      // Assert deletion
      expect(mockRemoveEntry).toHaveBeenCalledWith('pikachu');
      expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
    });

    test('exports Pokémon data', () => {
      renderComponent();

      const exportButton = screen.getByText(/export pokemon data/i);
      const createElementSpy = jest.spyOn(document, 'createElement');
      const clickSpy = jest.fn();

      createElementSpy.mockReturnValue({
        href: '',
        click: clickSpy,
        setAttribute: jest.fn()
      } as unknown as HTMLAnchorElement);

      fireEvent.click(exportButton);

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(clickSpy).toHaveBeenCalled();
    });

    test('navigates to Pokémon details', () => {
      renderComponent();

      // Select Pikachu
      const pikachuCheckbox = screen.getAllByRole('checkbox')[1]; // 1st row checkbox

      fireEvent.click(pikachuCheckbox);

      // Click View Details
      const viewDetailsButton = screen.getByText(/view pokemon details/i);

      fireEvent.click(viewDetailsButton);

      expect(mockNavigate).toHaveBeenCalledWith('pikachu');
    });
  });

  describe('Table', () => {
    test('renders Pokedex Table components', () => {
      renderComponent();

      const table = screen.getByRole('table', { name: 'pokedex' });
      expect(table).toBeVisible();

      // Check Table headers
      const [, name, height, types, date] = within(table).getAllByRole('columnheader');

      expect(within(name).getByText(/name/i)).toBeInTheDocument();
      expect(within(height).getByText(/height/i)).toBeInTheDocument();
      expect(within(types).getByText(/types/i)).toBeInTheDocument();
      expect(within(date).getByText(/date/i)).toBeInTheDocument();
    });

    test('sorts the table by name ascending', async () => {
      renderComponent();

      const nameHeader = screen.getByText(/name/i);

      // Sort ascending
      userEvent.click(nameHeader);

      const [, firstRow] = screen.getAllByRole('row');

      expect(firstRow).toHaveTextContent('bulbasaur');

      userEvent.click(nameHeader);

      await waitFor(() => {
        const [, , secondRow] = screen.getAllByRole('row');

        expect(secondRow).toHaveTextContent('pikachu');
      });
    });

    test('sorts the table by name descending', async () => {
      renderComponent();

      const nameHeader = screen.getByText(/name/i);

      // Sort ascending
      userEvent.dblClick(nameHeader);

      await waitFor(() => {
        const [, , secondRow] = screen.getAllByRole('row');

        expect(secondRow).toHaveTextContent('bulbasaur');
      });
    });
  });
});
