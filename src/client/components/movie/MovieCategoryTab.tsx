import React, {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabCategory} from '../../../functional/type/types';
import {TAB_CATEGORIES} from '../../utils/constants';
import {PRIMARY_BLUE, WHITE} from '../../utils/color';

interface MovieCategoryTabProps {
  setSelectedTab: React.Dispatch<TabCategory>;
  selectedTab: TabCategory;
}

const MovieCategoryTab: React.FC<MovieCategoryTabProps> = props => {
  const {selectedTab, setSelectedTab} = props;

  const getTabStyles = useCallback(
    (category: TabCategory) => {
      const selected = selectedTab === category;

      if (selected) {
        return {label: styles.selectedTitle, tab: styles.selectedTab};
      }

      return {label: styles.title, tab: {}};
    },
    [selectedTab],
  );

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {TAB_CATEGORIES.map(category => {
          const tabStyle = getTabStyles(category.value);

          return (
            <TouchableOpacity
              key={category.value}
              onPress={() => setSelectedTab(category.value)}
              style={[styles.tab, tabStyle.tab]}>
              <Text style={tabStyle.label}>{category.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieCategoryTab;

const styles = StyleSheet.create({
  container: {
    height: 35,
    marginBottom: 16,
    marginRight: 16,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PRIMARY_BLUE,
    marginLeft: 12,
    paddingHorizontal: 12,
  },
  selectedTab: {
    backgroundColor: PRIMARY_BLUE,
  },
  title: {
    fontSize: 14,
    color: PRIMARY_BLUE,
  },
  selectedTitle: {
    fontSize: 14,
    color: WHITE,
  },
});
