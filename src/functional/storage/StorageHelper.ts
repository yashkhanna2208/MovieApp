import AsyncStorage from '@react-native-async-storage/async-storage';
import {Movie} from '../type/types';

const STORAGE_KEY = 'FAVOURITE_MOVIES';

class StorageHelper {
  public async getFavourites(): Promise<Movie[]> {
    const movieList = await AsyncStorage.getItem(STORAGE_KEY);
    if (!movieList) {
      return [];
    }

    return JSON.parse(movieList) as Movie[];
  }

  public async getIsFavourite(movieId: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    const movie = favourites.find(favourite => favourite.id === movieId);

    return !!movie;
  }

  public async toggleFavourite(movie: Movie): Promise<boolean> {
    console.log(movie);

    const favorites = await this.getFavourites();
    const isFavourite = await this.getIsFavourite(movie.id);

    if (isFavourite) {
      const updatedFavourites = [...favorites].filter(
        item => item.id !== movie.id,
      );
      this.updateFavourites(updatedFavourites);
      return false;
    }

    this.updateFavourites([...favorites, movie]);
    return true;
  }

  private updateFavourites(movies: Movie[]) {
    const updatedFavourites = JSON.stringify(movies);
    AsyncStorage.setItem(STORAGE_KEY, updatedFavourites).then();
  }
}

export default StorageHelper;
