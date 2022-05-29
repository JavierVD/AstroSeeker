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
} from 'react-native';
import VideoPlayer from 'react-native-video';
import {
  Viro360Video,
  ViroConstants,
  ViroScene,
  ViroVRSceneNavigator,
} from '@viro-community/react-viro';
import LottieView from 'lottie-react-native';
import Registrar from './Registrar';
import auth from '@react-native-firebase/auth';

const isPaused360 = true;

export default class Login2 extends React.Component {
  state = {
    email: '',
    password: '',
    registro: false,
    isPausedVideo360: true,
    timerGeneral: null,
    timerOpacidadTexto: null,
    timerPosicion: null,
    timerOpacidad360: null,
    counterGeneral: 0,
    counterMovertexto: 0,
    textPosition: 20.0,
    textShadowIntensity: 1.0,
    opacidadSplash: 1.0,
    mailPosition: 40,
    opacidadLogin: 1.0,
    opacidad360: 1.0,
    view360: 0,
    posicionLogin: 45,
    opacidadlogin: 1.0,
    textColor: 'rgba(255,255,255,1.0)',
  };
  login = async()=>{
    auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
  .then(() => {
    console.log('Cuenta creada inicia sesion!');
    this.props.navigation.navigate('Tablero');
  })
  .catch(error => {
    if (error.code === 'auth/wrong-password') {
      console.log('Contraseña incorrecta!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('El correo es invalido!');
    }

    console.error(error);
  });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <View
          style={{
            height: Dimensions.get('window').width,
            width: '100%',
            elevation: 20,
            shadowColor: '#000000',
          }}>
          <ViroVRSceneNavigator
            autofocus={false}
            vrModeEnabled={false}
            initialScene={{
              scene: () => {
                const [text, setText] = useState('Initializing AR...');

                function onInitialized(state, reason) {
                  console.log('guncelleme', state, reason);

                  if (state === ViroConstants.TRACKING_NORMAL) {
                    setText('OKEY');
                  } else if (state === ViroConstants.TRACKING_NONE) {
                    console.log('Nel' + state);
                  }
                }
                return (
                  <ViroScene onTrackingUpdated={onInitialized}>
                    <Viro360Video
                      source={require('../res/animations/back360.mp4')}
                      loop={true}
                      paused={this.state.isPausedVideo360}
                      onBufferStart={() => {
                        console.log('buf inicio');
                      }}
                      onBufferEnd={() => {
                        console.log('buf fin');
                      }}
                      stereoMode={'None'}
                      onError={({nativeEvent: {error}}) => console.warn(error)}
                    />
                  </ViroScene>
                );
              },
            }}
          />
        </View>

        <Text
          style={[
            styles.logoTexto,
            {
              color: this.state.textColor,
              top: this.state.textPosition + '%',
              textShadowColor:
                'rgba(0,0,0,' + this.state.textShadowIntensity + ')',
            },
          ]}>
          ASTRO{'\n'}SEEKER
        </Text>
        <View
          style={{
            top: this.state.posicionLogin + '%',
            position: 'absolute',
            opacity: this.state.opacidadLogin,
          }}>
          <View>
            <Icon
              name={'mail'}
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={[styles.iconoEmail, {top: this.state.mailPosition}]}
            />
            <TextInput
              style={styles.mail}
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder={'Correo electrónico'}
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              underlineColorAndroid={'rgba(255,255,255,0.0)'}
            />
          </View>
          <View>
            <Icon
              name={'ios-key-outline'}
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={[styles.iconoEmail, {top: 20}]}
            />
            <TextInput
              style={styles.pass}
              placeholder={'Contraseña'}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              underlineColorAndroid={'rgba(255,255,255,0.0)'}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.botonInicio}
            onPress={()=> this.login()}>
              <Text>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={()=> navigate("Registrar")} style={styles.botonRegistrarse}>
              <Text>Registrarme</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={()=>  onFacebookButtonPress().then(() => console.log('Ingresado con Facebook!'))}style={styles.FacebookStyle} activeOpacity={0.5}>
              <Icon
                name={'ios-logo-facebook'}
                size={28}
                color={'rgba(255,255,255,0.7)'}
                style={{top: 0}}
              />
              <Text>Acceder con Facebook</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.GoogleStyle} activeOpacity={0.5}>
              <Icon
                name={'logo-google'}
                size={28}
                color={'rgba(0,0,0,0.7)'}
                style={{top: 0}}
              />
              <Text>Acceder con Google</Text>
            </TouchableOpacity>
          </View>
          {/*<View>
            <LottieView
              style={styles.AnimacionHuella}
              source={require('../res/animations/Huella.json')}
              speed={1}
              autoPlay
              loop={true}
            />
        </View>*/}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: Dimensions.get('window').width + 0,
    height: Dimensions.get('window').height + 20,
    backgroundColor: 'transparent',
  },
  video360: {
    position: 'absolute',
    width: '100%',
    height: 1200,
  },
  backlogin: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  AnimacionHuella: {
    position: 'absolute',
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    opacity: 0.7
  },
  iconoEmail: {
    left: 35,
  },
  mail: {
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    borderColor: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.0)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  FacebookStyle: {
    position: 'absolute',
    flexDirection: 'row',
    margin: 10,
    height: 40,
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    fontSize: 16,
    top: 115,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
    backgroundColor: 'rgba(66,103,178,0.8)',
  },
  GoogleStyle: {
    position: 'absolute',
    flexDirection: 'row',
    margin: 10,
    height: 40,
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    fontSize: 16,
    top: 165,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(0,0,0,0.7)',
    marginHorizontal: 25,
    backgroundColor: 'rgba(204,204,204,0.8)',
  },
  botonInicio: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    width: Dimensions.get('window').width - 55,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    borderRadius: 30,
    top: 30,
    backgroundColor: 'rgba(0,0,0,0.0)',
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
    top: 75,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  pass: {
    position: 'absolute',
    width: Dimensions.get('window').width - 55,
    borderRadius: 30,
    fontSize: 16,
    top: 10,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  logoTexto: {
    position: 'absolute',
    textAlign: 'center',
    left: Dimensions.get('window').width / 4,
    textShadowRadius: 5,
    textShadowOffset: {width: 5, height: 5},
    fontSize: 45,
    zIndex: 1,
    fontFamily: 'astro',
  },
});
