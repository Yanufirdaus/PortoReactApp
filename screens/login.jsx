import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button,  ToastAndroid, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);


  const auth = FIREBASE_AUTH;

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const Login = async () => {
    setLoading(true);
    try{
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);

        setUser(response.user)

        AsyncStorage.setItem('userData', JSON.stringify(user));
        
        navigation.replace('Navbar')
        showToast('Login Berhasil')
    } catch (error){
        console.log(error);
        showToast(error.message)
    } finally {
        setLoading(false);
    }
  }

  const handleEmail = (inputText) => {
    setEmail(inputText);
  };
  const handlePassword = (inputText) => {
    setPassword(inputText);
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg_body.png')} resizeMode='cover' style={styles.container}>
        <Text style={styles.title}>MYPORTOAPPS</Text>
        <Text style={styles.subtitle}>Login</Text>
        <TextInput
          placeholder="Email"
          onChangeText={handleEmail}
          value={email}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Password"
          onChangeText={handlePassword}
          value={password}
          style={styles.inputText}
          secureTextEntry
        />
        <View style={styles.btnlogin}>
          <Button title='Login' onPress={
            Login
          } color={'#30495C'}/>
        </View>
        
        {loading && <ActivityIndicator size="large" color="#000" />}
        <View style={styles.row}>
          <Text style={styles.textquestion}>Belum memiliki akun ? </Text>
          <Text style={styles.textlogin} onPress={
            handleSignupPress
          }>
            Signup
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
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
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
    btnlogin: {
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