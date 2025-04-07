import React from 'react';
import RootNavigation, {
  RootStackName,
} from './src/client/navigation/RootNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <RootNavigation initialRoute={RootStackName.HOME} />
      <Toast position={'bottom'} />
    </>
  );
};

export default App;
