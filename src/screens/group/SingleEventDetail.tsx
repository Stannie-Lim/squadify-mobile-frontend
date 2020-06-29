import moment from 'moment';
import { RNS3 } from 'react-native-aws3';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../../secrets';
import { Dimensions, View, StyleSheet, Text, SafeAreaView, Modal, TouchableOpacity, Image, ScrollView, Button } from 'react-native';

// components 
import SingleEventMap from './SingleEventMap';
import ChooseImage from '../auth/ChooseImage';

const SingleEventDetail = ({ event, mapRegion, address, setModalVisible }: any) => {
    const [users, setUsers] = useState([]);
    const [me, setUser]: any = useState({});
    const [mapModal, setMapModal] = useState(false);

    const [imageToAdd, setImageToAdd] = useState('')
    const [image, setImage] = useState('')
    const [showAddImageModal, setShowAddImageModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        await getUser(setUser);
        const data = (await AxiosHttpRequest('GET', `${API_URL}/event/${event.id}/users`))?.data;
        await setUsers(data);
    };


    const addImage = async () => {
        try {
            const makeId = () => {
                let result = '';
                const characters = `!@#$%^&*()_+}{":>?<,./;[]=-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`
                for (var i = 0; i < 15; i++) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result;
            }

            const file = {
                uri: imageToAdd,
                name: `${event.name}+ImageID=${makeId()}`,
                type: 'image/jpg',
            };
            const config = {
                keyPrefix: 'users/',
                bucket: 'squadify-avatars',
                region: REGION,
                accessKey: ACCESS_KEY_ID,
                secretKey: SECRET_ACCESS_KEY
            };
            const imageUrl = (await RNS3.put(file, config)).body.postResponse.location;
            if (imageUrl) {
                const url = (await AxiosHttpRequest('POST', `${API_URL}/event/${event.id}/add_image`, { imageUrl }))?.data
                event.imageUrls = `${event.imageUrls}####$$$$####${url}`
            }
            setShowAddImageModal(false)
        } catch (ex) {
            console.log(ex)
        }
    }

    const pickImage = async () => {
        try {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
            console.log('URI', uri)
            if (!cancelled) {
                await setImageToAdd(uri);
            }
            setShowAddImageModal(true)
        } catch (err) {
            console.log(err);
        }
    };

    const attend = async () => {
        let attending = Boolean(users.find((user: any) => user.user.id === me.id));
        if (attending) {
            alert("You are already attending");

        } else {
            await AxiosHttpRequest('POST', `${API_URL}/event/${event.id}/assign_self`);
            setModalVisible(false);
        }
    };

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.done} >Done</Text>
            </TouchableOpacity>
            <View style={styles.details}>
                <Text style={styles.title}>{event.name}</Text>
                <TouchableOpacity onPress={() => setMapModal(true)}>
                    <Text style={styles.location}>See Location</Text>
                </TouchableOpacity>
                <Text style={styles.date}>Time: {moment(event.startTime).format('MMMM Do YYYY, hh:m A')}</Text>
                <View style={styles.descriptionContainer}>
                    <ScrollView>
                        <Text style={styles.description}>{event.description}</Text>
                    </ScrollView>
                </View>
                <View style={styles.eventImagesContainer}>
                    <ScrollView style={styles.eventImagesScroll} horizontal={true}>
                        {
                            event.imageUrls && event.imageUrls.split('####$$$$####').map((url: string) => {
                                console.log('IMAGE URL', url)
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setImage(url)
                                        setShowImageModal(true)
                                    }}>
                                        <Image source={{ uri: url }} style={styles.eventImage} />
                                    </TouchableOpacity>
                                )
                            }
                            )
                        }
                    </ScrollView>
                </View>
                <Modal
                    animationType='slide'
                    visible={showImageModal}
                    onRequestClose={() => {
                        setShowImageModal(false);
                    }}
                >
                    <SafeAreaView style={styles.viewImageContainer}>
                        <TouchableOpacity onPress={() => {
                            setImage('')
                            setShowImageModal(false)
                        }}>
                            <Image source={{ uri: image }} style={styles.imageToView} />
                            <Button onPress={() => {
                                setImage('')
                                setShowImageModal(false)
                            }} title='back' />
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
                {
                    users &&
                    <View style={styles.imageAdder}>
                        <Button onPress={pickImage} title='Add an image (Hosts only)' />
                        <Modal
                            animationType='fade'
                            visible={showAddImageModal}
                            onRequestClose={() => {
                                setShowAddImageModal(false);
                            }}
                        >
                            <SafeAreaView style={styles.addImageContainer}>
                                <TouchableOpacity>
                                    <Image source={{ uri: imageToAdd }} style={styles.imageToAdd} />
                                    <SafeAreaView style={styles.addImageButtonsContainer}>
                                        <Button onPress={addImage} title='Add image' />
                                        <Button onPress={() => {
                                            setImageToAdd('')
                                            setShowAddImageModal(false)
                                        }} title='cancel' />
                                    </SafeAreaView>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </Modal>
                    </View>
                }
                <Text style={{ fontSize: 20 }}>Attendees</Text>
                <View style={styles.listOfUsersContainer}>
                    <ScrollView style={styles.listOfUsers} horizontal={true}>
                        {
                            users.map((user: any, index: number) => {
                                const imageUri = user.user.avatarUrl !== null ? user.user.avatarUrl : ""
                                return index < 40 ?
                                    <View style={styles.user} key={index}>
                                        <Image source={imageUri.length !== 0 ? { uri: user.user.avatarUrl } : null} style={styles.avatar} />
                                        <Text>{`${user.user.firstName.split('#')[0]}`}</Text>
                                    </View> : null
                            })
                        }
                    </ScrollView>
                </View>
                {users.find((relation: any) => relation.user.id === me.id) ?
                    <TouchableOpacity style={styles.attendButton}>
                        <Text style={styles.attendtext}>I'm not going anymore!</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={attend} style={styles.attendButton}>
                        <Text style={styles.attendtext}>I'm going!</Text>
                    </TouchableOpacity>
                }

            </View>

            <Modal
                animationType="slide"
                visible={mapModal}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <SingleEventMap event={event} address={address} mapRegion={mapRegion} setModalVisible={setMapModal} />
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    viewImageContainer: {
        marginTop: Dimensions.get('window').width / 1.5,
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageToView: {
        width: Dimensions.get('window').width / 1.05,
        height: Dimensions.get('window').width / 1.05,
    },
    eventImagesContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        height: Dimensions.get('window').width / 2.1,
        width: Dimensions.get('window').width / 1,
    },
    eventImagesScroll: {
        borderColor: 'lightgray',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: Dimensions.get('window').width / 2.1,
        width: Dimensions.get('window').width / 1,
        padding: 15
    },
    eventImage: {
        height: Dimensions.get('window').width / 2.6,
        width: Dimensions.get('window').width / 2.6,
        margin: 10,
        marginTop: 0
    },
    addImageContainer: {
        marginTop: Dimensions.get('window').width / 1.5,
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImageButtonsContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageToAdd: {
        borderColor: 'black',
        borderWidth: 1,
        width: 300,
        height: 300,
    },
    imageAdder: {

    },
    done: {
        fontSize: 20,
        color: 'teal',
        fontWeight: '500',
    },
    button: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    date: {
        fontSize: 20,
        marginBottom: 2
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 50,

    },
    listOfUsersContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        height: Dimensions.get('window').width / 3.5,
        width: Dimensions.get('window').width / 0.95,
    },
    listOfUsers: {
        borderColor: 'lightgray',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: Dimensions.get('window').width / 3,
        width: Dimensions.get('window').width / 1,
        padding: 15
    },
    user: {
        alignItems: 'center',
        margin: 2,
        marginLeft: 3,
        marginRight: 3
    },
    details: {
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        marginBottom: 5
    },
    descriptionContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 8,
        height: Dimensions.get('window').width / 2.7,
        width: Dimensions.get('window').width / 1.2,
        marginTop: 10,
        marginBottom: 20,
    },
    description: {
        fontSize: 20,
        flexWrap: 'wrap',
        // textAlign: 'center'
    },
    location: {
        fontSize: 30,
        color: 'teal',
        marginBottom: 10
    },
    attendtext: {
        color: 'teal',
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.5,
        padding: 15,
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    attendButton: {
        marginTop: 10,
        borderRadius: 10
    }
});

export default SingleEventDetail;