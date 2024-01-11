import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Button, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { FIREBASE_APP, FIREBASE_AUTH } from '../FirebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getApp, getAuth } from "../FirebaseConfig.ts";


export default function Home({navigation}){

    // const [user, setUser] = useState(null);
    // console.log(getAuth())
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     // If the user is logged in, navigate to the homepage
//     if (user) {
//         console.log(us)
//       navigation.navigate('Navbar');
//     }
//   }, [user, navigation]);

    const IconButton = ({ iconName, onPress}) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name={iconName} size={30} color="#fff" />
            </View>
        </TouchableOpacity>
      );
    
    const handleLogout = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            console.log('User signed out successfully');
          } catch (error) {
            console.error('Error signing out:', error.message);
          }

        // auth.signOut;
        // navigation.navigate('Login')
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [StackActions.replace({ routeName: 'Login' })],
        //   });
        
        //   navigation.dispatch(resetAction);
        navigation.replace('Login')
      };
    

    const handleProfile = ()  => {
        navigation.navigate('Profile')
    }
    return(
        <View style={ styles.container }>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={require('../assets/bg_body.png')} resizeMode='cover' style={styles.container}>
                <View style={ styles.headers }>
                    <ImageBackground source={require('../assets/bg_header.png')} resizeMode='cover' style={styles.headers}>
                        <View style={ styles.headers_top }>
                            <View style={styles.iconContainer}>
                                <IconButton iconName={'person-outline'} onPress={handleProfile}/>
                            </View>
                            <View style={styles.iconContainer}>
                                <IconButton iconName={'log-out-outline'} onPress={handleLogout}/>
                            </View>
                        </View>
                        <View style={ styles.headers_content }>
                            <Text style={styles.headers_text_big}>WELCOME</Text>
                            <Text style={styles.headers_text_big}>TO</Text>
                            <Text style={styles.headers_text_big}>MYPORTOAPPS</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={ styles.content }>
                    <Text style={{textAlign: 'center', fontFamily: 'poppins-regular', fontSize: 10}}>
                        This apps was made for internship submission{'\n'}
                        Enjoy to explore this apps{'\n'}
                        You can also use the github user list feature in the list menu{'\n'}
                        hope you like it!
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headers: {
        // backgroundColor: 'black',
        width: '100%',
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 175,
        borderBottomRightRadius: 175,
        overflow: 'hidden'
    },
    content: {
        width: '65%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headers_top: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconContainer: {
        marginHorizontal: 5,
        marginVertical: 10
    },
    headers_content: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    headers_text: {
        color: 'white',
        textAlign: 'center'
    },
    headers_text_big: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'poppins-bold'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
  }
);