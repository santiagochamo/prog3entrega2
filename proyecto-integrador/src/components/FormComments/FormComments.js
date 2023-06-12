import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import  { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'

export default class FormComments extends Component {
    constructor(props){
    super(props)
    this.state={
        comentario: ''
    }
    }

    crearComentario(){
        db.collection('posts').doc(this.props.postData.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                descripcion: comentario,
                createdAt: Date.now(),
                owner: auth.currentUser.email
            })
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments')}>
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
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        margin: 10 //test nada más
    }
})