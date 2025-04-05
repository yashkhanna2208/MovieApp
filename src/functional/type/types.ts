export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface Category {
  label: string;
  value: MovieCategory;
}

export type DateRange = {
  maximum: string;
  minimum: string;
};

export enum MovieCategory {
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
}

export type ApiResponse = {
  dates: DateRange;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
