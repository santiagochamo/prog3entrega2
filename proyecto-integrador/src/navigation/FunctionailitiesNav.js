import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Feed from "../screens/Feed/Feed"
import Comments from "../screens/Comments/Comments"
import Profile from '../screens/Profile/Profile'
import MyProfile from '../screens/MyProfile/MyProfile'

const Stack = createNativeStackNavigator()

function FunctionalitiesNav() {
  return (
    
      <Stack.Navigator>

        <Stack.Screen 
        name='Feed' 
        component={Feed}
        options={{
          headerShown:false
        }}
        />

        <Stack.Screen 
          name='Comments'
          component={Comments}
          options={{
            headerShown:false
          }} 
        />
        <Stack.Screen 
          name='Profile'
          component={Profile}
          options={{
            headerShown:false
          }} 
        />
        <Stack.Screen 
            name='MyProfile'
            component={MyProfile}
            options={{
              headerShown:false,
              
            }}
             
        />
        
      </Stack.Navigator>
      
  );
}

export default FunctionalitiesNav