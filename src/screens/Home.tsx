import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, Button } from 'react-native';

const Home = ({ navigation }: any) => {
    return (
        <ScrollView>
          <Button title='Group 1' onPress={ () => navigation.navigate('Group 1') } />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;