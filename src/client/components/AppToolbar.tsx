import React, {Dispatch, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PRIMARY_BLUE} from '../utils/color';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackType} from '../navigation/RootNavigation';

interface AppToolbarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<string>;
}

export const AppToolbar: React.FC<AppToolbarProps> = props => {
  const navigation = useNavigation<NavigationProp<RootStackType, 'Home'>>();
  const {searchQuery, setSearchQuery} = props;
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const SearchInput = useMemo(() => {
    if (!isSearchEnabled) {
      return null;
    }

    return (
      <View style={styles.searchContainer}>
        <TextInput
          testID="search-input"
          onChangeText={setSearchQuery}
          value={searchQuery}
          autoFocus={true}
          style={styles.searchInput}
        />
        <TouchableOpacity
          testID="clear-search-button"
          onPress={() => {
            setSearchQuery('');
            setIsSearchEnabled(false);
          }}
          style={styles.clearIcon}>
          <Icon size={24} name="xmark" color={PRIMARY_BLUE} />
        </TouchableOpacity>
      </View>
    );
  }, [isSearchEnabled, setIsSearchEnabled, searchQuery, setSearchQuery]);

  return (
    <React.Fragment>
      <View style={styles.toolbarContainer}>
        <View style={styles.rowContainer}>
          <Icon name="film" color={PRIMARY_BLUE} size={24} />
          <Text testID="header-title" style={styles.title}>
            {'Movies'}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            testID="search-button"
            onPress={() => setIsSearchEnabled(true)}
            style={styles.searchIcon}>
            <Icon name="magnifying-glass" color={PRIMARY_BLUE} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="favourite-button"
            onPress={() => navigation.navigate('Favourites')}>
            <Icon name="heart" color={PRIMARY_BLUE} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {SearchInput}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    marginHorizontal: 12,
  },
  searchIcon: {
    marginHorizontal: 12,
  },
  clearIcon: {
    marginHorizontal: 12,
  },
  searchContainer: {
    marginHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: PRIMARY_BLUE,
  },
  searchInput: {
    flex: 1,
    padding: 12,
  },
});
