import React, { Component } from 'react'
import { Text, View } from 'react-native'

class ProfileData extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: auth.currentUser.email,
            bio:'',
            foto:'',
        }
    }

    render() {
        return (
            <View>
                <Text>Nombre de usuario: {this.state.username}</Text>
                <Text>Email: {this.state.email}</Text>
                <Text>Biografía: {this.state.bio}</Text>
                <Text>Foto de Perfil: {this.state.foto}</Text>
                
            </View>
        )
    }
}

export default ProfileData