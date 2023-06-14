import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import Post from '../../components/Post/Post'

class MyProfile extends Component {
    constructor(props){
        super(props)
        this.state ={
            miUser: [],
            posts:[]
        }
    }

    componentDidMount(){
        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let miUsuario = [];
                docs.forEach( doc => {
                    miUsuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    miUser: miUsuario[0].data
                })
            }

        )
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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

    borrarUsuario(){
        db.collection("users").doc(this.props.route.params.id)
        .update({
            users: firebase.firestore.FieldValue.arrayRemove({
                email: auth.currentUser.email
            })
            
        })
        .then(() => {
            this.setState({
                miUser: '',
            })
        })
    }

    logout(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login')) /*tenemos que pasarle las props de navegacion desde alguna screen */
        .catch(err => console.log(err))
    }
  render() {
    return (
      <View style={styles.container}>
        
                <Text>Nombre de usuario {this.state.miUser.nombreUsuario}</Text>
                <Text>Email {this.state.miUser.email}</Text>
                <Text>Biografia {this.state.miUser.biografia}</Text>
                <Text>Foto de perfil{this.state.miUser.foto}</Text>
                <Text>Cantidad de posteos: {this.state.posts.length}</Text>
                <FlatList /*usamos la flatlist aca y no en el componente de datos a fin de poder pasarle props al componente de Post en el renderitem */
                    data={this.state.posts} 
                    keyExtractor={(item)=> item.id.toString()} 
                    renderItem={({ item }) => <Post postData={ item } /> } /*deberiamos recibir las props en Post de tal manera para renderizar los posts del usuario determinado */
                />          

        <TouchableOpacity onPress={()=> this.logout()}><Text>Cerrar sesión </Text></TouchableOpacity>
        <TouchableOpacity><Text>Borrar user </Text></TouchableOpacity>
      
      </View>
    )
  }
}

export default MyProfile

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})