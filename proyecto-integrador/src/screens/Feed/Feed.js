import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Posteos from '../components/Posteos'


//es un componente de clase --> ya que tenemos que recibir los posteos al inicio del ciclo de vida
 class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts: []
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
      <View>
        <Text>Feed</Text>
        <Posteos
            data={this.state.posts} /*por medio de la prop "data", le pasamos al componente de "Posteos" el estado con los posteos subidos al feed */ 
        />
      </View>
    )
  }
}

export default Feed
