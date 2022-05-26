import React from 'react';

import { StyleSheet, Text, View, Alert, Button, Image } from 'react-native';


export default function Contact() {
  return (
    <View style={styles.ctcolumn}>
      <View style={styles.ctrow}>
      <Text style={styles.paragraph}>
        Please Rate Us!!! and You will get a gift.
      </Text>

      </View>
      
      <View style={styles.ctrow}>
        <View style={[styles.box, styles.box1]}>
          <Image style={styles.logo} source={require('../res/images/star.png')} />
        </View>
        <View style={[styles.box, styles.box1]}>
          <Image style={styles.logo} source={require('../res/images/star.png')} />
        </View>
        <View style={[styles.box, styles.box1]}>
          <Image style={styles.logo} source={require('../res/images/star.png')} />
        </View>
        <View style={[styles.box, styles.box1]}>
          <Image style={styles.logo} source={require('../res/images/star.png')} />
        </View>
        <View style={[styles.box, styles.box1]}>
          <Image style={styles.logo} source={require('../res/images/star.png')} />
        </View>
      </View>
      <View style={styles.ctrow}>
      <View>
       <Button
        title="Go to AppStore"
        onPress={() => Alert.alert('Button has been pressed')}
      />
    </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ctrow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctcolumn:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: 30,
    marginBottom: 30,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',  
  }
  
});