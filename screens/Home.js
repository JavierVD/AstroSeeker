import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box } from "native-base";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <Text style={styles.title}>Home Screen</Text>
        <Button
          title="Go to Contact"
          onPress={() => navigation.navigate('ContactUs')}
        />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
  },
  box: {
    backgroundColor: '#1e1e1e',
      fontSize: "md",
      fontWeight: "bold",
      color: "white",
  },
});
