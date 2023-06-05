import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from "../screens/Feed/Feed"
import Comments from "../screens/Comments/Comments"

const Stack = createNativeStackNavigator()

function FunctionalitiesNav() {
  return (
    <NavigationContainer>
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
        name='HomeNav' 
        component={}
        options={{
          headerShown:false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}

export default FunctionalitiesNav