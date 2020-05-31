import React from 'react';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';

const PlannerMap = () => {
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
            <MapView 
                style={styles.mapStyle}
                zoomEnabled={true}
                region={mapRegion}
                showsUserLocation={true}
            />
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

export default PlannerMap;