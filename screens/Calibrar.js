import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';


export default class Calibrar extends React.Component {
  state={
    estrellas: [],
    dec: '',
    ar: '',
    animar: '',
    rotation: 90,
    valueee: 'Selecciona una estrella para alinear'
  }
  componentDidMount = async ()=>{
    try{
      const gal = firestore().collection('Catalogo').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data().id);
          if(documentSnapshot.data().tipo == 'Estrella') this.setState({estrellas: [...this.state.estrellas, {id:documentSnapshot.data().id, name: documentSnapshot.data().nombre }]})
        });
      });
    }catch(e){
      console.log(e);
    }
  }

  comando =async(val)=>{
    try {   
      const cadena = val;
      await BluetoothSerial.write(cadena);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  seleccionar= async(item)=>{
    console.log("Item" + item)
    const gal = firestore().collection('Catalogo').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.data().id ==item){
          this.setState({
            ar: documentSnapshot.data().ar,
            dec: documentSnapshot.data().dec,
            valueee: 'Seleccionaste: ' + documentSnapshot.data().nombre,
          })
        }
      });
    });;
    console.log(this.state.ar+ " " + this.state.dec);


  }
  salir = async()=>{
    if(this.state.ar == '' || this.state.dec == ''){
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Congrats! this is toast notification success',
      })
    }else{
      await AsyncStorage.setItem('@ar', this.state.ar);
      await AsyncStorage.setItem('@dec', this.state.dec);
      this.props.navigation.navigate('Panel');
    }
  }

  anim = async (com) =>{

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back_button}
          onPress={() => this.props.navigation.navigate('Panel')}>
          <Image
            style={styles.back_button}
            source={require('../res/images/return.png')}
          />
        </TouchableOpacity>
        <LottieView
          style={styles.animation}
          source={require('../res/animations/stars_about.json')}
          speed={1}
          autoPlay
          loop
        />
        <Text style={styles.textacercade}>Alinear telescopio</Text>
        <Text style={styles.textnormal}>{this.state.valueee}</Text>
        <View style={{top: 200, alignItems: 'center', color: 'white'}}>
          <SearchableDropdown
                  multi={false}
                  onItemSelect={(item) => {
                    this.seleccionar(item.id);
                  }}
                  containerStyle={{ padding: 5 }}
                  itemStyle={{
                    padding: 10,
                    width: 280,
                    marginTop: 2,
                    backgroundColor: '#FFF',
                    borderColor: '#fff',
                    color: '#FFF',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{ color: '#222' }}
                  itemsContainerStyle={{ maxHeight: 140 }}
                  items={this.state.estrellas}
                  defaultIndex={2}
                  resetValue={false}
                  textInputProps={
                    {
                      placeholder: "Buscar estrella de referencia",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 12,
                          borderWidth: 1,
                          width: 280,
                          color: '#FFF',
                          borderColor: '#ccc',
                          borderRadius: 5,
                      },
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />
        </View>
        <View style={{alignItems: 'center', top: 350}}>
          <View style={{transform: [{rotate: this.state.rotation +'deg'}]}}>
            <TouchableOpacity onPressIn={() => this.comando('+dec')}
               onPressOut ={() => this.comando('stop')}>
              <Icon
                  name={'arrow-up-circle'}
                  size={50}
                  color={'rgba(255,255,255,0.7)'}
                
                />
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => this.comando('-dec')}
               onPressOut ={() => this.comando('stop')}style={{top: 50}}>
              <Icon
                  name={'arrow-down-circle'}
                  size={50}
                  color={'rgba(255,255,255,0.7)'}
                />
            </TouchableOpacity>
          </View>
          <View style={{display: 'flex', top: -50,flexDirection: 'row'}}>
            <TouchableOpacity  onPressIn={() => {this.comando('-ra'), this.anim('xd'),this.setState({animar: 'menos'}), console.log(this.state.rotation)} }
               onPressOut ={() => this.comando('stop')}
              style={{left: -115}}>
                <Icon
                    name={'arrow-back-circle'}
                    size={50}
                    color={'rgba(255,255,255,0.7)'}
                  
                  />
              </TouchableOpacity>
              <TouchableOpacity onPressIn={() => this.comando('+ra')}
               onPressOut ={() => this.comando('stop')}
               style={{left: 115}}>
                <Icon
                    name={'arrow-forward-circle'}
                    size={50}
                    color={'rgba(255,255,255,0.7)'}
                  />
              </TouchableOpacity>
          </View>
          <View style={{bottom: -100}}>
            <TouchableOpacity onPress={()=> this.salir()} style={{borderColor: 'white', borderWidth: 2, padding: 10}}>
                  <Text>Terminar alineación</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  animation: {
    height: '30%',
    width: '30%',
    position:'absolute',
    transform: [{ rotate: '90deg'}]
  },
  textacercade: {
    color: '#FFFFFF',
    position: 'absolute',
    left: 30,
    top: 30,
    fontSize: 30,
    fontFamily: 'astro',
  },
  textnormal: {
    color: '#FFFFFF',
    position: 'absolute',
    left: 35,
    top: 150,
    fontSize: 20,
    fontFamily: 'Serif',
  },
  animationnight: {
    flex: 1,
  },
});
