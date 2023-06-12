import { Text, View, FlatList, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config'
import Post from '../../components/Post/Post'
import Buscador from "../../components/Buscador/Buscador"

//es un componente de clase --> ya que tenemos que recibir los posteos al inicio del ciclo de vida
 class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts: [],
        }
    }
    
    componentDidMount(){
        db.collection('posts').onSnapshot( docs => { /*agregamos la coleccion inexistente de "posts" a nuestro firebase */
            let arrayPosteos=[] /*creamos un array vacio para posteriormente almacenar los posteos subidos al feed*/

            docs.forEach(doc => arrayPosteos.push({ /*recorremos la coleccion de documentos a fin de pusear, dentro del array de posteos, cada posteo con su id y data determinados*/
                id: doc.id,
                data:doc.data()
            }))
            console.log(arrayPosteos) /*imprimos el array de posteos cargados*/

            this.setState({
                posts: arrayPosteos /*actualizamos el estado con los posteos subidos efectivamente*/
            })
        })
    }
  render() {
    return (
      <View style={styles.vista}>
        <Buscador navigation = {this.props.navigation}/>
        <Text>Feed</Text>
        <FlatList
        data={this.state.posts}     /*recibimos por props la info de los posteos subidos al feed*/
        keyExtractor={(item)=> item.id.toString()} /*pasamos a string el id de cada uno de los posteos*/
        renderItem={({ item }) => <Post postData={ item } navigation={this.props.navigation} /> }/*y por cada item (posteo) vamos a renderizar el componente Post, que por la prop data va a acceder a los atributos necesarios de el posteo especifico*/
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  vista:{
    flex: 1,
  }
})
export default Feed