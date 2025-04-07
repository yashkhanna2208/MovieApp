import 'react-native';
import '@testing-library/jest-native';

import {getComponentWithProviders} from '../../utils/utils';
import {act, fireEvent, render} from '@testing-library/react-native';
import {
  mockedGetMovieResponse,
  mockGetMovieIdResponse,
} from '../../utils/mocks';
import MovieDetails from '../../../src/client/screens/MovieDetails';
import {getFormattedDate} from '../../../src/functional/utils';
import {mockGoBack} from '../../jest-setup';

describe('Movie Details Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render movie details page', async () => {
    mockGetMovieIdResponse();

    const DetailsPage = getComponentWithProviders(<MovieDetails />);

    const {findByTestId} = render(DetailsPage);

    const page = await findByTestId('details-page');
    expect(page).toBeVisible();
  });

  test('should call movie api with proper id', async () => {
    const getRequest = mockGetMovieIdResponse();

    const DetailsPage = getComponentWithProviders(<MovieDetails />);
    render(DetailsPage);

    expect(getRequest).toHaveBeenCalledWith(
      `movie/${mockedGetMovieResponse.results[0].id}`,
    );
  });

  test('should render movie details', async () => {
    const mockedMovie = mockedGetMovieResponse.results[0];
    mockGetMovieIdResponse();

    const DetailsPage = getComponentWithProviders(<MovieDetails />);
    const {findByTestId} = render(DetailsPage);

    const movieTitle = await findByTestId('movie-title');
    expect(movieTitle).toHaveTextContent(mockedMovie.title);

    const ratingLabel = await findByTestId('movie-rating-label');
    expect(ratingLabel).toHaveTextContent('User Rating :');

    const rating = await findByTestId('movie-rating');
    expect(rating).toHaveTextContent(
      `${mockedMovie.vote_average.toFixed(1)}/ 10`,
    );

    const overview = await findByTestId('movie-overview');
    expect(overview).toHaveTextContent(mockedMovie.overview);

    const releaseDate = await findByTestId('movie-release-date');
    expect(releaseDate).toHaveTextContent(
      getFormattedDate(mockedMovie.release_date),
    );

    const poster = await findByTestId('movie-poster');
    expect(poster).toHaveProp('url', mockedMovie.poster_path);

    const backdrop = await findByTestId('movie-backdrop');
    expect(backdrop).toHaveProp('url', mockedMovie.backdrop_path);
  });

  test('should go back when user click back button', async () => {
    mockGetMovieIdResponse();

    const DetailsPage = getComponentWithProviders(<MovieDetails />);
    const {findByTestId} = render(DetailsPage);

    const backButton = await findByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  test('should render add favourite button if movie is not favourite', async () => {
    mockGetMovieIdResponse();

    const DetailsPage = getComponentWithProviders(<MovieDetails />);
    const {findByTestId} = render(DetailsPage);

    const favouriteButton = await findByTestId('add-favourite-button');
    expect(favouriteButton).toHaveTextContent('Add to Favourite');
  });

  test('should toggle favourite button', async () => {
    mockGetMovieIdResponse();

    const DetailsPage = getComponentWithProviders(<MovieDetails />);
    const {findByTestId, queryByTestId} = render(DetailsPage);

    const favouriteButton = await findByTestId('add-favourite-button');
    await act(async () => {
      fireEvent.press(favouriteButton);
    });

    let favButton = queryByTestId('add-favourite-button');
    expect(favButton).toBeFalsy();

    const removeFavouriteButton = await findByTestId('remove-favourite-button');
    expect(removeFavouriteButton).toHaveTextContent('Added to Favourite');

    await act(async () => {
      fireEvent.press(removeFavouriteButton);
    });

    favButton = queryByTestId('add-favourite-button');
    expect(favButton).toBeTruthy();
  });
});
