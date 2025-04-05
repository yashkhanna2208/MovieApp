import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {AppToolbar} from '../components/AppToolbar';
import MovieList from '../components/movie/MovieList';
import MovieCategoryTab from '../components/movie/MovieCategoryTab';
import {MovieCategory} from '../../functional/type/types';

const HomeScreen: React.FC<any> = () => {
  const [selectedTab, setSelectedTab] = useState(MovieCategory.NOW_PLAYING);

  return (
    <SafeAreaView style={styled.container}>
      <AppToolbar />
      <MovieCategoryTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <MovieList category={selectedTab} />
    </SafeAreaView>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
