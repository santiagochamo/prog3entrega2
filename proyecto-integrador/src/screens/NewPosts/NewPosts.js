import { Text, View } from 'react-native'
import React, { Component } from 'react'
import CamaraPost from '../components/CamaraPost/CamaraPost'

class NewPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion: '',
            foto: '',
            likes: [],
            comments: []
        }
    }

    actualizarDescripcion(text){
        this.setState({
            descripcion: text
        })
    }

    actualizarEstadoFoto(urlFoto){
        this.setState({
            foto: urlFoto
        })
    }

  render() {
    return (
      <View>
        <Text>NewPosts</Text>
      </View>
    )
  }
}

// this.state.foto === '' ?
// <Camara 
//  actualizadorEstadoFoto = {
//  (urlFoto) => this.actualizarEstadoFoto(urlFoto)/> }
// :
// (todo el <FormPost>)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camara:{
        height: 250
    }
})

export default NewPosts