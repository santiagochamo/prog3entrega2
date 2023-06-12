import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {auth, db} from '../../firebase/config'

//tengo que crear un text input en el que pongas el username del usuario y te lo busque (mirar el repo de nuestro primer proyecto)
export default class Buscador extends Component {
  constructor(props){
    super(props)
    this.state = {
      textoIngresado : "",
      usuarios : [],
      resultado : []
    }
  } 
  componentDidMount(){
    //traemos los usuarios de la base de datos
    db.collection("users")
    .onSnapshot ( docs => {
      let arrUsers=[]

      docs.forEach(doc => { arrUsers.push({
        id: doc.id,
        data:doc.data()
      })

})
    this.setState({
      usuarios : arrUsers
    })
    //guardamos el arrUsers (todos los usuarios) que trajiste del firebase y los guardas en usuarios[]
  })
  
}

buscar(texto){
  //buscar filtra sobre todos los usuarios con respecto a lo que vamos escribiendo y lo guarda en resultado
  let filtrado = this.state.usuarios.filter((elm) => elm.data.nombreUsuario.toLowerCase().includes(texto.toLowerCase()))
  this.setState({
    resultado : filtrado,
    textoIngresado : texto
  })
}
  render() {
    return (
      <View>
        <Text>Busca a tu amigo:</Text>
        <TextInput 
        style={styles.buscador}
        placeholder='Nombre de usuario'
        keyboardType='default'
        onChangeText={ (texto) => this.buscar(texto)}
        value={this.state.textoIngresado}/>
        {/* poner una flatlist con los resultados */}
        {/* poner un if que si lo que pusiste no coincide o esta vacio te lo diga y sino la flatlist*/}
      </View>

      //value es el atributo de TextInput en la que se guarda el valor textoIngresado del estado
      //el onChangeText va filtrando lo que va escribiendo el usuario y te trae lo que va coincidiendo
    )
  }
}
const styles = StyleSheet.create({
  buscador: {
      flex: 1
  }
})

//exportar este buscador al home o al feed
