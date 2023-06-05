import { Text} from 'react-native'
import React, { Component } from 'react'
import  { db, auth } from '../../firebase/config'
import firebase from 'firebase'



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
        mipropiolike: true,
        cantidaddelikesPosteo: this.state.cantidaddelikesPosteo + 1
    }))
    .catch((err) => console.log(err))
}

dislike(){
    db.collection("posts").doc(this.props.postData.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(() => this.setState({
        mipropiolike: false,
        cantidaddelikesPosteo: this.state.cantidaddelikesPosteo - 1
    }))
    .catch((err) => console.log(err))
}


borrarPosteo() {
    confirm('¿Querés borrar tu posteo?') ?
    db.collection('posteos')
        .doc(this.props.posteoData.id)
        .delete()
        .catch(e => console.log(e))
    :
    console.log('No se ha podido borrar')
}

irAPerfil(){
    //FALTA NAVEGAR HACIA EL PERFIL DEL USUARIO, A LA SCREEN (A SER CREADA)
}

render() {
    return (
        <View style = {styles.container}>

                { this.props.posteoData.data.creador === auth.currentUser.email ?
                    <View style={styles.borrar}>
                        <Text onPress={() => this.borrarPosteo()}>
                            <FontAwesome name="trash-o" size={24} color='black' />
                        </Text>
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.irAPerfil()}>
                        <Text style = {}>{this.props.posteoData.data.owner} </Text>
                    </TouchableOpacity>
                }

           
            <Text > {this.props.posteoData.data.descripcion} </Text>

            <View style = {}>

                <View style= {}>
                    {this.state.mipropioLike ?
                        <TouchableOpacity onPress={() => this.dislike()}>
                            <FontAwesome name="heart" size={24} color="red" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.like()}>
                            <FontAwesome name="heart-o" size={24} color="red" />                      
                        </TouchableOpacity>
                    }
                    <Text style= {}> Likes: {this.state.cantidaddelikesPosteo} </Text>
                </View>

                

            </View>


        </View>

    )
}
}

const styles = StyleSheet.create({

})

/* <View style = {}>
<TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", { id: this.props.posteoData.id })}>
<FontAwesome name="comment-o" size={24} color="" />
</TouchableOpacity> 
<Text  style= {}> Comentarios: {this.state.comentarios.length} </Text>
</View> 
LOGICA PARA REDIRECCIONAR A LOS COMENTARIOS, LINEA 100, LA APLICAMOS UNA VEZ CREADA LA SCREEN DE COMMENTS*/


export default Post