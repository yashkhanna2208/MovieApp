import React from 'react';
import RootNavigation, {
  RootStackName,
} from './src/client/navigation/RootNavigation';

const App = () => {
  return <RootNavigation initialRoute={RootStackName.HOME} />;
};

export default App;
