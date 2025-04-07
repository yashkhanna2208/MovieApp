import 'react-native';
import '@testing-library/jest-native';

import {getComponentWithProviders} from '../../utils/utils';
import {fireEvent, render} from '@testing-library/react-native';
import MovieCard from '../../../src/client/components/movie/MovieCard';
import {mockedGetMovieResponse} from '../../utils/mocks';
import {getFormattedDate} from '../../../src/functional/utils';
import {mockNavigate} from '../../jest-setup';

describe('Movie Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should movie card', async () => {
    const Card = getComponentWithProviders(
      <MovieCard movie={mockedGetMovieResponse.results[0]} index={0} />,
    );

    const {findByTestId} = render(Card);

    const movieCard = await findByTestId('movie-card-0');
    expect(movieCard).toBeTruthy();

    expect(movieCard).toBeVisible();
  });

  test('should render movie details', async () => {
    const mockedMovie = mockedGetMovieResponse.results[0];
    const Card = getComponentWithProviders(
      <MovieCard movie={mockedMovie} index={0} />,
    );

    const {findByTestId} = render(Card);

    const movieCard = await findByTestId('movie-card-0');
    expect(movieCard).toBeVisible();

    const movieTitle = await findByTestId('movie-title-0');
    expect(movieTitle).toHaveTextContent(mockedMovie.title);

    const movieRating = await findByTestId('movie-rating-0');
    expect(movieRating).toHaveTextContent(mockedMovie.vote_average.toFixed(1));

    const movieReleaseDate = await findByTestId('movie-release-date-0');
    expect(movieReleaseDate).toHaveTextContent(
      getFormattedDate(mockedMovie.release_date),
    );
  });

  test('should navigate to movie details page when clicked on card', async () => {
    const mockedMovie = mockedGetMovieResponse.results[0];
    const Card = getComponentWithProviders(
      <MovieCard movie={mockedMovie} index={0} />,
    );

    const {findByTestId} = render(Card);

    const movieCard = await findByTestId('movie-card-0');
    expect(movieCard).toBeVisible();

    fireEvent.press(movieCard);

    expect(mockNavigate).toHaveBeenCalledWith('MovieDetails', {
      id: mockedMovie.id,
    });
  });
});
