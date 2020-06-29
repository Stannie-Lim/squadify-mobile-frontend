import React from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';

// images
const bg = require('../../../assets/images/home.gif');
const text = require('../../../assets/images/squadify.png')
const icon = require('../../../assets/images/Squadify_Icon.png');

const Auth = ({ navigation }: any) => (
  <ImageBackground source={ bg } style={ styles.image }>
    <View style={ styles.iconcontainer }>
      <Image source={ text } style={ styles.icon }/>  
    </View>
    <SafeAreaView style={styles.container}>
      <View style={ styles.buttons }>
        <TouchableOpacity onPress={ () => navigation.navigate('Login') }>
          <Text style={ styles.text }>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={ styles.buttons }>
        <TouchableOpacity onPress={ () => navigation.navigate('Register') }>
          <Text style={ styles.text }>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: Dimensions.get('window').width / 2.5,
    padding: 10,
    margin: 10,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 3,
    alignItems: 'center',
    backgroundColor: 'grey'
  },  
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1
  },
  icon: {
    resizeMode: 'cover',
    marginBottom: 50
  },
  iconcontainer: {
    alignItems: 'center',
    marginTop: 75,
  }
});

export default Auth;