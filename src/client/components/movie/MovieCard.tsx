import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Movie} from '../../../functional/type/types';
import MovieImage from '../common/MovieImage';
import {getFormattedDate} from '../../../functional/utils';
import {PRIMARY_BLUE} from '../../utils/color';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackName, RootStackType} from '../../navigation/RootNavigation';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  const navigation = useNavigation<NavigationProp<RootStackType, 'Home'>>();

  const releaseDate = getFormattedDate(movie.release_date);
  const rating = movie.vote_average.toFixed(1);

  const onPressMovie = () => {
    navigation.navigate(RootStackName.MOVIE_DETAILS, {
      id: movie.id,
    });
  };

  return (
    <TouchableOpacity onPress={onPressMovie} style={styles.cardContainer}>
      <MovieImage style={styles.poster} url={movie.poster_path} />
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {movie.title}
      </Text>
      <Text style={styles.date}>{releaseDate}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1 / 2,
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: 5,
    marginBottom: 12,
  },
  poster: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: 'grey',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#ODODOD',
    fontWeight: '400',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '300',
  },
  ratingContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: PRIMARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 8,
  },
  rating: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
