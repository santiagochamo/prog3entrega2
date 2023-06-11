import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class FormPost extends Component {

    constructor(props){
        super(props)
    }
  
    render() {
        return (
        <View>
            <TextInput
            style={styles.input}
            keyboardType='default'
            value={this.props.descripcionPosteo}
            placeholder='Ingresa la descripcion de tu post'
            onChangeText={ (text) => this.props.actualizarDescripcionP(text) }
            multiline={true}
            rows={5}  
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth:1,
        borderColor: 'blue',
        padding:5
    }
})