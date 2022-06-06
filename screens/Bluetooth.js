import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AndroidOpenSettings from 'react-native-android-open-settings';
import ImagedCardView from 'react-native-imaged-card-view';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
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
  ToastAndroid,
} from 'react-native';
import BluetoothSerial, { disable } from "react-native-bluetooth-serial-next";
import LottieView from 'lottie-react-native';
export default class BluetoothIngles extends React.Component {
  state = {
    username: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    passwordconf: '',
    photourl: '',
    dispositivos: [],
    ena: false
  };

  startDiscover = async ()=>{
    const isEnabled = await BluetoothSerial.isEnabled();
    this.setState({ena: isEnabled, dispositivos: []});
    console.log(isEnabled);
    if(isEnabled){
      const devices = await BluetoothSerial.listUnpaired();
      console.log(devices);
      this.setState({dispositivos: devices})
      devices.forEach((element) => {
        console.log(element.id);
        if (element.id == "00:18:E4:40:00:06") {
          console.log(element.id);
        }
      });
    }
    
  }
  connect = async (MACDIR) =>{
    try {
      const device = await BluetoothSerial.connect(MACDIR);
      const isConnected = await BluetoothSerial.isConnected();
      if (isConnected) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Conectado',
          textBody: 'Se ha conectado a la MAC ' + MACDIR,
          button: 'Cerrar',
        })
        this.props.navigation.navigate('Panel');
      }

      await BluetoothSerial.stopScanning();
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }
  componentDidMount(){
    this.startDiscover();
  }
  encender =async()=>{
    await BluetoothSerial.enable();
    this.setState({ena: true});
    this.startDiscover();
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <ImageBackground source={{uri: 'https://wallpaperaccess.com/full/31394.jpg'}} style={{flex: 1, justifyContent: "center"}} resizeMode="cover">
        
        <TouchableOpacity
        onPress={()=>AndroidOpenSettings.bluetoothSettings()}>
        <Icon
              name={'settings'}
              size={20}
              color={'rgba(255,255,255,1.0)'}
              style={{position: 'absolute', top: -400,right: 30}}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigate('Tablero')}>
          <Image style={{position: 'absolute', top: -400, left:15, zIndex:1, height: 30, width: 30}} source={require('../res/images/return.png')}/>
        </TouchableOpacity>
          <Text
            style={{
              position: 'absolute',
              top: 70,
              left: 90,
              fontSize: 25,
              color: '#fff',
              fontFamily: 'astro',
            }}>
            Devices
          </Text>
          {(this.state.ena)? <View style={{position: 'absolute', top: 150, left: 0}}>
        {this.state.dispositivos.map((e,index)=>{
            return             <ImagedCardView
            key={index}
            style={{paddingBottom: 15, marginBottom: 15}}
            rightSideTitle="Class"
            title= {e.name}
            onPress={()=> this.connect(e.address)}
            rightSideValue={e.class+""}
            leftSideTitle="MAC"
            leftSideValue={e.address}
            subtitle="Classic Bluetooth Device"
            backgroundColor="#ff6460"
            source={{
              uri: 'https://cdn4.iconfinder.com/data/icons/essential-collection/55/bluetooth-512.png',
            }}
          />

        })

        }

      </View>
          : <TouchableOpacity onPress={()=>this.encender()}style={{borderWidth: 2, position:'absolute',width: 150,height: 30, borderColor: 'white', textAlign: 'center', left: 120,backgroundColor: 'rgba(0,0,0,0.7)'}}><Text style = {{right:-20}}>Turn On Bluetooth</Text></TouchableOpacity>}
        <TouchableOpacity style={{color:"#FFF", position: 'absolute',left: 160, bottom: 20,borderColor: '#FFF', borderWidth: 1,
         borderRadius: 90, height: 70, width: 70, alignItems: 'center', backgroundColor: '#000'}} onPress={()=> this.startDiscover()}>
           <Text style={{top: 25}}>Refresh</Text></TouchableOpacity>
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