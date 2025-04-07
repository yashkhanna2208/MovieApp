import 'react-native';
import '@testing-library/jest-native';

import {getComponentWithProviders} from '../../utils/utils';
import {act, fireEvent, render, screen} from '@testing-library/react-native';

import {mockGetMovieResponse} from '../../utils/mocks';
import HomeScreen from '../../../src/client/screens/HomeScreen';
import {TabCategory} from '../../../src/functional/type/types';

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call search Api', async () => {
    const getRequest = mockGetMovieResponse();

    const Home = getComponentWithProviders(<HomeScreen />);
    render(Home);

    const searchButton = await screen.findByTestId('search-button');

    fireEvent.press(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();

    fireEvent.changeText(searchInput, 'Fast 5');

    expect(getRequest).toHaveBeenCalledWith('now_playing', 1, 'Fast 5');
  });

  test('should call api call with pagination', async () => {
    const getRequest = mockGetMovieResponse();

    const Home = getComponentWithProviders(<HomeScreen />);
    render(Home);

    const searchButton = await screen.findByTestId('search-button');

    fireEvent.press(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();

    fireEvent.changeText(searchInput, 'Fast 5');

    expect(getRequest).toHaveBeenCalledWith(
      TabCategory.NOW_PLAYING,
      1,
      'Fast 5',
    );

    const moviesFlatList = await screen.findByTestId('movie-list');

    act(async () => {
      fireEvent(moviesFlatList, 'onEndReached');
    });

    expect(getRequest).toBeCalledWith(TabCategory.NOW_PLAYING, 2, 'Fast 5');
  });
});
