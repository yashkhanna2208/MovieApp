import 'react-native';
import '@testing-library/jest-native';

import {getComponentWithProviders} from '../../utils/utils';
import {act, fireEvent, render, screen} from '@testing-library/react-native';

import {mockedGetMovieResponse, mockGetAxiosResponse} from '../../utils/mocks';
import HomeScreen from '../../../src/client/screens/HomeScreen';

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call search Api', async () => {
    const getRequest = mockGetAxiosResponse();

    const Home = getComponentWithProviders(<HomeScreen />);
    render(Home);

    expect(getRequest).toHaveBeenCalledWith(
      'movie/now_playing?language=en-US&page=1',
    );

    const searchButton = await screen.findByTestId('search-button');

    fireEvent.press(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();

    fireEvent.changeText(searchInput, 'Fast 5');

    expect(getRequest).toHaveBeenCalledWith(
      'search/movie?query=Fast 5&language=en-US&page=1',
    );
  });

  test('should call api call with pagination', async () => {
    const getRequest = mockGetAxiosResponse(mockedGetMovieResponse.results);

    const Home = getComponentWithProviders(<HomeScreen />);
    render(Home);

    expect(getRequest).toHaveBeenCalledWith(
      'movie/now_playing?language=en-US&page=1',
    );

    const searchButton = await screen.findByTestId('search-button');

    fireEvent.press(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();

    fireEvent.changeText(searchInput, 'Fast 5');

    expect(getRequest).toHaveBeenCalledWith(
      'search/movie?query=Fast 5&language=en-US&page=1',
    );

    const moviesFlatList = await screen.findByTestId('movie-list');

    act(async () => {
      fireEvent(moviesFlatList, 'onEndReached');
    });

    expect(getRequest).toHaveBeenCalledWith(
      'search/movie?query=Fast 5&language=en-US&page=2',
    );
  });
});
