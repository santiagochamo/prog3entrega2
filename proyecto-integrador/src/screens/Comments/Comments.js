
import React, { Component } from 'react'
import {  db, auth } from '../../firebase/config'
import { Text, View, FlatList, StyleSheet } from 'react-native'

import FormComments from "../../components/FormComments/FormComments"

class Comments extends Component {

    constructor(props){
        super(props)
        this.state = {
            comentarios: [],
            
        }

    }

    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(docs => {
            this.setState({
                comentarios: docs.data().comentarios
            })
        })
        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.tituloComentarios}>Comentarios</Text>
                <FlatList
                style={styles.listaComentarios}
                data={this.state.comentarios}
                keyExtractor={item => item.createdAt.toString()}
                renderItem={({item}) => <Text style={styles.comentarios}>{item.owner}:{item.comentario}</Text>}
                />
               
               
               <FormComments idComment = {this.props.route.params.id} />
       
       
   
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#dedede',
        height: '100%',
    },
    input:{
        height: 15,
        margin: 10 //test nada más
    },
    tituloComentarios:{
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        maxWidth: 500,
        borderWidth: 2,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        fontSize: 30,
        backgroundColor: 'white'
    },
    listaComentarios:{
        alignSelf: 'center',
        maxWidth: 700,
    },
    comentarios:{
        fontSize: 20
    }
})

export default Comments 
