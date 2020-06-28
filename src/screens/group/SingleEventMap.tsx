import moment from 'moment';
import React, { useState, useEffect } from 'react';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Button } from 'react-native';

const SingleEventMap = ({ event, mapRegion, address, setModalVisible }: any) => {
    return (
        <SafeAreaView>
            <MapView 
                style={ styles.mapStyle }
                zoomEnabled={true}
                region={mapRegion}
                showsUserLocation={true}
            >
                <View style={ styles.done }>
                    <Button onPress={ () => setModalVisible(false) } title="Done" />
                </View>
                 <MapView.Marker
                    coordinate={mapRegion}
                    title={ event.name ? `${event.name} starts at ${moment(event.startTime).format('LT')}` : '' }
                    description={address}
                />   
            </MapView>
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
    done: {
    //    marginBottom: 500,
       backgroundColor: 'white',
    },  
});

export default SingleEventMap;