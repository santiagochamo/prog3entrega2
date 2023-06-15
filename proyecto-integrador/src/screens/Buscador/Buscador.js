import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
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
//evitarSubmit(event){
// event.preventDefault()
//}

irAPerfil(user){
  if (user.data.email === auth.currentUser.email) {
      this.props.navigation.navigate('MyProfile')
  } else {
      this.props.navigation.navigate('Profile', { email: user.data.email })
  }
}

buscar(texto){
  //buscar filtra sobre todos los usuarios con respecto a lo que vamos escribiendo y lo guarda en resultado
  let filtrado = this.state.usuarios.filter((elm) => elm.data.email.toLowerCase().includes(texto.toLowerCase()))
  this.setState({
    resultado : filtrado,
    textoIngresado : texto
  })
}
  render() {
    return (
      <View style={styles.buscadorPage}>
        
        <TextInput 
        style={styles.buscador}
        placeholder='Buscá el email'
        keyboardType='email-adress'
        onChangeText={ (texto) => this.buscar(texto)}
        value={this.state.textoIngresado}/>
        
{
  this.state.resultado ==! this.state.textoIngresado ?

      <Text>No encontramos nada</Text>

        :
        <FlatList style={styles.resultadosEstilo}/*usamos la flatlist aca y no en el componente de datos a fin de poder pasarle props al componente de Post en el renderitem */
        data={this.state.resultado} 
        keyExtractor={(item)=> item.id.toString()} 
        renderItem={({ item }) => <Text style={styles.resultadoIndividual}onPress={()=> this.irAPerfil(item)}>{item.data.email}</Text> } /*deberiamos recibir las props en Post de tal manera para renderizar los posts del usuario determinado */
        /> 
        

}
      </View>
      

      //value es el atributo de TextInput en la que se guarda el valor textoIngresado del estado
      //el onChangeText va filtrando lo que va escribiendo el usuario y te trae lo que va coincidiendo
    )
  }
}
const styles = StyleSheet.create({
  buscador: {
      textAlign: 'center',
      alignContent: 'center',
      borderWidth: 2,
      borderRadius: 25,
      marginTop: 100,
      padding: 20,
      fontSize: 30,
      backgroundColor: 'white'
  },
  buscadorPage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c7c7c7'
  },
  resultadosEstilo: {
    marginTop: 30,
    fontSize: 30,
    marginBottom: 30
  },
  resultadoIndividual:{
    marginBottom: 5,
    fontSize: 30,
  }

})


