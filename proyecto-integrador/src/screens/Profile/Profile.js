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
               <View style={styles.infoDeUsuario}>
                    <Text style={styles.texto}>Nombre de usuario {this.state.users.nombreUsuario}</Text>
                    <Text style={styles.texto}>Email {this.state.users.email}</Text>
                    <Text style={styles.fotoDePerfil}>Foto de perfil{this.state.users.foto}</Text>
                    <Text style={styles.biografia}>Biografia {this.state.users.biografia}</Text>
                    <Text style={styles.texto}>Cantidad de posteos: {this.state.posts.length}</Text> 
               </View>
                
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
      height: 100,
      marginTop: 20,
    },
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#bd8f8f'
    },
    infoDeUsuario:{
        width: 600,
        marginTop: 20,
        padding: 30,
        borderWidth: 2,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    texto:{
        fontSize: 20
    },
    fotoDePerfil:{
        marginTop: 5,
        marginBottom: 5,
    },
    biografia:{
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: 5,
    },
  })
export default Profile
