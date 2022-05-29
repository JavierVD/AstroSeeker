import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagedCardView from 'react-native-imaged-card-view';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
export default class Bluetooth extends React.Component {
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
      <View style={{flex: 1}}>
        <ImageBackground source={{uri: 'https://wallpaperaccess.com/full/31394.jpg'}} style={{flex: 1, justifyContent: "center"}} resizeMode="cover">
        <TouchableOpacity onPress={()=> navigate('AboutUs')}>
          <Image style={{position: 'absolute', top: -400, left:15, zIndex:1, height: 30, width: 30}} source={require('../res/images/return.png')}/>
        </TouchableOpacity>
          <Text
            style={{
              position: 'absolute',
              top: 70,
              left: 35,
              fontSize: 25,
              fontFamily: 'astro',
            }}>
Devices
          </Text>
          <View style={{position: 'absolute', top: 150, left: 0}}>
            <ImagedCardView
              rightSideTitle="Resolución AR"
              title="🟢 HC-06-Arduino-Telescope"
              rightSideValue="1660:1"
              leftSideTitle="Resolución Dec"
              leftSideValue="540:1"
              subtitle="Classic Bluetooth Device"
              backgroundColor="#ff6460"
              source={{
                uri: 'https://cdn4.iconfinder.com/data/icons/essential-collection/55/bluetooth-512.png',
              }}
            />
          </View>
        </ImageBackground>
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
