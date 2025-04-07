import 'react-native';
import {render} from '@testing-library/react-native';

import '@testing-library/jest-native';
import RootNavigation, {
  RootStackName,
} from '../../src/client/navigation/RootNavigation';

describe('App', () => {
  it('should render the app', async () => {
    const {findByTestId} = render(
      <RootNavigation initialRoute={RootStackName.HOME} />,
    );

    const headerTitle = await findByTestId('header-title');

    expect(headerTitle).toHaveTextContent('Movies');
  });
});
