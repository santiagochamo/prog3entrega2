import { Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import React, { Component } from 'react'
import  { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'
import FormComments from '../FormComments/FormComments'



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
        <View>
                
                { 
                 this.props.postData.data.owner === auth.currentUser.email ?
                    <View >
                        <TouchableOpacity onPress={() => this.irAPerfil()}>
                            <Text>{this.props.postData.data.owner} </Text>
                        </TouchableOpacity>
                        <Text onPress={() => this.borrarPosteo()}>
                            <FontAwesome name="trash-o" size={24} color='black' />
                        </Text>
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.irAPerfil()}>
                        <Text>{this.props.postData.data.owner} </Text>
                    </TouchableOpacity>
                }

            <Image
                    style={styles.img}
                    source={{ uri: this.props.postData.data.foto }}
                    resizeMode='cover'
            />
            <Text > {this.props.postData.data.descripcion} </Text>

            <View >

                <View >
                    {this.state.mipropiolike ?
                        <TouchableOpacity onPress={() => this.dislike()}>
                            <FontAwesome name="heart" size={24} color="red" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.like()}>
                            <FontAwesome name="heart-o" size={24} color="red" />                      
                        </TouchableOpacity>
                    }
                    <Text > Likes: {this.state.cantidaddelikesPosteo} </Text>
                </View>
                <View>

                <FormComments />
                </View>
                

            </View>


        </View>

    )
}
}

const styles  = StyleSheet.create({
    img:{
      height: 200
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