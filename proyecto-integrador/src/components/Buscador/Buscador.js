import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {auth, db} from '../../firebase/config'

//tengo que crear un text input en el que pongas el username del usuario y te lo busque (mirar el repo de nuestro primer proyecto)
export default class Buscador extends Component {
  constructor(props)
  super(props)
  render() {
    //hacer this.state (sin informacion para que despues cuando le cargues info te la de)
    //¿habria que crear un .then para despues por si nos tira error?
    return (
      <View>
        <Text>Busca a tu amigo:</Text>
        <TextInput 
        style={styles.buscador}
        placeholder='Nombre de usuario'
        keyboardType='default'
        onChangeText={ (texto) => {
        this.setState
        ({
          username: texto
        })
        }}
        value={this.state.username}/>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  buscador: {
      borderWidth:1,
      borderColor:'#3d3d3d',
      marginTop: 24,
      height: 24,
      padding: 5
  }
})

//exportar este buscador al home o al feed
