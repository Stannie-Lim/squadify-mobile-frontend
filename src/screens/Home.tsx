import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, Button } from 'react-native';

const Home = ({ navigation, groups }: any) => {
    return (
        <ScrollView>
          {
            groups.map((group: string) => <Button key={group} title={group} onPress={ () => navigation.navigate('Group 1') } /> )
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