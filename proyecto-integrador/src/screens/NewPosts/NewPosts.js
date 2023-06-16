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
        <Text style={styles.tituloNewPost}>Create tu posteo</Text>
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
                        <Text style={styles.btnPost}>Hace tu posteo</Text>
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
        flex: 1,
        backgroundColor: '#9db8cc'
    },
    tituloNewPost:{
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '100%',
        minHeight: 50,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
      },
    camara:{
        minHeight: 500,
        width: 500,
        alignSelf: 'center',
    },
    btnPost:{
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        width: 200,
        paddingTop: 4,
        minWidth: 200,
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'white',
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 20,
        marginRight: 10,
    }
})

export default NewPosts