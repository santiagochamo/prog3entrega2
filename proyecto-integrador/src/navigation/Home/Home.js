
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import MyProfile from '../../screens/MyProfile/MyProfile'
import NewPosts from '../../screens/NewPosts/NewPosts';
import FunctionalitiesNav from '../FunctionailitiesNav';


const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    <Tab.Navigator>
       <Tab.Screen
        name='FunctionalitiesNav'
        component={FunctionalitiesNav}
        options={{
          headerShown:false
        }}
         
       
        />
        <Tab.Screen 
        name='NewPost' 
        component={NewPosts}
        options={{
          headerShown:false
        }}
         
        
        />
        <Tab.Screen 
            name='MyProfile'
            component={MyProfile}
            options={{
              headerShown:false
            }}
             
        />
    </Tab.Navigator>
  )
}