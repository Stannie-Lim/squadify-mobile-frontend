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
            if(!cancelled) setImage(uri);
        } catch(err) {
            console.log(err);
        }
    };
    return (
        <View style={ styles.imagecircle }>
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
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    }, 
});

export default ChooseImage;