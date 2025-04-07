import 'react-native';
import {render} from '@testing-library/react-native';

import HomeScreen from '../../src/client/screens/HomeScreen';
import {getComponentWithProviders} from '../utils/utils';
import '@testing-library/jest-native';

describe('App', () => {
  it('should render the app', async () => {
    const {findByTestId} = render(getComponentWithProviders(<HomeScreen />));

    const headerTitle = await findByTestId('header-title');

    expect(headerTitle).toHaveTextContent('Movies');
  });
});
