
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feed from '../../screens/Feed';
import Profile from '../../screens/Profile'
import NewPosts from '../../screens/NewPosts';


const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='NewPost' 
        component={NewPosts}
        options={}
         
        
        />
        <Tab.Screen
        name='Feed'
        component={Feed}
        options={}
         
       
        />
        <Tab.Screen 
            name='MyProfile'
            component={Profile}
            options={}
             
        />
    </Tab.Navigator>
  )
}