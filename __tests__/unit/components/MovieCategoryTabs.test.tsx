import 'react-native';
import '@testing-library/jest-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import {getComponentWithProviders} from '../../utils/utils';
import MovieCategoryTabs from '../../../src/client/components/movie/MovieCategoryTabs';
import {TabCategory} from '../../../src/functional/type/types';

describe('App', () => {
  const setSelectedTab = jest.fn();

  beforeEach(() => {
    const ToolBar = getComponentWithProviders(
      <MovieCategoryTabs
        selectedTab={TabCategory.UPCOMING}
        setSelectedTab={setSelectedTab}
      />,
    );

    render(ToolBar);
  });

  test('should render the app tabs', async () => {
    const upcomingTab = await screen.findByTestId(
      `tab-${TabCategory.UPCOMING}`,
    );
    expect(upcomingTab).toBeVisible();

    const nowPlaying = await screen.findByTestId(
      `tab-${TabCategory.NOW_PLAYING}`,
    );
    expect(nowPlaying).toBeVisible();

    const topRated = await screen.findByTestId(`tab-${TabCategory.TOP_RATED}`);
    expect(topRated).toBeVisible();

    const popularTab = await screen.findByTestId(`tab-${TabCategory.POPULAR}`);
    expect(popularTab).toBeVisible();
  });

  test('should update selected tab', async () => {
    const topRated = await screen.findByTestId(`tab-${TabCategory.TOP_RATED}`);
    expect(topRated).toBeVisible();

    fireEvent.press(topRated);

    expect(setSelectedTab).toBeCalledWith(TabCategory.TOP_RATED);
  });
});
