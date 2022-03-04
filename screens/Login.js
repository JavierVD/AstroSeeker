import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';



export default class Login extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content"/>
        <TouchableOpacity style={styles.back_button} onPress={() => this.props.navigation.navigate('Devices')}>
          <Image style={styles.back_button} source={require("../res/images/return.png")}/>
        </TouchableOpacity>
        <LottieView style = {styles.animationnight} source={require('../res/animations/night.json')} speed={1} autoPlay loop={false}/>
        <LottieView style ={styles.animation} source={require('../res/animations/stars_about.json')} speed={1} autoPlay loop/>
        <Text style = {styles.textacercade}>Acerca de</Text>     
        <Text style = {styles.textnormal}>AstroSeeker Beta 1.0 by Team 3</Text>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  back_button: {
    paddingTop: 16,
    paddingLeft: 8,
    marginBottom: 20,
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
  animation:{
    height: '60%',
    width: '100%',
  },
  textacercade:{
    color: '#FFFFFF',
    position: 'absolute',
    left: 30,
    top: 30,
    fontSize: 110,
    fontFamily: 'Amatic-Bold',
  },
  textnormal:{
    color: '#FFFFFF',
    position: 'absolute',
    left: 120,
    top: 500,
    fontSize: 20,
    fontFamily: 'Serif',
  },
  animationnight:{
    flex: 1,

  },
});