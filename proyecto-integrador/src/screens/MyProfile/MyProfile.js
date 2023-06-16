import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import { Text, View, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'
import Post from '../../components/Post/Post'
import firebase from 'firebase'

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
        confirm('¿Querés borrar tu usuario?') ?
    
        db.collection("users")
        .doc(this.props.route.params.id)
        .delete()
         .catch(e => console.log(e))   
        
        
    :
    console.log('No se ha podido borrar')
        
    }

    logout(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login')) /*tenemos que pasarle las props de navegacion desde alguna screen */
        .catch(err => console.log(err))
    }
  render() {
    return (
      <View style={styles.miContainer}>

        <View style={styles.infoYBotones}>
            <View style={styles.miInfoDeUsuario}>
            <Text style={styles.miTexto}>Nombre de usuario: {this.state.miUser.nombreUsuario}</Text>
            <Text style={styles.miTexto}>Email: {this.state.miUser.email}</Text>
            <Text style={styles.miFotoDePerfil}>Foto de perfil: {this.state.miUser.foto}</Text>
            <Text style={styles.miBiografia}>Biografia: {this.state.miUser.biografia}</Text>
            <Text style={styles.miTexto}>Cantidad de posteos: {this.state.posts.length}</Text>
            </View>
            <View style={styles.miBotones}>
                <TouchableOpacity onPress={()=> this.logout()}><Text style={styles.miCerrarSesion}>Cerrar sesión</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> this.borrarUsuario()}><Text style={styles.miBorrarUsuario}>Borrar usuario</Text></TouchableOpacity>
            </View>
        </View>

        

        <View style={{flex:1}}>
        <FlatList /*usamos la flatlist aca y no en el componente de datos a fin de poder pasarle props al componente de Post en el renderitem */
                scrollEnabled={true}
                data={this.state.posts} 
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({ item }) => <Post postData={ item } /> } /*deberiamos recibir las props en Post de tal manera para renderizar los posts del usuario determinado */
            /> 
        </View>
            
        
                
        

              

      </View>
    )
  }
}

export default MyProfile

const styles = StyleSheet.create({
    miContainer:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#bd8f8f'
    },
    infoYBotones:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    miInfoDeUsuario:{
        width: 1000,
        padding: 30,
        borderWidth: 2,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    miTexto:{
        fontSize: 20
    },
    listaPosts:{
        flex: 1,
        flexGrow: 1,
    },
    miBotones:{
        width: 200,
        alignItems: 'center',
        marginLeft: 20,
        justifyContent: 'center',
        alignContent: 'center',
        verticalAlign: 'center'

    },
    miCerrarSesion:{
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        paddingTop: 4,
        minWidth: 200,
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#bababa',
    },
    miBorrarUsuario:{
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        paddingTop: 4,
        minWidth: 200,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'white',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#6e2e2e',
        marginTop: 30
    },
    miFotoDePerfil:{
        marginTop: 5,
        marginBottom: 5,
    },
    miBiografia:{
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: 5,
    }

})