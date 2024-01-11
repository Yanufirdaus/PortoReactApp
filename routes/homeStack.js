import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import Login from "../screens/login";
import Signup from "../screens/signup";
import { createAppContainer } from "react-navigation";
import { FIREBASE_AUTH } from '../FirebaseConfig';
import Navbar from "../screens/Navbar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const auth = FIREBASE_AUTH;

const Stack = createNativeStackNavigator()

// const screens = {
//     Login:{
//         screen: Login
//     },
//     Navbar: {
//         screen: Navbar
//     },
//     Signup: {
//         screen: Signup
//     },
//     Home: {
//         screen: Home
//     }
// }

// const HomeStack = createStackNavigator(screens, {
//     defaultNavigationOptions: {
//       headerShown: false
//     },
//     initialRouteName: auth.currentUser ? 'Home' : 'Login'
//   });

// export default createAppContainer(HomeStack);
