import {Category, MovieCategory} from '../../functional/type/types';

export const TAB_CATEGORIES: Category[] = [
  {
    label: 'Now Playing',
    value: MovieCategory.NOW_PLAYING,
  },
  {
    label: 'Upcoming',
    value: MovieCategory.UPCOMING,
  },
  {
    label: 'Top Rated',
    value: MovieCategory.TOP_RATED,
  },
  {
    label: 'Popular',
    value: MovieCategory.POPULAR,
  },
];
