import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import  { db, auth } from '../../firebase/config'
import firebase from 'firebase'


export default class FormComments extends Component {
    constructor(props){
    super(props)
    this.state={
        comentario: '',
        
    }
    }

    crearComentario(comentario){
        db.collection("posts").doc(this.props.idComment).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                comentario: comentario,
                createdAt: Date.now(),
                owner: auth.currentUser.email
            })
            
        })
        .then(() => {
            this.setState({
                comentario: '',
            })
        })
    }
    

    render() {
        return (
            <View>
               
               <TextInput
               style = {styles.input}
               keyboardType = 'default'
               onChangeText={(text)=> this.setState({comentario:text})}
               value={this.state.comentario}
               placeholder= "Dejá tu comentario"
               />
                
               <TouchableOpacity onPress={()=>this.crearComentario(this.state.comentario)}>
                   <Text>Enviar</Text>
               </TouchableOpacity>
       
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'green',
        marginTop: 24,
        height: 15,
        padding: 5//test nada más
    }
})