import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputMail: '',
            inputPassword: ''
        }
    }

    logIn(mail, password){
        auth.signInWithEmailAndPassword(mail, password)
        .then(resp => this.props.navigation.navigate('HomeNav'))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <TextInput
            style={styles.reg}
            placeholder= 'Digita tu correo electrónico'
            keyboardType='email-address'
            onChangeText={(text)=> this.setState({inputMail: text})}
            value={this.state.inputMail}
        />
        <TextInput
            style={styles.reg}
            placeholder='Digita tu password'
            onChangeText={(text)=>this.setState({inputPassword: text})}
            value={this.state.inputPassword}
            secureTextEntry={true}
        />
       
        <TouchableOpacity style={styles.btn} onPress={()=> this.logIn(this.state.inputMail, this.state.inputPassword)}>
            <Text>Inicia Sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    reg: {
        borderWidth:1,
        borderColor:'#3d3d3d',
        marginTop: 24,
        height: 24,
        padding: 5
    },
    btn: {
        marginTop: 32,
        backgroundColor:'#54d0e0',
        padding: 10,
        borderRadius: 20,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
})

export default Login