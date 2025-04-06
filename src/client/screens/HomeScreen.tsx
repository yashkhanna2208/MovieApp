import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {AppToolbar} from '../components/AppToolbar';
import MovieList from '../components/movie/MovieList';
import MovieCategoryTab from '../components/movie/MovieCategoryTab';
import {TabCategory} from '../../functional/type/types';

const HomeScreen: React.FC<any> = () => {
  const [selectedTab, setSelectedTab] = useState(TabCategory.NOW_PLAYING);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styled.container}>
      <AppToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <MovieCategoryTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <MovieList searchQuery={searchQuery} category={selectedTab} />
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
