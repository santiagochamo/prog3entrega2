import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import ProfileData from '../../components/ProfileData/ProfileData'
import Post from '../../components/Post/Post'
import Posteos from '../../components/Post/Post'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts:[],
            users:[]
        }
    }
    componentDidMount(){
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let usuarios = [];
                docs.forEach( doc => {
                    usuarios.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    users: usuarios
                })
            }

        )
        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach( doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posteos
                    
                })
               
            }

        )
    }
    render() {
        return (
            <View>
                 {
                        this.state.usuario.foto !== '' ?
                            <Image
                                style={}
                                source={{ uri: this.state.usuario.foto }}
                                resizeMode='contain'
                            />
                            :
                            <Text>Este usuario no tiene foto de perfil!</Text>

                }
                {
                    this.state.usuarios !== '' ?
               <>
                <Text>Nombre de usuario {this.state.users.nombreUsuario}</Text>
                <Text>Email {this.state.users.email}</Text>
                <Text>Biografia {this.state.users.biografia}</Text>
                <Text>Foto de perfil{this.state.users.foto}</Text>
                <Text>Cantidad de posteos: {this.state.posts.length}</Text> 
                </>

                :

                <Text>No hemos podido encontrar e usuario que buscabas!</Text>
                
                }
                {
                    this.state.posts.length >= 1 ?

                    <FlatList /*usamos la flatlist aca y no en el componente de datos a fin de poder pasarle props al componente de Post en el renderitem */
                    data={this.state.posts} 
                    keyExtractor={(item)=> item.id.toString()} 
                    renderItem={({ item }) => <Post postData={ item } navigation={this.props.navigation}/> } /*deberiamos recibir las props en Post de tal manera para renderizar los posts del usuario determinado */
                    /> 

                :

                    <Text>Este usuario no tiene publicaciones</Text>
                
                }
                
            </View>
        )
    }
}

export default Profile
