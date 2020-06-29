import moment from 'moment';
import React, { useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { API_KEY, API_URL } from '../../secrets'
import MapView, { AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, Switch, Modal, Slider, FlatList } from 'react-native';
import EventCard from '../../cards/EventCard';


const Search = () => {
    const [events, setEvents] = useState([])
    console.log(events)

    const [searchValue, setSearchValue] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [searchByRadius, setSearchByRadius] = useState(false)
    const [viewMap, setViewMap] = useState(false)
    const [radius, setRadius] = useState(1.00);
    const [sliderValue, setSliderValue] = useState(1.00);

    const [searchByName, setSearchByName] = useState(true)
    const [searchByHashtag, setSearchByHashtag] = useState(false)

    const toggleRadiusSwitch = () => {
        if (searchByRadius) {
            setSearchByRadius(false)
            setLatitude('')
            setLongitude('')
        } else {
            setSearchByRadius(true)
            setSearchByName(false)
            setSearchByHashtag(false)
        }
    }
    const toggleNameSwitch = () => {
        if (searchByName) {
            setSearchByName(false)
        } else {
            setSearchByRadius(false)
            setSearchByName(true)
            setSearchByHashtag(false)
        }
    }
    const toggleHashtagsSwitch = () => {
        if (searchByHashtag) {
            setSearchByHashtag(false)
        } else {
            setSearchByRadius(false)
            setSearchByName(false)
            setSearchByHashtag(true)
        }
    }

    const search = async () => {
        if (searchByRadius) {
            if (latitude && longitude) {
                console.log(latitude)
                console.log(longitude)
                console.log(radius)
                const foundEvents = (await AxiosHttpRequest('GET', `${API_URL}/event/searcharea/${radius}/${latitude}/${longitude}`))?.data
                console.log(foundEvents)
                setEvents(foundEvents);
            }
        } else if (searchByName) {
            if (searchValue) {
                const events = (await AxiosHttpRequest('GET', `${API_URL}/event/search/name/${searchValue}`))?.data
                setEvents(events)
            }
        } else if (searchByHashtag) {
            if (searchValue) {
                const events = (await AxiosHttpRequest('GET', `${API_URL}/event/search/hashtag/${searchValue}`))?.data
                setEvents(events)
            }
        }
    }

    const mapRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    }
    const findLocation = async () => {
        try {
            const address = searchValue.replaceAll(',', '').replaceAll(' ', '+')
            const location = (await AxiosHttpRequest('GET', `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&key=${API_KEY}`))?.data;
            console.log('LOCATION', location)
            setLatitude(location.results[0].geometry.location.lat);
            setLongitude(location.results[0].geometry.location.lng);
        } catch (err) {
            console.log(err);
        }
    };

    const ListItem = ({ event }: any) => {
        console.log('EVENT', event)
        return (
            <View style={styles.listItem}>
                <EventCard event={event} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ marginTop: 50 }}>
            <Text style={styles.title}>Search events</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => {
                        setSearchValue(text)
                        if (searchByRadius) {
                            findLocation()
                        }
                    }}
                    clearButtonMode='while-editing'
                    placeholder={searchByRadius ? 'Address or location' : 'Name or hashtag'}
                    value={searchValue} />
                <Button title="Search" onPress={search} />
            </View>
            <SafeAreaView style={styles.buttonsContainer}>
                <SafeAreaView style={styles.singleButtonContainer}>
                    <Switch
                        style={styles.switch}
                        value={searchByRadius}
                        onValueChange={toggleRadiusSwitch}
                    ></Switch>
                    <Text>By location</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.singleButtonContainer}>
                    <Switch
                        style={styles.switch}
                        value={searchByName}
                        onValueChange={toggleNameSwitch}
                    ></Switch>
                    <Text>By name</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.singleButtonContainer}>
                    <Switch
                        style={styles.switch}
                        value={searchByHashtag}
                        onValueChange={toggleHashtagsSwitch}
                    ></Switch>
                    <Text>By hashtags</Text>
                </SafeAreaView>
            </SafeAreaView>
            {
                searchByRadius &&
                <View style={styles.sliderparent}>
                    <View style={styles.slidercontainer}>
                        <Text>{sliderValue.toFixed(2)} miles</Text>
                    </View>
                    <View style={styles.slidercontainer}>
                        <Text>1 mile</Text>
                        <Slider
                            style={styles.slider}
                            value={sliderValue}
                            minimumValue={1}
                            maximumValue={25}
                            onValueChange={value => {
                                const miles = ((1609.34 * value) / 1000)
                                setRadius(miles);
                                setSliderValue(value);
                            }}
                        />
                        <Text>25 miles</Text>
                    </View>
                </View>
            }
            {searchByRadius && !viewMap && searchValue ? <Button title="View on map" onPress={() => setViewMap(!viewMap)} /> : <Text></Text>}
            {
                viewMap ?
                    <MapView
                        style={styles.mapStyle}
                        zoomEnabled={true}
                        region={mapRegion}
                        showsUserLocation={true}
                    >
                        <Button title='Close map' onPress={() => setViewMap(false)} />
                        <MapView.Marker
                            coordinate={mapRegion}
                            title={"title"}
                            description={"description"}
                        />
                    </MapView>
                    :
                    <FlatList style={styles.flatList} data={events} renderItem={({ item }: any) => <ListItem event={item} />} />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: "center"
    },
    inputField: {
        backgroundColor: 'white',
        height: 40,
        borderRadius: 5,
        borderColor: 'lightgray',
        borderWidth: 1,
        width: 300,
        padding: 8,
        marginTop: 6
    },
    switch: {
        transform: [{ scaleX: .75 }, { scaleY: .75 }]
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        margin: 10
    },
    singleButtonContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",

    },
    slidercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        width: Dimensions.get('window').width / 1.5
    },
    sliderparent: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    listItem: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    listItemTextContainer: {
        display: "flex",

    },
    listItemName: {
        fontSize: 22,
        margin: 3
    },
    listItemTime: {
        fontSize: 10,
        margin: 3
    },
    flatList: {
        height: Dimensions.get('window').height / 1.28,
    }
});

export default Search;