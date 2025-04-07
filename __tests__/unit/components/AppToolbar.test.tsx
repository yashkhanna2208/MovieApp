import 'react-native';
import '@testing-library/jest-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import {AppToolbar} from '../../../src/client/components/AppToolbar';
import {getComponentWithProviders} from '../../utils/utils';
import {mockNavigate} from '../../jest-setup';

describe('App', () => {
  const setSearchQuery = jest.fn();

  beforeEach(() => {
    const ToolBar = getComponentWithProviders(
      <AppToolbar searchQuery={''} setSearchQuery={setSearchQuery} />,
    );

    render(ToolBar);
  });

  test('should render the app toolbar with title', async () => {
    const headerTitle = await screen.findByTestId('header-title');

    expect(headerTitle).toHaveTextContent('Movies');
  });

  test('should render searchbar only when clicked on search button', async () => {
    const headerTitle = await screen.findByTestId('search-button');
    let searchInput = screen.queryByTestId('search-input');

    expect(headerTitle).toBeVisible();
    expect(searchInput).toBeFalsy();

    fireEvent.press(headerTitle);

    searchInput = screen.queryByTestId('search-input');

    expect(searchInput).toBeVisible();
  });

  test('should update search input values', async () => {
    const searchButton = await screen.findByTestId('search-button');

    fireEvent.press(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();

    fireEvent.changeText(searchInput, 'Fast 5');
    expect(setSearchQuery).toBeCalledWith('Fast 5');
  });

  test('should clear and hide search input if click on clear button', async () => {
    const searchButton = await screen.findByTestId('search-button');

    fireEvent.press(searchButton);

    let searchInput = screen.queryByTestId('search-input');
    expect(searchInput).toBeVisible();

    const clearButton = await screen.findByTestId('clear-search-button');
    expect(clearButton).toBeVisible();
    fireEvent.press(clearButton);

    searchInput = screen.queryByTestId('search-input');
    expect(searchInput).toBeFalsy();

    expect(setSearchQuery).toBeCalledWith('');
  });

  test('should navigate to favourites when clicked on favourite button', async () => {
    const favouriteButton = await screen.findByTestId('favourite-button');

    expect(favouriteButton).toBeVisible();

    fireEvent.press(favouriteButton);
    expect(mockNavigate).toHaveBeenCalledWith('Favourites');
  });
});
