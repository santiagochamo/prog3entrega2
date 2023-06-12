
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MyProfile from '../../screens/MyProfile/MyProfile'
import NewPosts from '../../screens/NewPosts/NewPosts'
import FunctionalitiesNav from '../FunctionailitiesNav'
import Buscador from '../../screens/Buscador/Buscador'
import { AntDesign } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

function HomeNav(){

  return (
    <Tab.Navigator>
       <Tab.Screen
        name='Feed'
        component={FunctionalitiesNav}
        options={{
          headerShown:false,
          tabBarIcon: () => 
            <AntDesign name='home' color='green' size={24} />
        }}
         
       
        />
        <Tab.Screen 
        name='Buscador' 
        component={Buscador}
        options={{
          headerShown:false,
          tabBarIcon: () => 
            <AntDesign name="search1" color='grey' size={24} />
        }}
         
        
        />
        <Tab.Screen 
        name='NewPost' 
        component={NewPosts}
        options={{
          headerShown:false,
          tabBarIcon: () => 
            <AntDesign name='plus' color='blue' size={24} />
        }}
         
        
        />
        <Tab.Screen 
            name='Perfil'
            component={MyProfile}
            options={{
              headerShown:false,
              tabBarIcon: () => 
            <AntDesign name='profile' color='red' size={24} />
            }}
             
        />
    </Tab.Navigator>
  )
}

export default HomeNav