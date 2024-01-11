import React, { useEffect } from 'react';
import Home from './home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import List from './List';
import Login from './login';
import { BackHandler } from 'react-native';

const Tab = createBottomTabNavigator();

const home = 'Home';
const list = 'List';
const login = 'Login';

const navigationRef = React.createRef();

export default function Navbar(){
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          if (navigationRef.current && navigationRef.current.getCurrentRoute().name === 'Navbar') {
            BackHandler.exitApp();
            return true;
          }
          return false;
        });
    
        return () => {
          backHandler.remove();
        };
      }, []);

    return (
        // <NavigationContainer>
            <Tab.Navigator
                initialRouteName={home}
                screenOptions={({route}) =>({
                    tabBarIcon: ({focused, color,size}) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName === home) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (routeName === list){
                            iconName = focused ? 'list' : 'list-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarStyle: {
                        paddingBottom: 20,
                        height: 80,
                    }
                })}>
                

                <Tab.Screen name={home} component={Home} options={{ headerShown: false, tabBarActiveTintColor: "#000" }} />
                <Tab.Screen name={list} component={List} options={{ headerShown: false, tabBarActiveTintColor: "#000" }} />
                {/* <Tab.Screen name={login} component={Login} options={{ headerShown: false, tabBarActiveTintColor: "#000" }} /> */}

            </Tab.Navigator>
        // </NavigationContainer>
    );
}