import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {create} from 'react-test-renderer';
import Login from './Login';
import Registrar from './Registrar';
import Bluetooth from './Bluetooth';
import AboutUs from './AboutUs';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Bluetooth">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
