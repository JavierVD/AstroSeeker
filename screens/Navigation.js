import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {create} from 'react-test-renderer';
import Login from './Login';
import Registrar from './Registrar';
import Register from './Register';
import Bluetooth from './Bluetooth';
import AboutUs from './AboutUs';
import Contact from './ContactUs';
import Settings from './Settings';
import RateUs from './RateUs';
import Wiki from './Wiki';
import Panel from './Panel';
import Panelin from './Panelin';
import Community from './Community';
import HowTo from './HowTo';
import NewPost from './NewPost';
import ShowPost from './ShowPost';
import NuevoPost from './NuevoPost';
import VerPost from './VerPost';
import Dashboard from './Dashboard';
import Tablero from './Tablero';
import Login2 from './Login2';
import Themes from './Themes';
import Theme from './Theme';
import Tema from './Tema';
import Temas from './Temas';
import Sobrenosotros from './Sobrenosotros';
import Calificanos from './Calificanos';
import Configuracion from './Configuracion';
import Comunidad from './Comunidad';
import Tutorial from './Tutorial';
import BluetoothIngles from './BluetoothIngles';
import Calibrar from './Calibrar';
import Calibrarin from './Calibrarin';
import ManagePost from './ManagePost';
import AdminPost from './AdminPost';
import Tabs from './Tabs';
import Tabsin from './Tabsin'
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="BluetoothIngles" component={BluetoothIngles} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Panel" component={Panel} />
        <Stack.Screen name="Panelin" component={Panelin} />
        <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Tabsin" component={Tabsin} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Calibrar" component={Calibrar} />
        <Stack.Screen name="Calibrarin" component={Calibrarin} />
        <Stack.Screen name="ManagePost" component={ManagePost} />
               <Stack.Screen name="AdminPost" component={AdminPost} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Wiki" options={{orientation: 'landscape'}} component={Wiki} />
        <Stack.Screen name = "Comm" component = { Community } />
        <Stack.Screen name = "newPost" component = { NewPost } />
        <Stack.Screen name = "ShowPost" component = { ShowPost } />
        <Stack.Screen name = "NuevoPost" component = { NuevoPost } />
        <Stack.Screen name = "VerPost" component = { VerPost } />
        <Stack.Screen name="RateUs" component={RateUs} />
        <Stack.Screen name="HowTo" component={HowTo} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login2" component={Login2} />
        <Stack.Screen name="Themes" component={Themes}/>
        <Stack.Screen name="Theme" component={Theme}/>
        <Stack.Screen name="Temas" component={Temas}/>
        <Stack.Screen name="Tema" component={Tema}/>
        <Stack.Screen name="Configuracion" component={Configuracion}/>
        <Stack.Screen name="Tablero" component={Tablero}/>
        <Stack.Screen name="Community" component={Community}/>
        <Stack.Screen name="Comunidad" component={Comunidad}/>
        <Stack.Screen name="Calificanos" component={Calificanos}/>
        <Stack.Screen name="Sobrenosotros" component={Sobrenosotros}/>
        <Stack.Screen name="Tutorial" component={Tutorial}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
