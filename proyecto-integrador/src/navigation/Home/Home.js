
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'



const Tab = createBottomTabNavigator()

export default function Ho24meNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='' 
        component={}
        options={{
         
        }}
        />
        <Tab.Screen
        name=''
        component={}
        options={{
         
      }} 
        />
        <Tab.Screen 
            name=''
            component={}
            options={{
            }}    
        />
    </Tab.Navigator>
  )
}