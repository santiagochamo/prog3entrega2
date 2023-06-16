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
               onChangeText={(text)=> this.setState({comentario: text})}
               value={this.state.comentario}
               placeholder= "Dejá tu comentario"
               />
                {
                    this.state.comentario == '' ?
                    <TouchableOpacity>
                   <Text style={styles.botonEnviar}>Enviar</Text>
               </TouchableOpacity>
                :
               <TouchableOpacity onPress={()=>this.crearComentario(this.state.comentario)}>
                   <Text style={styles.botonEnviar}>Enviar</Text>
               </TouchableOpacity>
                }
       
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 2,
        borderColor:'black',
        minWidth: 700,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 24,
        height: 50,
        fontSize: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
    },
    botonEnviar:{
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
        backgroundColor: '#bababa',
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 20
    }
})