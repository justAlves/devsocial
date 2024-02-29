import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import {StatusBar} from 'react-native';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#000" barStyle={'light-content'} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
