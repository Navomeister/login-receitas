import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PagLogin from './src/Pages/PagLogin';
import PagDepois from './src/Pages/PagDepois';

export default function App() {
  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='PagLogin'>
        <Stack.Screen name='PagLogin' component={PagLogin}/>
        <Stack.Screen name='PagDepois' component={PagDepois}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
