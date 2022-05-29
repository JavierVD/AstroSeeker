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
import Community from './Community';
import HowTo from './HowTo';
import NewPost from './NewPost';
import ShowPost from './ShowPost';
import Dashboard from './Dashboard';
import Tablero from './Tablero';
import Login2 from './Login2';
import IndexThemes from './Themes';
import Theme from './Theme';
import Configuracion from './Configuracion';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Registrar">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Panel" component={Panel} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Wiki" component={Wiki} />
        <Stack.Screen name = "Comm" component = { Community } />
        <Stack.Screen name = "newPost" component = { NewPost } />
        <Stack.Screen name = "ShowPost" component = { ShowPost } />
        <Stack.Screen name="RateUs" component={RateUs} />
        <Stack.Screen name="HowTo" component={HowTo} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login2" component={Login2} />
        <Stack.Screen name="IndexThemes" component={IndexThemes}/>
        <Stack.Screen name="Theme" component={Theme}/>
           <Stack.Screen name="Configuracion" component={Configuracion}/>
            <Stack.Screen name="Tablero" component={Tablero}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
