
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feed from '../../screens/Feed/Feed';
import MyProfile from '../../screens/MyProfile/MyProfile'
import NewPosts from '../../screens/NewPosts/NewPosts';


const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    <Tab.Navigator>
       <Tab.Screen
        name='Feed'
        component={Feed}
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