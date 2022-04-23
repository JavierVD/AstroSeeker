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

const isPaused360 = true;

export default class Login extends React.Component {
  state = {
    isPausedVideo360: true,
    timerGeneral: null,
    timerOpacidadTexto: null,
    timerPosicion: null,
    timerOpacidad360: null,
    counterGeneral: 0,
    counterMovertexto: 0,
    textPosition: 42.0,
    textShadowIntensity: 0.0,
    opacidadSplash: 1.0,
    mailPosition: 40,
    opacidadLogin: 0.0,
    opacidad360: 0.0,
    view360: 0,
    posicionLogin: 45,
    opacidadlogin: 0.0,
    textColor: 'rgba(255,255,255,0.0)',
  };

  tick = () => {
    if (this.state.counterGeneral <= 6600) {
      this.setState({
        counterGeneral: this.state.counterGeneral + 300,
      });
    } else {
      if (this.state.counterGeneral > 6600) {
        let timerOpacidad360 = setInterval(this.tick_brillo360, 200);
        this.setState({timerOpacidad360});
      }
    }
    if (this.state.counterGeneral >= 6600) {
      let timerPosicion = setInterval(this.tick_posicion, 2);
      this.setState({timerPosicion});
    }
    if (this.state.counterGeneral >= 1900) {
      this.setState({
        textColor: 'rgba(255,255,255,1)',
      });
    }
    if (
      this.state.counterGeneral >= 3600 &&
      this.state.timerOpacidadTexto == null
    ) {
      let timerOpacidadTexto = setInterval(this.tick_texto, 10);
      this.setState({timerOpacidadTexto});
    }
  };

  tick_brillo360 = () => {
    if (this.state.opacidadSplash > 0.0) {
      console.log(this.state.opacidadSplash);
      this.setState({
        opacidadSplash: this.state.opacidadSplash - 0.1,
      });
    }
  };

  tick_posicion = () => {
    if (this.state.textPosition >= 15) {
      this.setState({
        posicionLogin: this.state.posicionLogin + 0.02,
      });
      if (this.setState.textPosition <= 26) {
        this.setState({
          textPosition: this.state.textPosition - 0.08,
        });
      } else {
        this.setState({
          textPosition: this.state.textPosition - 0.15,
        });
      }
    }
    if (this.state.opacidadLogin < 1.0) {
      this.setState({
        opacidadLogin: this.state.opacidadLogin + 0.1,
      });
      console.log(this.state.opacidadLogin);
    }
  };

  tick_texto = () => {
    if (this.state.textShadowIntensity < 1) {
      this.setState({
        textShadowIntensity: this.state.textShadowIntensity + 0.01,
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        {/*<Image
          source={require('../res/images/backlogin.jpeg')}
          style={[styles.backlogin, {opacity: 0.0}]}
        />*/}
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
                        console.log('buf start');
                      }}
                      onBufferEnd={() => {
                        console.log('buf end');
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

        <VideoPlayer
          source={require('../res/animations/SplashScreenRip.mp4')}
          resizeMode={'cover'}
          onReadyForDisplay={() => {
            let timerGeneral = setInterval(this.tick, 300);
            this.setState({timerGeneral});
            this.setState({
              isPausedVideo360: false,
            });
          }}
          style={[styles.backgroundVideo, {opacity: this.state.opacidadSplash}]}
        />

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

        {/*<Text>
          OXXOOO... {this.state.counterGeneral}...{this.state.textPosition}
        </Text>*/}
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
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              underlineColorAndroid={'rgba(255,255,255,0.0)'}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.botonInicio}>
              <Text>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.botonRegistrarse}>
              <Text>Registrarme</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
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
