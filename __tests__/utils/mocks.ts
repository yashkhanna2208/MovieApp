import apiClient from '../../src/functional/apis/api-client';
import {Movie} from '../../src/functional/type/types';
import axiosClient from '../../src/functional/apis/axios-client';

export const mockedGetMovieResponse = {
  dates: {
    maximum: '2025-04-09',
    minimum: '2025-02-26',
  },
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg',
      genre_ids: [10751, 35, 12, 14],
      id: 950387,
      original_language: 'en',
      original_title: 'A Minecraft Movie',
      overview:
        "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
      popularity: 878.5405,
      poster_path: '/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg',
      release_date: '2025-03-31',
      title: 'A Minecraft Movie',
      video: false,
      vote_average: 6,
      vote_count: 204,
    },
    {
      adult: false,
      backdrop_path: '/is9bmV6uYXu7LjZGJczxrjJDlv8.jpg',
      genre_ids: [28, 12],
      id: 1229730,
      original_language: 'fr',
      original_title: 'Carjackers',
      overview:
        "By day, they're invisible—valets, hostesses, and bartenders at a luxury hotel. By night, they're the Carjackers, a crew of skilled drivers who track and rob wealthy clients on the road. As they plan their ultimate heist, the hotel director hires a ruthless hitman, to stop them at all costs. With danger closing in, can Nora, Zoe, Steve, and Prestance pull off their biggest score yet?",
      popularity: 375.5975,
      poster_path: '/wbkPMTz2vVai7Ujyp0ag7AM9SrO.jpg',
      release_date: '2025-03-27',
      title: 'Carjackers',
      video: false,
      vote_average: 7.057,
      vote_count: 61,
    },
  ],
  total_pages: 250,
  total_results: 4990,
};

export const mockGetAxiosResponse = (results: Movie[] = []) => {
  return jest.spyOn(axiosClient, 'get').mockResolvedValue({
    data: {...mockedGetMovieResponse, results},
  });
};

export const mockGetMovieResponse = (results: Movie[] = []) => {
  return jest
    .spyOn(apiClient, 'getMovies')
    .mockResolvedValue({...mockedGetMovieResponse, results});
};

export const mockGetMovieIdResponse = () => {
  return jest.spyOn(axiosClient, 'get').mockResolvedValue({
    data: {...mockedGetMovieResponse.results[0]},
  });
};
