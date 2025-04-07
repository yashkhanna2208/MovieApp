import React, {useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Movie, TabCategory} from '../../../functional/type/types';
import MovieCard from './MovieCard';
import {useInfiniteQuery} from '@tanstack/react-query';
import apiClient from '../../../functional/apis/api-client';
import {PRIMARY_BLUE} from '../../utils/color';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface MovieListProps {
  category: TabCategory;
  searchQuery: string;
}

const MovieList: React.FC<MovieListProps> = ({category, searchQuery}) => {
  const {data, fetchNextPage, isLoading, error, status} = useInfiniteQuery({
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

  useEffect(() => {
    console.log(error, status);
  }, [error, status]);

  const movies = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.pages.map(page => page.results).flat();
  }, [data]);

  const renderItem = ({item, index}: ListRenderItemInfo<Movie>) => {
    return <MovieCard index={index} key={index} movie={item} />;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      testID="movie-list"
      style={styles.listContainer}
      data={movies}
      renderItem={renderItem}
      numColumns={2}
      onEndReachedThreshold={0.3}
      onEndReached={() => fetchNextPage()}
      ListEmptyComponent={() => (
        <View style={styles.emptyListComponent}>
          <Icon color={PRIMARY_BLUE} name="ban" size={24} />
          <Text testID="empty-movies-list" style={styles.notFoundText}>
            {'No Movies Found'}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListComponent: {
    alignSelf: 'center',
    marginTop: 32,
    flexDirection: 'row',
  },
  notFoundText: {
    fontSize: 18,
    color: PRIMARY_BLUE,
    marginLeft: 12,
  },
});

export default MovieList;
