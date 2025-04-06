import axiosClient from './axios-client';
import {ApiResponse, TabCategory} from '../type/types';
import {MovieQueryBuilders} from './query-builders';

class ApiClient {
  public async getMovies(
    category: TabCategory,
    page: number,
    searchQuery: string,
  ): Promise<ApiResponse> {
    const query = new MovieQueryBuilders(category, searchQuery, page).build();
    const {data} = await axiosClient.get(query);
    return data;
  }

  public async getMovieById(id: number) {
    const query = `movie/${id}`;
    const {data} = await axiosClient.get(query);
    return data;
  }
}

const apiClient = new ApiClient();

export default apiClient;
