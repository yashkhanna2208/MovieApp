import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
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
import AwesomeIcon from 'react-native-vector-icons/FontAwesome6';

import {BASE_COLOR, PRIMARY_BLUE, WHITE} from '../utils/color';
import {Movie} from '../../functional/type/types';
import {getFormattedDate} from '../../functional/utils';
import StorageHelper from '../../functional/storage/StorageHelper';

interface RouteData extends RouteProp<ParamListBase> {
  params: {
    id: number;
  };
}

const storageHelper = new StorageHelper();

const MovieDetails: React.FC = () => {
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const {params} = useRoute<RouteData>();
  const id = params?.id;

  const {data, isLoading} = useQuery({
    queryKey: ['movieById', id],
    queryFn: (): Promise<Movie> => {
      return apiClient.getMovieById(id);
    },
  });

  useEffect(() => {
    storageHelper.getIsFavourite(id).then(setIsFavorite);
  }, [id]);

  const toggleFavourite = useCallback(() => {
    if (!data) {
      return;
    }

    storageHelper.toggleFavourite(data).then(setIsFavorite);
  }, [data, setIsFavorite]);

  const FavouriteButton = useMemo(() => {
    if (!data) {
      return <></>;
    }

    if (isFavorite) {
      return (
        <TouchableOpacity
          testID="remove-favourite-button"
          onPress={toggleFavourite}
          style={styles.favouriteButton}>
          <Icon name={'heart'} color={PRIMARY_BLUE} size={24} />
          <Text style={styles.buttonText}>{'Added to Favourite'}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        testID="add-favourite-button"
        onPress={toggleFavourite}
        style={styles.favouriteButton}>
        <AwesomeIcon color={PRIMARY_BLUE} name={'heart'} size={24} />
        <Text style={styles.buttonText}>{'Add to Favourite'}</Text>
      </TouchableOpacity>
    );
  }, [data, isFavorite, toggleFavourite]);

  if (isLoading || !data) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  const rating = data.vote_average.toFixed(1);

  return (
    <SafeAreaView testID="details-page" style={styles.container}>
      <MovieImage
        testID="movie-backdrop"
        style={styles.backdrop}
        url={data.backdrop_path}
      />
      <View style={styles.topContainer}>
        <TouchableOpacity
          testID="back-button"
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon key="back" name="angle-left" size={32} color={BASE_COLOR} />
        </TouchableOpacity>
        <View style={styles.header}>
          <MovieImage
            testID="movie-poster"
            style={styles.poster}
            url={data.poster_path}
          />
          <View style={styles.titleContainer}>
            <Text
              testID="movie-title"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.title}>
              {data.title}
            </Text>
            <Text testID="movie-release-date" style={styles.value}>
              {getFormattedDate(data.release_date)}
            </Text>
          </View>
        </View>
        <View />
        <View style={styles.detailsContainer}>
          <View style={styles.userRatingContainer}>
            <Text testID="movie-rating-label" style={styles.label}>
              {'User Rating : '}
            </Text>
            <Text
              testID="movie-rating"
              style={styles.rating}>{`${rating}/ 10`}</Text>
            <Icon name="star" size={24} color={PRIMARY_BLUE} />
          </View>
          <Text style={styles.label}>{'Overview'}</Text>
          <Text testID="movie-overview" style={styles.value}>
            {data.overview}
          </Text>
        </View>
      </View>
      {FavouriteButton}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'space-between',
  },
  topContainer: {
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
    marginLeft: 24,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  titleContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    overflow: 'hidden',
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
  favouriteButton: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderColor: PRIMARY_BLUE,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    backgroundColor: WHITE,
    color: PRIMARY_BLUE,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: PRIMARY_BLUE,
    fontWeight: '500',
    alignSelf: 'center',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MovieDetails;
