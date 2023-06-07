import { Text, View, StyleSheet,TextInput} from 'react-native'
import React, { Component } from 'react'
import CamaraPost from '../../components/CamaraPost/CamaraPost'
import { auth, db } from '../../firebase/config'

class NewPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion: '',
            foto: '',
            likes: [],
            comentarios: [],
            mostrarCamara: true,
        }
    }


postear(){

    db.collection("posts").add({
        owner: auth.currentUser.email,
        foto: this.state.foto,
        descripcion: this.state.descripcion, 
        likes: this.state.likes, 
        comentarios: this.state.comments,
        created: Date.now()
    })
    .then(()=>
        this.setState({
        descripcion: '',
        foto: '',
        likes: [],
        comentarios: []
    }))
    this.props.navigation.navigate("Feed")
}

onImageUpload(url){
    this.setState({
        foto:url,
        mostrarCamara: false,
    })
}


  render() {
    return (
      <View>
        <Text>Create tu posteo</Text>

        {
            this.state.mostrarCamara ? 

           <CamaraPost onImageUpload={url=>this.onImageUpload(url)}/> /*a desarrollar el componente de camara*/
            :
        <View>

                <TextInput 
                   
                    placeholder='AGREGA UNA DESCRIPCION'
                    keyboardType='default'
                    onChangeText={ (texto) => {
                        this.setState({
                            descripcion: texto
                        })
                    }}
                    value={this.state.descripcion}
                />

                <TouchableOpacity onPress={() => this.postear()}>
                    Hace tu posteo
                </TouchableOpacity>

        </View>





        }



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