import 'react-native';
import '@testing-library/jest-native';

import {getComponentWithProviders} from '../../utils/utils';
import {fireEvent, render, screen} from '@testing-library/react-native';
import StorageHelper from '../../../src/functional/storage/StorageHelper';
import {mockedGetMovieResponse} from '../../utils/mocks';
import FavouriteScreen from '../../../src/client/screens/FavouriteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFormattedDate} from '../../../src/functional/utils';
import {mockNavigate} from '../../jest-setup';

const storageHelper = new StorageHelper();
describe('Favourite Movies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
  });

  test('should render empty favourite list', async () => {
    const FavouritePage = getComponentWithProviders(<FavouriteScreen />);
    render(FavouritePage);

    const page = await screen.findByTestId('favourite-page');
    expect(page).toBeVisible();

    const favouriteText = await screen.findByTestId('no-fav-add-text');
    expect(favouriteText).toHaveTextContent('No Favourites Added');
  });

  test('should render favourite movie card', async () => {
    const mockedMovie = mockedGetMovieResponse.results[0];
    await storageHelper.toggleFavourite(mockedMovie);

    const FavouritePage = getComponentWithProviders(<FavouriteScreen />);
    render(FavouritePage);

    const {findByTestId} = screen;

    const page = await findByTestId('favourite-page');
    expect(page).toBeVisible();

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

  test('should navigate to details page if clicked on movie card', async () => {
    const mockedMovie = mockedGetMovieResponse.results[0];
    await storageHelper.toggleFavourite(mockedMovie);

    const FavouritePage = getComponentWithProviders(<FavouriteScreen />);
    render(FavouritePage);

    const {findByTestId} = screen;

    const movieCard = await findByTestId('movie-card-0');
    expect(movieCard).toBeVisible();

    fireEvent.press(movieCard);

    expect(mockNavigate).toHaveBeenCalledWith('MovieDetails', {
      id: mockedMovie.id,
    });
  });
});
