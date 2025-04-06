import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {PRIMARY_BLUE} from '../utils/color';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StorageHelper from '../../functional/storage/StorageHelper';
import MovieCard from '../components/movie/MovieCard';
import {Movie} from '../../functional/type/types';

const storageHelper = new StorageHelper();
const FavouriteScreen: React.FC = () => {
  const navigation = useNavigation();
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    storageHelper.getFavourites().then(setFavourites);
  }, [isFocus]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon key="back" name="angle-left" size={32} color={PRIMARY_BLUE} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Icon name="film" color={PRIMARY_BLUE} size={24} />
          <Text style={styles.title}>{'Favourites'}</Text>
        </View>
        <View />
      </View>
      <FlatList
        style={styles.listContainer}
        numColumns={2}
        data={favourites}
        renderItem={({item}) => <MovieCard movie={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyListComponent}>
            <Icon color={PRIMARY_BLUE} name="ban" size={24} />
            <Text style={styles.notFoundText}>{'No Favourites Added'}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    marginHorizontal: 12,
  },
  listContainer: {
    marginHorizontal: 5,
    marginTop: 16,
    marginBottom: 12,
  },
  emptyListComponent: {
    alignSelf: 'center',
    marginTop: 64,
    flexDirection: 'row',
  },
  notFoundText: {
    fontSize: 18,
    color: PRIMARY_BLUE,
    marginLeft: 12,
  },
});

export default FavouriteScreen;
