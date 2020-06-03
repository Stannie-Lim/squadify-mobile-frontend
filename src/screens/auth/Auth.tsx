import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

const Auth = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <Button title='Login' onPress={ () => navigation.navigate('Login') } />
            <Button title='Register' onPress={ () => navigation.navigate('Register') } />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Auth;