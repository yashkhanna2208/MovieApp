import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const testNavigationRef = createNavigationContainerRef();

export const getComponentWithProviders = (child: React.ReactNode) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={testNavigationRef}>{child}</NavigationContainer>
    </QueryClientProvider>
  );
};
