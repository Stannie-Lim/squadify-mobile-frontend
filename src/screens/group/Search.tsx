import React, {useState} from 'react';
import { API_KEY } from 'react-native-dotenv'
import { AxiosHttpRequest } from '../../utils/axios';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions } from 'react-native';

const Search = () => {
    const [ value, setValue ] = useState('');
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
    const mapRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    }
    const findLocation = async () => {
        try {
            const address = value.replace(' ', '+');
            const location = (await AxiosHttpRequest('GET', `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&key=${API_KEY}`))?.data;
            setLatitude(location.results[0].geometry.location.lat);
            setLongitude(location.results[0].geometry.location.lng);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={{ marginTop: 100 }}>
            <TextInput 
            style={ styles.inputField }
            onChangeText={text => setValue(text)}
            value={value} />
            <Button title="Search" onPress={ findLocation } />
            {
                latitude && longitude ?
                <MapView 
                    style={styles.mapStyle}
                    zoomEnabled={true}
                    region={mapRegion}
                    showsUserLocation={true}
                >
                    <MapView.Marker
                        coordinate={mapRegion}
                        title={"title"}
                        description={"description"}
                    />
                </MapView> : <Text></Text>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Search;