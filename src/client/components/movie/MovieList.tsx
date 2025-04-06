import React, {useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {Movie, TabCategory} from '../../../functional/type/types';
import MovieCard from './MovieCard';
import {useInfiniteQuery} from '@tanstack/react-query';
import apiClient from '../../../functional/apis/api-client';

interface MovieListProps {
  category: TabCategory;
  searchQuery: string;
}

const MovieList: React.FC<MovieListProps> = ({category, searchQuery}) => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['movies', searchQuery, category],
    queryFn: ({pageParam}) => {
      return apiClient.getMovies(category, pageParam, searchQuery);
    },
    initialPageParam: 1,
    getPreviousPageParam: prevPage => {
      return prevPage.page;
    },
    getNextPageParam: nextPage => {
      if (nextPage.page < nextPage.total_pages) {
        return nextPage.page + 1;
      }
    },
  });

  const movies = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.pages.map(page => page.results).flat();
  }, [data]);

  const renderItem = ({item, index}: ListRenderItemInfo<Movie>) => {
    return <MovieCard key={index} movie={item} />;
  };

  return (
    <FlatList
      style={styles.listContainer}
      data={movies}
      renderItem={renderItem}
      numColumns={2}
      onEndReachedThreshold={0.3}
      onEndReached={() => fetchNextPage()}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});

export default MovieList;
