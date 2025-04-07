import {mockedGetMovieResponse} from './utils/mocks';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      id: mockedGetMovieResponse.results[0].id,
    },
  }),
}));
