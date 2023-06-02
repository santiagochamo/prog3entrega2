import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Post from './Post'

export default function Posteos(props) { /*empleamos un componente funcional debido a que no tratamos con metodos ni ciclos de vida */
  return (
    <View>
      <FlatList
        data={props.data} /*recibimos por props la info de los posteos subidos al feed*/
        keyExtractor={(item)=> item.id.toString()} /*pasamos a string el id de cada uno de los posteos*/
        renderItem={({ item }) => <Post postData={ item } /> }/*y por cada item (posteo) vamos a renderizar el componente Post, que por la prop data va a acceder a los atributos necesarios de el posteo especifico*/
      />
    </View>
  )
}