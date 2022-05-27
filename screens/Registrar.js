import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
  ToastAndroid
} from 'react-native';
import auth from "@react-native-firebase/auth";

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
  guardar = async()=>{
      if(this.state.email === '' && this.state.password === '' && this.state.name === '') {
        ToastAndroid.show('Requieres llenar todos los campos', ToastAndroid.SHORT);
      } else {
        try {
          let response =  await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
           if(response){
             console.log(response)
             this.props.navigation.navigate('Login2')
           }
         } catch (e) {
           console.error(e.message);
           if(e.message == "[auth/email-already-in-use] The email address is already in use by another account.")
              ToastAndroid.show('Correo ya registrado', ToastAndroid.SHORT);
            if(e.message == "[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]")
              ToastAndroid.show('Contraseña débil.r', ToastAndroid.SHORT);
         }
      }

  }
  render() {    
    const {navigate} = this.props.navigation; 
    return (
      <View style={{backgroundColor: 'rgba(0,0,0,0.7)', flex: 1}}>
          <Text style={{position: 'absolute', top: 20, left: 35,fontSize: 25, fontFamily: 'astro',}}>Registro</Text>
        <View>
          <Icon
            name={'planet'}
            size={28}
            color={'rgba(255,255,255,0.7)'}
            style={{top: 90, left: 35}}
          />
          <TextInput
            style={styles.usernamestyle}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            placeholder={'Nombre de usuario'}
            placeholderTextColor={'rgba(255,255,255,0.5)'}
            underlineColorAndroid={'rgba(255,255,255,0.0)'}
          />
        </View>
        <View>
          <Icon
            name={'person'}
            size={28}
            color={'rgba(255,255,255,0.7)'}
            style={{top: 130, left: 35}}
          />
          <TextInput
            style={styles.fullnamestyle}
            placeholder={'Nombre completo'}
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
            placeholderTextColor={'rgba(255,255,255,0.5)'}
            underlineColorAndroid={'rgba(255,255,255,0.0)'}
          />
        </View>
        <View>
          <Icon
            name={'mail'}
            size={28}
            color={'rgba(255,255,255,0.7)'}
            style={{top: 170, left: 35}}
          />
          <TextInput
            style={styles.mailStile}
            placeholder={'Correo electrónico'}
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={'rgba(255,255,255,0.5)'}
            underlineColorAndroid={'rgba(255,255,255,0.0)'}
          />
        </View>
        <View>
          <Icon
            name={'ios-key-outline'}
            size={28}
            color={'rgba(255,255,255,0.7)'}
            style={{top: 210, left: 35}}
          />
          <TextInput
            style={styles.passwordStyle}
            placeholder={'Contraseña'}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            placeholderTextColor={'rgba(255,255,255,0.5)'}
            underlineColorAndroid={'rgba(255,255,255,0.0)'}
          />
        </View>
        <TouchableOpacity onPress={()=> this.guardar()}style={styles.botonRegistrarse}>
              <Text>Registrarme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigate("Login2")} style={styles.botonRegresar}>
              <Text>Regresar</Text>
        </TouchableOpacity>
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