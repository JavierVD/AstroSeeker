import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {create} from 'react-test-renderer';
import Login from './Login';
import Registrar from './Registrar';
import Bluetooth from './Bluetooth';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Settings from './Settings';
import RateUs from './RateUs';
import Wiki from './Wiki';
import Panel from './Panel';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Panel">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Panel" component={Panel} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="config" component={config} />
        <Stack.Screen name="Wiki" component={Wiki} />
        <Stack.Screen name="RateUs" component={RateUs} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
