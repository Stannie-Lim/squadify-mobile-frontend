import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';

const PlannerCalendar = () => {
    const mapRegion = {
        latitude: 40.705127,
        longitude: -74.009150,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
  }
    return (
        <SafeAreaView>
            <View style={ styles.center }>
                <Text style={ styles.text }>Planner</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default PlannerCalendar;