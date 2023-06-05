import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import ProfileData from '../../components/ProfileData/ProfileData'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts:[],
            users:[]
        }
    }
    componentDidMount(){
        db.collection('users').where('owner', '==', props.data.owner).onSnapshot(
            
        )
    }
    render() {
        return (
            <View>
                <ProfileData />
                <Text>Cantidad de posteos: {this.state.posts.length}</Text>
                <FlatList /*usamos la flatlist aca y no en el componente de datos a fin de poder pasarle props al componente de Post en el renderitem */
                    data={this.state.posts} 
                    keyExtractor={(item)=> item.id.toString()} 
                    renderItem={({ item }) => <Post postData={ item } /> } /*deberiamos recibir las props en Post de tal manera para renderizar los posts del usuario determinado */
      />                                    
            </View>
        )
    }
}

export default Profile
