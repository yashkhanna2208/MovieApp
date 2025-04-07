import 'react-native';
import '@testing-library/jest-native';

import {getComponentWithProviders} from '../../utils/utils';
import {act, fireEvent, render} from '@testing-library/react-native';
import MovieList from '../../../src/client/components/movie/MovieList';
import {TabCategory} from '../../../src/functional/type/types';
import {mockedGetMovieResponse, mockGetMovieResponse} from '../../utils/mocks';

describe('Movie List', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render empty movie list', async () => {
    mockGetMovieResponse();

    const List = getComponentWithProviders(
      <MovieList category={TabCategory.UPCOMING} searchQuery={''} />,
    );

    const {findByTestId} = render(List);

    const EmptyTitle = await findByTestId('empty-movies-list');
    expect(EmptyTitle).toBeTruthy();

    expect(EmptyTitle).toHaveTextContent('No Movies Found');
  });

  test('should render movie cards', async () => {
    mockGetMovieResponse(mockedGetMovieResponse.results);

    const List = getComponentWithProviders(
      <MovieList category={TabCategory.UPCOMING} searchQuery={''} />,
    );

    const {findByTestId} = render(List);

    const MovieCard = await findByTestId('movie-card-0');
    expect(MovieCard).toBeVisible();
  });

  test('should call movies api according to category', async () => {
    const mockdeRequest = mockGetMovieResponse(mockedGetMovieResponse.results);

    const List = getComponentWithProviders(
      <MovieList category={TabCategory.UPCOMING} searchQuery={''} />,
    );

    render(List);

    expect(mockdeRequest).toBeCalledWith(TabCategory.UPCOMING, 1, '');
  });

  test('should call pagination api', async () => {
    const mockedRequest = mockGetMovieResponse(mockedGetMovieResponse.results);

    const List = getComponentWithProviders(
      <MovieList category={TabCategory.UPCOMING} searchQuery={''} />,
    );

    const {findByTestId} = render(List);

    const moviesFlatList = await findByTestId('movie-list');

    expect(mockedRequest).toBeCalledWith(TabCategory.UPCOMING, 1, '');

    act(async () => {
      fireEvent(moviesFlatList, 'onEndReached');
    });

    expect(mockedRequest).toBeCalledWith(TabCategory.UPCOMING, 2, '');
  });
});
