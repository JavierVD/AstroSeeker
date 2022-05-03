import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import Community from "./screens/Community";
import NewPost from "./screens/NewPost";
import ShowPost from "./screens/ShowPost";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name = "Comm" component = { Community } />
        <Stack.Screen name = "newPost" component = { NewPost } />
        <Stack.Screen name = "ShowPost" component = { ShowPost } />
        </Stack.Navigator>

      </NavigationContainer>
  );
}
