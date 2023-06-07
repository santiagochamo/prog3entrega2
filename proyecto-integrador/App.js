

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeNav from './src/navigation/Home/Home';
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
        name='Register' 
        component={Register}
        options={{
          headerShown:false
        }}
        />

        <Stack.Screen 
          name='Login'
          component={Login}
          options={{
            headerShown:false
          }} 
        />

        <Stack.Screen 
        name='HomeNav' 
        component={HomeNav}
        options={{
          headerShown:false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
