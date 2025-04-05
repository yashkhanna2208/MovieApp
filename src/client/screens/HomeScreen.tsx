import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AppToolbar} from '../components/AppToolbar';
import {BASE_COLOR} from '../utils/color';

const HomeScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={styled.container}>
      <AppToolbar />
    </SafeAreaView>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLOR,
  },
});

export default HomeScreen;
