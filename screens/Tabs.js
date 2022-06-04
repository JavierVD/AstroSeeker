import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Panel from "./Panel";
import Calibrar from "./Calibrar";

function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Panel") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calibrar") {
            iconName = focused
              ? "settings"
              : "settings-outline";
          }

          return <Icon name={iconName} size={40} color={color} />;
        },
        tabBarActiveTintColor: "gold",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
        activeTintColor: "#fff",
        inactiveTintColor: "#FFFFFF",
        activeBackgroundColor: "grey",
        inactiveBackgroundColor: "#5a5c5a",
        style: {
          backgroundColor: "#CE4418",
          paddingBottom: 3,
        },
      })}
    >
      <Tab.Screen name="Panel" component={Panel} />
      <Tab.Screen name="Calibrar" component={Calibrar} />
    </Tab.Navigator>
  );
}

export default class Tabs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyTabs />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002f69",
  },
  mail: {
    width: Dimensions.get("window").width - 55,
    height: 40,
    borderRadius: 30,
    borderColor: "rgba(255,255,255,1.0)",
    fontSize: 18,
    paddingLeft: 45,

    backgroundColor: "rgba(0,0,0,0.1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },
  botonInicio: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    width: Dimensions.get("window").width - 55,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    borderRadius: 30,
    top: 30,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  botonRegistrarse: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    width: Dimensions.get("window").width - 55,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    borderRadius: 30,
    top: 85,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  pass: {
    position: "absolute",
    width: Dimensions.get("window").width - 55,
    borderRadius: 30,
    fontSize: 18,
    height: 40,
    top: 10,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },
  titulo: {
    position: "absolute",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 50,
    top: 50,
    zIndex: 1,
    fontFamily: "sans-serif-thin",
  },
});
