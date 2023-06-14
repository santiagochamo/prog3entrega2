import React, { Component } from 'react'
import { db } from '../../firebase/config'
import { Text, View, FlatList, StyleSheet, Image} from 'react-native'
import Post from '../../components/Post/Post'


class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts:[],
            users:[]
        }
    }
    componentDidMount(){
        db.collection('users').where('email', '==', this.props.route.params.email).onSnapshot(
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
            <View style={styles.container}>
                 {
                        this.state.users.foto !== '' ?
                            <Image
                                style={styles.img}
                                source={{ uri: this.state.users.foto }}
                                resizeMode='contain'
                            />
                            :
                            <Text>Este usuario no tiene foto de perfil!</Text>

                }
                {
                    this.state.users !== '' ?
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

const styles  = StyleSheet.create({
    img:{
      height: 200
    },
    container:{
        flex: 1,
    }
  })
export default Profile
