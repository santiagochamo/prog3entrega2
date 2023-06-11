import { Text, View, StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import CamaraPost from '../../components/CamaraPost/CamaraPost'
import FormPost from '../../components/FormPost/FormPost'
import { auth, db } from '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'

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
        comentarios: this.state.comentarios,
        created: Date.now()
    })
    .then(()=>
        this.setState({
        descripcion: '',
        foto: '',
        likes: [],
        comentarios: []
    }))
    this.props.navigation.navigate('FunctionalitiesNav')
}

actualizarDescripcionPosteo(text){
    this.setState({
        descripcion: text
    })
}

onImageUpload(url){
    this.setState({
        foto:url,
        
    })
}


  render() {
    return (
      <View style={styles.container}>
        <Text>Create tu posteo</Text>
        <View>
            {
                
                this.state.foto === '' ? 

            <CamaraPost onImageUpload={(url)=>this.onImageUpload(url)}/> 
                :
                
            <>
            <FormPost descripcionPosteo={this.state.descripcion} actualizarDescripcionP={(text) => this.actualizarDescripcionPosteo(text)}/>
    
                
                    <TouchableOpacity onPress={() => this.postear({
                         descripcion:this.state.descripcion,
                         foto:this.state.foto,
                         likes: this.state.likes,
                         comentarios:this.state.comentarios
                    })}>
                        <Text>Hace tu posteo</Text>
                    </TouchableOpacity>
             </>

            }
        </View>
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