import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

const IouCard = ({ user, color }: any) => {
    const you = user.owe;
    let owedtoyou, totalowed;
    if(you) {
        owedtoyou = user.owe.reduce((acc: number, now: any) => acc += now.theyOweYou, 0);
        totalowed = user.owe.reduce((acc: number, now: any) => acc += now.youOweThem, 0);
    }
    return (
        <View style={ you ? styles.youcontainer : {...styles.container, backgroundColor: color} }>
            {
                you ? 
                <View style={ styles.owe }>
                    <TouchableOpacity onPress={ () => alert('filter') }>
                    <Text style={ styles.bar }>Filter</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={ () => alert('add') }>
                        <MaterialIcons size={100} name='add-circle-outline' style={ styles.bar } />
                    </TouchableOpacity>
                </View> : 
                <Text></Text>
            }
            <Image style={ styles.avatar } source={{ uri: user.avatar }} />
            <Text style={ styles.name }>{`${user.firstName} ${user.lastName}`}</Text>
            {
                you ? 
                <View style={ styles.owe }>
                    <View style={ styles.owes }>
                        <Text>OWED TO YOU</Text>
                        <Text style={ styles.oweText }>{ `$${ owedtoyou }` }</Text>
                    </View>
                    <View style={ styles.owes }>
                        <Text>YOU OWE OTHERS</Text>
                        <Text style={ styles.oweText }>{ `$${ totalowed }` }</Text>
                    </View>
                </View>
                : 
                <View style={ styles.owe }>
                    <View style={ styles.owes }>
                        <Text>OWE THEM</Text>
                        <Text style={ styles.oweText }>{ `$${ user.youOweThem }` }</Text>
                    </View>
                    <View style={ styles.owes }>
                        <Text>OWE YOU</Text>
                        <Text style={ styles.oweText }>{ `$${ user.theyOweYou }` }</Text>
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    youcontainer: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'grey',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        // position: 'absolute',
    },
    container: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 30,
        padding: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 30,
    },
    owe: {
        flexDirection: 'row',
    },
    owes: {
        alignItems: 'center',
        marginLeft: 80,
        marginRight: 80,
    },
    oweText: {
       fontSize: 30,
    },
    bar: {
        fontSize: 20,
        marginLeft: 130,
        marginRight: 130,
        color: 'white',
    }
});

export default IouCard;