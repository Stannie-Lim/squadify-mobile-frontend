import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

const ChooseImage = ({ setImage }: any) => {
    const pickImage = async () => {
        try {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
            // const file = {
            //     uri,
            //     name: , 
            //     type: 'image/png',
            // };
            // const config = {
            //     keyPrefix: 's3/',
            //     bucket: 'spicecurlsproducts',
            //     region: REGION,
            //     accessKey: ACCESS_KEY_ID,
            //     secretKey: SECRET_ACCESS_KEY,
            //     successActionStatus: 201,
            // };
            
            // const imageurl = await RNS3.put(file, config);
            // console.log(imageurl);
            // console.log(uri);
            if(!cancelled) setImage(uri);
        } catch(err) {
            console.log(err);
        }
    };
    const takeImage = async () => {
        try {
            await Permissions.askAsync(Permissions.CAMERA);
            const { cancelled, uri } = await ImagePicker.launchCameraAsync({ allowsEditing: false });
            const file = {
                uri,
                type: 'image/png',
            };
            if(!cancelled) setImage(file);
        } catch(err) {
            console.log(err);
        }
    };
    return (
        <SafeAreaView>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <Button title="Take a picture" onPress={takeImage} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
});

export default ChooseImage;