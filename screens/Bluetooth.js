import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagedCardView from 'react-native-imaged-card-view';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
export default class Registrar extends React.Component {
  state = {
    username: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    passwordconf: '',
    photourl: '',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{backgroundColor: 'rgba(0,0,0,0.7)', flex: 1}}>
        <Text
          style={{
            position: 'absolute',
            top: 20,
            left: 35,
            fontSize: 25,
            fontFamily: 'astro',
          }}>
          Dispositivos
        </Text>
        <ImagedCardView
          style ={{position: 'absolute', top:100, left: 35}}
          title="HC-06-Arduino-Telescope"
          rightSideValue="720:1"
          subtitle="Classic Bluetooth Device"
          backgroundColor="#ff6460"
          source={{
            uri: 'https://cdn4.iconfinder.com/data/icons/essential-collection/55/bluetooth-512.png',
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  usernamestyle: {
    position: 'absolute',
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    fontSize: 16,
    top: 80,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  botonRegistrarse: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    width: Dimensions.get('window').width - 55,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    borderRadius: 30,
    top: 370,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  botonRegresar: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    width: Dimensions.get('window').width - 55,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    borderRadius: 30,
    top: 440,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  fullnamestyle: {
    position: 'absolute',
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    fontSize: 16,
    top: 120,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  mailStile: {
    position: 'absolute',
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    fontSize: 16,
    top: 160,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  passwordStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    fontSize: 16,
    top: 200,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
});
