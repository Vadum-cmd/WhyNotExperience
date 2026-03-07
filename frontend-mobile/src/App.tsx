import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthProvider} from './contexts/AuthContext';
import HomeScreen from './screens/HomeScreen';
import BoatListScreen from './screens/BoatListScreen';
import BoatDetailScreen from './screens/BoatDetailScreen';
import ExperienceSelectionScreen from './screens/ExperienceSelectionScreen';
import BookingScreen from './screens/BookingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{title: 'BOAT'}} />
          <Stack.Screen name="BoatList" component={BoatListScreen} options={{title: 'Boats'}} />
          <Stack.Screen name="BoatDetail" component={BoatDetailScreen} options={{title: 'Boat Details'}} />
          <Stack.Screen name="ExperienceSelection" component={ExperienceSelectionScreen} options={{title: 'Choose Experience'}} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{title: 'Complete Booking'}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Register'}} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

