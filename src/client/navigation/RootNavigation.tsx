import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import HomeScreen from '../screens/HomeScreen';
import MovieDetails from '../screens/MovieDetails';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export enum RootStackName {
  Home = 'Home',
  MOVIE_DETAILS = 'MovieDetails',
}

export type RootStackType = {
  Home: undefined;
  MovieDetails: {
    id: number;
  };
};

interface RootNavigationProps {
  initialRoute: string;
}

const RootNavigation: React.FC<RootNavigationProps> = ({initialRoute}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={RootStackName.Home} component={HomeScreen} />
          <Stack.Screen
            name={RootStackName.MOVIE_DETAILS}
            component={MovieDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default RootNavigation;
