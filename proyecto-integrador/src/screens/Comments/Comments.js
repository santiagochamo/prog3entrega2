
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'

class Comments extends Component {

    constructor(props){
        super(props)
        this.state = {

        }

    }
    render() {
        return (
            <View>
                <Text>Comments</Text>
            </View>
        )
    }
}

export default Comments 
