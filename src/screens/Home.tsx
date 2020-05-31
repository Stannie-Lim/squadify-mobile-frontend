import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

const Home = ({ navigation }: any) => {
    return (
        <View>
            <Button title='group' onPress={ () => navigation.navigate('Group') }>Click here to go to group</Button>
        </View>
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