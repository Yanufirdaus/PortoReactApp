import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { StackActions } from 'react-navigation';

export default function Signup({ navigation }){
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const firestore = FIREBASE_FIRESTORE;

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const Signup = async () => {
    setLoading(true);
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);

        const userDocRef = await addDoc(collection(firestore, 'users'), {
            email: email,
            username: userName, // Assuming you have a variable named 'username'
          });

        console.log(response);
        console.log('Firestore document ID:', userDocRef.id);

        navigation.replace('Login')

        showToast('Signup Berhasil')
    } catch (error){
        console.log(error);
        showToast(error.message)
    } finally {
        setLoading(false);
    }
  }

  const handleUsername = (inputText) => {
    setUsername(inputText);
  };
  const handlePassword = (inputText) => {
    setPassword(inputText);
  };
  const handleEmail = (inputText) => {
    setEmail(inputText);
  };

  const handleLoginPress = () => {
    navigation.navigate('Login')
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg_body.png')} resizeMode='cover' style={styles.container}>
        <Text style= {styles.title}>MYPORTOAPPS</Text>
        <Text style= {styles.subtitle}>Signup</Text>
        <TextInput
          placeholder="Email"
          onChangeText={handleEmail}
          value={email}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Username"
          onChangeText={handleUsername}
          value={userName}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Password"
          onChangeText={handlePassword}
          value={password}
          style={styles.inputText}
          secureTextEntry
        />
        <View style={styles.btnsignup}>
          <Button title='Signup' onPress={
            // handleButtonPress
            Signup
          } color={'#30495C'}/>
        </View>
        {loading && <ActivityIndicator size="large" color="#000" />}
        <View style={styles.row}>
          <Text style={styles.textquestion}>Sudah memiliki akun ? </Text>
          <Text style={styles.textlogin} onPress={
            handleLoginPress
          }>
            Login
          </Text>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    inputText: {
      width: '60%',
      height: 40, 
      borderColor: 'gray',
      borderWidth: 1, 
      marginBottom: 25, 
      paddingLeft: 10,
      borderRadius: 15
    },
    row: {
      flexDirection: 'row',
    },
    title: {
      fontSize: 30,
      fontFamily: 'poppins-bold'
    },
    subtitle: {
      fontSize: 25,
      fontFamily: 'poppins-regular',
      fontWeight: '800',
      marginVertical: 50
    },
    btnsignup: {
      marginTop: 50,
      marginBottom: 35,
      width: 85,
      borderRadius: 15,
      overflow: 'hidden'
    },
    textquestion: {
      fontFamily: 'poppins-regular'
    },
    textlogin: {
      fontFamily: 'poppins-regular',
      fontWeight: '700'
    },
  }
);