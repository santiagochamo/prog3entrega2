import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator()

export default function FunctionalitiesNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
        name='' 
        component={}
        options={{
          headerShown:false
        }}
        />

        <Stack.Screen 
          name=''
          component={}
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
