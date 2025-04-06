import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import apiClient from '../../functional/apis/api-client';
import type {RouteProp} from '@react-navigation/core/src/types';
import MovieImage from '../components/common/MovieImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BASE_COLOR, PRIMARY_BLUE} from '../utils/color';
import {Movie} from '../../functional/type/types';
import {getFormattedDate} from '../../functional/utils';

interface RouteData extends RouteProp<ParamListBase> {
  params: {
    id: number;
  };
}

const MovieDetails: React.FC = () => {
  const navigation = useNavigation();
  const {params} = useRoute<RouteData>();
  const id = params?.id;

  const {data, isLoading} = useQuery({
    queryKey: ['movieById', id],
    queryFn: (): Promise<Movie> => {
      return apiClient.getMovieById(id);
    },
  });

  if (isLoading || !data) {
    return <></>;
  }

  const rating = data.vote_average.toFixed(1);

  return (
    <SafeAreaView style={styles.container}>
      <MovieImage style={styles.backdrop} url={data.backdrop_path} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon key="back" name="angle-left" size={32} color={BASE_COLOR} />
      </TouchableOpacity>
      <View style={styles.header}>
        <MovieImage style={styles.poster} url={data.poster_path} />
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {data.title}
          </Text>
          <Text style={styles.value}>
            {getFormattedDate(data.release_date)}
          </Text>
        </View>
      </View>
      <View />
      <View style={styles.detailsContainer}>
        <View style={styles.userRatingContainer}>
          <Text style={styles.label}>{'User Rating : '}</Text>
          <Text style={styles.rating}>{`${rating}/ 10`}</Text>
          <Icon name="star" size={24} color={PRIMARY_BLUE} />
        </View>
        <Text style={styles.label}>{'Overview'}</Text>
        <Text style={styles.value}>{data.overview}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'absolute',
    top: 0,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: 12,
    flexDirection: 'row',
  },
  poster: {
    height: 160,
    aspectRatio: 3 / 4,
    marginHorizontal: 24,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  titleContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  detailsContainer: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
  userRatingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    fontWeight: '400',
  },
  rating: {
    fontSize: 14,
    fontWeight: '400',
    marginRight: 8,
    alignSelf: 'center',
  },
});

export default MovieDetails;
