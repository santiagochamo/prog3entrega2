
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
        name='Feed'
        component={FunctionalitiesNav}
        options={}
         
       
        />
        <Tab.Screen 
        name='NewPost' 
        component={NewPosts}
        options={}
         
        
        />
        <Tab.Screen 
            name='MyProfile'
            component={MyProfile}
            options={}
             
        />
    </Tab.Navigator>
  )
}