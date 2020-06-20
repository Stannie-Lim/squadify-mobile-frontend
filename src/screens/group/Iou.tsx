import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage } from 'react-native';

// components
import IouCard from '../../cards/IouCard';

const Iou = () => {
    const [ user, setUser ] = useState({});

    useEffect(() => {
        const getUser = async() => {
            const token = await AsyncStorage.getItem('token');
            // console.log(token);
            // console.log(`${API_URL}/auth/me`);
            try { 
                const me = (await axios.get(`${API_URL}/auth/me`, { headers: { Authorization: token }})).data;
                // console.log(me);
                setUser(me);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, []);

    const you = {
        ...user,
        highScore: '$50.00',
        owe: [
            { firstName: 'Josh', lastName: 'Buchman', youOweThem: 50, theyOweYou: 300, avatarUrl: 'https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png' },
            { firstName: 'Thomas', lastName: 'Kassa', youOweThem: 100, theyOweYou: 0, avatarUrl: 'https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png' },
            { firstName: 'Thomas', lastName: 'Kassa', youOweThem: 100, theyOweYou: 0, avatarUrl: 'https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png' },
            { firstName: 'Thomas', lastName: 'Kassa', youOweThem: 100, theyOweYou: 0, avatarUrl: 'https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png' },
            { firstName: 'Thomas', lastName: 'Kassa', youOweThem: 100, theyOweYou: 0, avatarUrl: 'https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png' },
            { firstName: 'Josh', lastName: 'Buchman', youOweThem: 50, theyOweYou: 300, avatarUrl: 'https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png' },
            { firstName: 'Josh', lastName: 'Buchman', youOweThem: 50, theyOweYou: 300, avatarUrl: 'https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png' },
        ],
    };
    const colors = ['seagreen', 'purple', 'red', 'blue', 'tomato', 'dodgerblue', 'yellow'];
    return (
        <SafeAreaView>
            {
                you && <IouCard user={ you } />
            } 
            <ScrollView style={{ height: Dimensions.get('window').height / 1.8, }}>  
                {
                    you && you.owe.map((user, index) => <IouCard key={ index } color={ colors[index] } user={ user } /> )
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default Iou;