import React, {useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {Movie, MovieCategory} from '../../../functional/type/types';
import MovieCard from './MovieCard';
import {useInfiniteQuery} from '@tanstack/react-query';
import apiClient from '../../../functional/apis/api-client';

interface MovieListProps {
  category: MovieCategory;
}

const MovieList: React.FC<MovieListProps> = ({category}) => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['movie', category],
    queryFn: ({pageParam}) => {
      return apiClient.getMovies(category, pageParam);
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
