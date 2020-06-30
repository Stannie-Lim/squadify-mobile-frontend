import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, TouchableOpacity, Image } from 'react-native';

// images
const noimage = require('../../../assets/images/noimage.jpg');

const ChooseImage = ({ setImage, image }: any) => {
    const pickImage = async () => {
        try {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
            if (!cancelled) setImage(uri);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View style={styles.imagecircle}>
            <TouchableOpacity onPress={pickImage}>
                <Image source={image ? { uri: image } : noimage} style={styles.avatar} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    imagecircle: {
        margin: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
    },
    avatar: {
        height: 130,
        width: 130,
        borderRadius: 70,
    },
});

export default ChooseImage;