import axiosClient from './axios-client';
import {MovieCategory} from '../type/types';

class ApiClient {
  public async getMovies(category: MovieCategory, page: number) {
    const query = `movie/${category}?language=en-US&page=${page}`;
    const {data} = await axiosClient.get(query);
    return data;
  }
}

const apiClient = new ApiClient();

export default apiClient;
