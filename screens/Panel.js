import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagedCardView from 'react-native-imaged-card-view';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Button, NativeBaseProvider } from 'native-base';
import BluetoothSerial, { disable } from "react-native-bluetooth-serial-next";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import firestore from '@react-native-firebase/firestore';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';

export default class Panel extends React.Component {
  state = {
    isAligned: false,
    nombre: '',
    ma: '',
    ar: '',
    dec:'',
    foto: '',
    busqueda:'',
    tipo:'',
    subtipo:'',
    galaxias:[],
    stars: 0.0,
    timer: null,
    nebulosas: [],
    estrellas:[],
    oldDEC: '',
    numerodia: 0,
    declinaciondia: 0,
    oldAR: '',
    active: false
  };

  verificarBT = async () =>{
    try{
      const isConnected = await BluetoothSerial.isConnected();
      console.log(isConnected);
      if(!isConnected){
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'No hay conexión',
          textBody: 'No hay ninguna montura conectada!',
          button: 'close',
        }); this.props.navigation.navigate('Bluetooth');
      }else
        console.log("XD")
    }catch(e){
      console.log("Error: " + e)
    }
  }
  conversionar=(cadena)=>{
    var result = ['','',''];
    var c=0;
    for(var x=0; x< cadena.length; x++ ){
      if(cadena[x] != ' '){
        if(cadena[x] != '°' && cadena[x] != '″' && cadena[x] != '′' && cadena[x] != 'h' && cadena[x] != 'm' && cadena[x] != 's' && cadena[x] != ' ' && cadena[x] != '+'){
          result[c] += cadena[x];
        }

      }else{
        c++;
      }
    }
    var grados = (parseInt(result[0]) * 15) + (parseInt(result[1])/4) + (parseInt(result[2])/240)
    return grados;
  }
  conversiondec=(cadena)=>{
    var result = ['','',''];
    var c=0;
    for(var x=0; x< cadena.length; x++ ){
      if(cadena[x] != ' '){
        if(cadena[x] != '°' && cadena[x] != '″' && cadena[x] != '′' && cadena[x] != '+'){
          result[c] += cadena[x];
        }
      }else{
        c++;
      }
    }
    var grados = (parseInt(result[0])<0)? (parseInt(result[0])) - (parseInt(result[1])/60) - (parseFloat(result[2])/3600):(parseInt(result[0])) + (parseInt(result[1])/60) + (parseFloat(result[2])/3600)

    return grados;
  }


  track = async()=>{
    if(!this.state.active){
      await BluetoothSerial.write("t");
      this.setState({active: true});
      console.log("Prender");
    }else{
      await BluetoothSerial.write("stop");
      this.setState({active: false});
      console.log("Apagar");
    }
      
  }
  goto=async()=>{
    const gradarold = this.conversionar(this.state.oldAR);
    const graddecold = this.conversiondec(this.state.oldDEC) - this.state.declinaciondia ;
    const gradar = this.conversionar(this.state.ar);
    const graddec = this.conversiondec(this.state.dec) - this.state.declinaciondia;
    const ar = gradar - gradarold;
    const dec = graddec- graddecold;
    const pasosar = Math.round((ar/(360/(10368000))))
    const pasosdec = Math.round((dec/(360/(3456000))))
    console.log(pasosar+ " " + pasosdec)
    await BluetoothSerial.write("g"+pasosar+" "+pasosdec);
  }
  catalogo = async () =>{
      const gal = firestore().collection('Catalogo').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if(documentSnapshot.data().tipo == 'Galaxia') this.setState({galaxias: [...this.state.galaxias, {id:documentSnapshot.data().id, name: documentSnapshot.data().nombre }]})
          if(documentSnapshot.data().tipo == 'Nebulosa') this.setState({nebulosas: [...this.state.nebulosas, {id:documentSnapshot.data().id, name: documentSnapshot.data().nombre }]})
          if(documentSnapshot.data().tipo == 'Estrella') this.setState({estrellas: [...this.state.estrellas, {id:documentSnapshot.data().id, name: documentSnapshot.data().nombre }]})
        });
      });
      console.log(this.state.galaxias);
  }

  seleccionar= async(item)=>{
    console.log("Item" + item)
    const gal = firestore().collection('Catalogo').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.data().id ==item){
          var poop = 0.0;
          if(documentSnapshot.data().ma  < 0)
            poop = 12
          if(documentSnapshot.data().ma  > 12)
            poop = 0
          if(documentSnapshot.data().ma  > 0 && documentSnapshot.data().ma  < 12)
            poop = 12 - documentSnapshot.data().ma;
          this.setState({
            stars: poop,
            nombre: documentSnapshot.data().nombre,
            tipo: documentSnapshot.data().tipo,
            subtipo: documentSnapshot.data().subtipo.toLowerCase(),
            ma: documentSnapshot.data().ma,
            dec: documentSnapshot.data().dec,
            ar: documentSnapshot.data().ar,
            foto: documentSnapshot.data().foto
          })
        }
      });
    });
  }

  componentDidMount=async()=>{
    this.verificarBT();
    this.catalogo();
    var today = new Date();
    var numerodias = Math.ceil((today - new Date(today.getFullYear(),0,1)) / 86400000)
    this.setState({numerodia: numerodias });
    this.setState({declinaciondia: (-23.45*Math.cos((360/365)*(3.14159/180) * (numerodias +10)))});

    this.setState({ oldDEC: await AsyncStorage.getItem('@dec')});
    this.setState({ oldAR: await AsyncStorage.getItem('@ar')});
    console.log("actual "  + await AsyncStorage.getItem('@dec'))
    if(await AsyncStorage.getItem('@dec') == null ||  await AsyncStorage.getItem('@ar') ==null ){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Te sugerimos primeramente alinear tu telescopio'
      })
    }else{
      this.setState({oldDEC:await AsyncStorage.getItem('@dec'), oldAR: await AsyncStorage.getItem('@ar') });
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Telescopio',
        textBody: 'Tu telescopio está alineado'
      })
    }
  }


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={{uri: 'https://cdn.wallpapersafari.com/59/28/mCKeyn.jpg'}}
          style={{flex: 1, justifyContent: 'center'}}
          resizeMode="cover">
          <TouchableOpacity onPress={() => navigate('Dashboard')}>
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
              left: 45,
              fontSize: 18,
              fontFamily: 'astro',
            }}>
            Panel de control
          </Text>
          <View style={{position: 'absolute', top: 150, left: 0}}>
            {
              (this.state.nombre=='')? <View style={{alignItems: 'center', alignContent: 'center'}}><Text style={{fontSize: 15, left: 40, fontFamily: 'astro'}}>Busca un cuerpo celeste!</Text>
              <LottieView    
                style={{height: 90, width: 90}}
                  source={require('../res/animations/Planets.json')}
                  speed={1}
                  autoPlay
                  loop={true}
                /></View>: <View>
              <ImagedCardView
              stars={12}
              reviews={this.state.ma}
              ratings={this.state.stars}
              rightSideTitle="AR"
              title={this.state.nombre}
              rightSideValue={this.state.ar}
              leftSideTitle="DEC"
              leftSideValue={this.state.dec}
              subtitle={this.state.tipo + " "+ this.state.subtipo}
              backgroundColor="#A5BBAA"
              source={{
                uri: this.state.foto,
              }}
            />
            <View style={{top: 120}}>
            <TouchableOpacity
            onPress={()=>this.goto()}
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
            onPress={()=> this.track()}
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
          </View></View>
            }

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
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={this.state.galaxias}
                defaultIndex={2}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Buscar galaxia",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        width: 280,
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
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={this.state.nebulosas}
                defaultIndex={2}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Buscar nebulosa",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        width: 280,
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

                <View style={{flexDirection: 'row' ,borderRadius: 15, marginBottom:5, marginTop: 5,borderColor: "#FFF", backgroundColor: '#000',borderWidth: 2}}>
              <LottieView
                style={{height: 60, width: 60}}
                source={require('../res/animations/Stars.json')}
                speed={1}
                autoPlay
                loop={true}
              />

              <SearchableDropdown
                multi={false}
                onItemSelect={(item) => {
                  this.seleccionar(item.id);
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  width: 280,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
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
                    placeholder: "Buscar estrella",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        width: 280,
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
              <View>
                <NativeBaseProvider>
                <Button style={{height: 50, borderRadius: 5}} variant="subtle" onPress={()=>this.props.navigation.navigate('Calibrar')}>
                  Calibrar telescopio
                </Button>
                </NativeBaseProvider> 
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