import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class Devices extends React.Component {

    state = {
        peripherals: new Map(),
    };
      
    componentDidMount() {
        BleManager.start({ showAlert: false })
      
        this.handlerDiscover = bleManagerEmitter.addListener(
          'BleManagerDiscoverPeripheral',
          this.handleDiscoverPeripheral
        );
      
        this.handlerStop = bleManagerEmitter.addListener(
          'BleManagerStopScan',
          this.handleStopScan
        );
      
        this.scanForDevices();
    }

    scanForDevices() {
        BleManager.scan([], 6);
    }

    handleDiscoverPeripheral = (peripheral) => {
        const { peripherals } = this.state;
      
        if (peripheral.name) {
          peripherals.set(peripheral.id, peripheral.name);
        }
        this.setState({ peripherals });
      };
      
      handleStopScan = () => {
        console.log('Scan is stopped. Devices: ', this.state.peripherals);
    }
    render() {
    
        return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/>
            <TouchableOpacity style={styles.back_button} onPress={()=>{alert("you clicked me")}}>
            <Image style={styles.back_button} source={require("../res/images/return.png")}/>
            </TouchableOpacity>
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
    width: 25
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
    paddingEnd:0,
  },
});