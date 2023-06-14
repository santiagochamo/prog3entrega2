
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
            <View>
                <Text>Comentarios</Text>
                <FlatList
                data={this.state.comentarios}
                keyExtractor={item => item.createdAt.toString()}
                renderItem={({item}) => <Text>{item.owner}:{item.comentario}</Text>}
                />
               
               
               <FormComments idComment = {this.props.route.params.id} />
       
       
   
            </View>
        )
    }
}


const styles = StyleSheet.create({
    input:{
        height: 15,
        margin: 10 //test nada más
    }
})

export default Comments 
