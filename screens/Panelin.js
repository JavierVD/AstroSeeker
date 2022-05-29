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
import {ViroGeometry} from '@viro-community/react-viro';
import LottieView from 'lottie-react-native';

export default class Panel extends React.Component {
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
        <ImageBackground
          source={{uri: 'https://cdn.wallpapersafari.com/59/28/mCKeyn.jpg'}}
          style={{flex: 1, justifyContent: 'center'}}
          resizeMode="cover">
          <TouchableOpacity onPress={() => navigate('AboutUs')}>
            <Image
              style={{
                position: 'absolute',
                top: -250,
                left: 15,
                zIndex: 1,
                height: 30,
                width: 30,
              }}
              source={require('../res/images/return.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              position: 'absolute',
              top: 70,
              left: 35,
              fontSize: 18,
              fontFamily: 'astro',
            }}>
            Control panel
          </Text>
          <View style={{position: 'absolute', top: 150, left: 0}}>
            <ImagedCardView
              rightSideTitle="AR"
              title="92% Galaxia de andrómeda"
              rightSideValue="8h 10m 23s"
              leftSideTitle="DEC"
              leftSideValue="12h 13m 4s"
              subtitle="Galaxia espiral"
              backgroundColor="#A5BBAA"
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/5/57/M31bobo.jpg',
              }}
            />
          </View>
          <View style={{top: 120}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(40, 110, 156,0.7)',
                position: 'absolute',
                top: -60,
                left: 35,
                right: 35,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>GoTo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(40, 110, 156,0.7)',
                position: 'absolute',
                top: -30,
                left: 35,
                right: 35,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Track</Text>
            </TouchableOpacity>
          </View>
          <View style={{top: 140, paddingLeft: 12, paddingRight: 12}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row' ,borderRadius: 15, marginBottom:5, marginTop: 5,borderColor: "#FFF", backgroundColor: '#000',borderWidth: 2}}>
                <LottieView
                  style={{height: 60, width: 60}}
                  source={require('../res/animations/galaxy.json')}
                  speed={1}
                  autoPlay
                  loop={true}
                />
                <TextInput placeholder={'Find Galaxy'} placeholderTextColor={'rgba(255,255,255,0.5)'}/>
              </View>
              <View style={{flexDirection: 'row' ,borderRadius: 15, marginBottom:5, marginTop: 5,borderColor: "#FFF", backgroundColor: '#000',borderWidth: 2}}>
                <LottieView
                  style={{height: 60, width: 60}}
                  source={require('../res/animations/Planets.json')}
                  speed={1}
                  autoPlay
                  loop={true}
                />
                <TextInput placeholder={'Find Planet'} placeholderTextColor={'rgba(255,255,255,0.5)'}/>
              </View>
            </View>
            <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row' ,borderRadius: 15, marginBottom:5, marginTop: 5,borderColor: "#FFF", backgroundColor: '#000',borderWidth: 2}}>
                <LottieView
                style={{height: 60, width: 60}}
                source={require('../res/animations/Nebula.json')}
                speed={1}
                autoPlay
                loop={true}
              />
              <TextInput placeholder={'Find Nebula'} placeholderTextColor={'rgba(255,255,255,0.5)'}/>
                </View>

                <View style={{flexDirection: 'row' ,borderRadius: 15, marginBottom:5, marginTop: 5,borderColor: "#FFF", backgroundColor: '#000',borderWidth: 2}}>
              <LottieView
                style={{height: 60, width: 60}}
                source={require('../res/animations/Stars.json')}
                speed={1}
                autoPlay
                loop={true}
              />
              <TextInput placeholder={'Find Stars'} placeholderTextColor={'rgba(255,255,255,0.5)'}/>
              </View>

            </View>
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
