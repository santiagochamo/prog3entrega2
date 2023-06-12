
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import FormComments from '../../components/FormComments/FormComments'

class Comments extends Component {

    constructor(props){
        super(props)
        this.state = {
            data:{}
        }

    }

    componentDidMount(){
        db.collection('posts').doc(this.props.route.params.id).onSnapshot(doc => {
            this.setState({data:doc.data()}, ()=> console.log(this.state.data))
        })
    }

    render() {
        return (
            <View>
                <Text>Comentarios</Text>
                <Flatlist
                data={this.state.data.comentarios}
                keyExtractor={item => item.createdAt.toString()}
                renderItem={({item}) => <Text>{item.comentario}</Text>}
                />
                <FormComments id={this.props.route.params.id}/>
            </View>
        )
    }
}

export default Comments 
