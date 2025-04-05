import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BASE_COLOR, PRIMARY_BLUE} from '../utils/color';

export const AppToolbar: React.FC = () => {
  return (
    <View style={styles.toolbarContainer}>
      <Text style={styles.title}>{'Movies'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
  },
});
