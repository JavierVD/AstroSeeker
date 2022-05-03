
import { StyleSheet, Text, View, Alert, Button, Image } from 'react-native';

export default function Contact() {
  return (
    <View style={styles.container}>
    <Text style={styles.paragraph}>
     AstroSeeker
    </Text>
    <Image style={styles.facebook} source={require('../res/images/facebook.png')} />
     <Button  style={styles.button}
      title="Facebook"
      onPress={() => Alert.alert('Button has been pressed')}
    />

    <Image style={styles.gmail} source={require('../res/images/gmail.png')} />
     <Button style={styles.button}
      title="Gmail"
      onPress={() => Alert.alert('Button has been pressed')}
    />

<Image style={styles.whatsapp} source={require('../res/images/whatsapp.jpg')} />
     <Button style={styles.button}
      title="Whatsapp"
      onPress={() => Alert.alert('Button has been pressed')}
    />
  </View>
);
}

const styles = StyleSheet.create({
container: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
},
paragraph: {
  margin: 24,
  marginTop: 0,
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
},
button: {
    marginTop: 30,
  },
facebook: {
  height: 128,
  width: 128,
},
 gmail: {
  height: 85,
  width: 135
},
whatsapp: {
    height: 128,
    width: 128
  }
});
