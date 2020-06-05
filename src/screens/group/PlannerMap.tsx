import React from 'react';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Button } from 'react-native';

const PlannerMap = ({ route, navigation }: any) => {
    const { date } = route.params;
    const mapRegion = {
        latitude: 40.705127,
        longitude: -74.009150,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
  }
    return (
        <SafeAreaView>
            <View style={ styles.center }>
                <Button title='Back' onPress={ () => navigation.goBack() } />
                <Text style={ styles.text }>Your map for { date.dateString }</Text>
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
        flexDirection: 'row'
    },
    text: {
        fontSize: 30,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default PlannerMap;