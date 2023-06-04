import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class MyProfile extends Component {

    logout(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login')) /*tenemos que pasarle las props de navegacion desde alguna screen */
        .catch(err => console.log(err))
    }
  render() {
    return (
      <View>
        
        <TouchableOpacity onPress={()=> this.logout()}><Text>Cerrar sesión </Text></TouchableOpacity>
      
       
        
      </View>
    )
  }
}

export default MyProfile