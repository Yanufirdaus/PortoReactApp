import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import Signup from './screens/signup';
import Navbar from './screens/Navbar';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Profile from './screens/profile';
import DetaiList from './screens/detailList';
import { FIREBASE_APP, FIREBASE_AUTH } from './FirebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, ImageBackground, StatusBar, Text, View } from 'react-native';
import Follow from './screens/follow';
import DetaiListFollow from './screens/detailListFollow';


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  console.log(user)

  const [fontsLoaded, fontError] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  

  if (loading){
    return <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle="light-content" />
      <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} source={require('./assets/bg_body.png')}>
          <Text style={{fontFamily: 'poppins-bold', fontSize: 30}}>MYPORTOAPPS</Text>
          <ActivityIndicator color= 'black' size={50}/>
      </ImageBackground>

    </View>
  } else {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator initialRouteName= {user ? 'Navbar' : 'Login'}>
          <Stack.Screen name='Navbar' component={Navbar} options={{headerShown: false}}/>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Signup' component={Signup} options={{headerShown: false}}/>
          <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
          <Stack.Screen name='Detail' component={DetaiList} options={{headerShown: false}}/>
          <Stack.Screen name='DetailFollow' component={DetaiListFollow} options={{headerShown: false}}/>
          <Stack.Screen name='Follow' component={Follow} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


