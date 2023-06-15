import { Text, StyleSheet, View, TouchableOpacity, Image, FlatList} from 'react-native'
import React, { Component } from 'react'
import  { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'




/*falta funcionalidad de like/dislike, en base al usuario determinado que likea */
/*falta funcionalidad de redireccionar al perfil */
class Post extends Component {

  constructor(props){
    super(props)
    this.state={
    cantidaddelikesPosteo: this.props.postData.data.likes.length,
    mipropiolike: false,
    comentarios: this.props.postData.data.comentarios,
    }
  }

componentDidMount(){
    if(this.props.postData.data.likes.includes(auth.currentUser.email) ){
        this.setState({
            mipropiolike: true
        })
    }
}

like(){
    db.collection("posts").doc(this.props.postData.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(() => this.setState({
        
        cantidaddelikesPosteo: this.state.cantidaddelikesPosteo + 1,
        mipropiolike: true,
    }))
    .catch((err) => console.log(err))
}

dislike(){
    db.collection("posts").doc(this.props.postData.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(() => this.setState({
        
        cantidaddelikesPosteo: this.state.cantidaddelikesPosteo - 1,
        mipropiolike: false,
    }))
    .catch((err) => console.log(err))
}


borrarPosteo() {
    confirm('¿Querés borrar tu posteo?') ?
    db.collection('posts')
        .doc(this.props.postData.id)
        .delete()
        .catch(e => console.log(e))
    :
    console.log('No se ha podido borrar')
}

irAPerfil(){
    if (this.props.postData.data.owner === auth.currentUser.email) {
        this.props.navigation.navigate('MyProfile')
    } else {
        this.props.navigation.navigate('Profile', { email: this.props.postData.data.owner })
    }
}

render() {
    return (
        <View style={styles.postEntero}>
                
                { 
                 this.props.postData.data.owner === auth.currentUser.email ?
                    <View >
                        <TouchableOpacity onPress={() => this.irAPerfil()}>
                            <Text style={styles.nameEstilo}>{this.props.postData.data.owner} </Text>
                        </TouchableOpacity>
                        <Text onPress={() => this.borrarPosteo()}>
                            <FontAwesome name="trash-o" size={24} color='black' />
                        </Text>
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.irAPerfil()}>
                        <Text style={styles.nameEstilo}>{this.props.postData.data.owner} </Text>
                    </TouchableOpacity>
                }

            <Image
                    style={styles.img}
                    source={{ uri: this.props.postData.data.foto }}
                    resizeMode='cover'
            />
            <Text style={styles.descripcionEstilo}> {this.props.postData.data.descripcion} </Text>

            <View >

                <View >
                    {this.state.mipropiolike ?
                        <TouchableOpacity onPress={() => this.dislike()}>
                            <FontAwesome style={styles.likeSimbolo} name="heart" size={24} color="red" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.like()}>
                            <FontAwesome style={styles.likeSimbolo} name="heart-o" size={24} color="red" />                      
                        </TouchableOpacity>
                    }
                    <Text style={styles.likesEstilo}> Likes: {this.state.cantidaddelikesPosteo} </Text>
                </View>
                <View>
                    <View style={styles.comentariosEstilo}>
                    <FlatList
                        data={this.state.comentarios.slice(-4)}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({item}) => <Text style={styles.comentarioIndividual}>{item.owner}: {item.comentario}</Text>}
                />
                    </View>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('Comments', {id: this.props.postData.id})}
                >
                <Text style={styles.agregarComentarioEstilo}>Agregar comentario</Text>
              </TouchableOpacity>
                </View>
                

            </View>


        </View>

    )
}
}

const styles  = StyleSheet.create({
    postEntero:{
        alignSelf: 'center',
        alignItems: 'center',
        minWidth: 550,
        borderWidth: 2,
        borderColor: '#3d3d3d',
        maxWidth: 550,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    img:{
        width: 500,
        height: 500,
        alignSelf: 'center'
    },
    descripcionEstilo:{
        alignSelf: 'center',
        fontStyle: 'italic',
        marginTop: 10,
        marginBottom: 10,
    },
    comentariosEstilo:{
        width: 500,
        borderWidth:1,
        borderColor:'#3d3d3d',
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#dedede'
    },
    likeSimbolo:{
        marginLeft: 10,
        marginBottom: 5,
    }, 
    likesEstilo:{
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    nameEstilo:{
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    agregarComentarioEstilo:{
        marginTop: 10,
        marginLeft: 10,
        fontWeight: '500',
        marginBottom: 30,
    }
  })

/* <View style = {}>
<TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", { id: this.props.posteoData.id })}>
<FontAwesome name="comment-o" size={24} color="" />
</TouchableOpacity> 
<Text  style= {}> Comentarios: {this.state.comentarios.length} </Text>
</View> 
LOGICA PARA REDIRECCIONAR A LOS COMENTARIOS, LINEA 100, LA APLICAMOS UNA VEZ CREADA LA SCREEN DE COMMENTS*/


export default Post