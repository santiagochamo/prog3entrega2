import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'

export default class FormComments extends Component {
    constructor(props){
    super(props)
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments')}>
                    <Text>Dejá tu comentario:</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
