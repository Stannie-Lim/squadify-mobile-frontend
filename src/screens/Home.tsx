import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Button } from 'react-native';

const Home = ({ navigation, groups }: any) => {
    return (
        <ScrollView>
          {
            groups.map((group: string) => <Button key={group} title={group} onPress={ () => navigation.navigate('Group', { group } ) } /> ) 
          }
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