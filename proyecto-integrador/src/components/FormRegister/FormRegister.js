import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'

class FormRegister extends Component {
    constructor(){
        super()
        this.state = {
            inputMail: '',
            inputPassword: ''
        }
    }

    registrarUsuario(mail, password, username){
        auth.createUserWithEmailAndPassword(mail, password, username)
        .then(data => console.log(data))
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
        <TextInput
            style={styles.reg}
            placeholder='Digita tu username'
            onChangeText={(text)=>this.setState({input: text})}
            value={this.state.input}
        />
        <TouchableOpacity>
            style={styles.btn}
            onPress={()=> this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.input)}
            <Text style={styles.btnText}>Registrar mi usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate('Home')}>
            <Text>Estoy desde el componente FormRegister</Text>
        </TouchableOpacity>
      </View>
    )
  }
  <TouchableOpacity>
        <Text style={styles.vamosAlLogin}>Ya estás regitrado? Vamos al Login</Text>   
  </TouchableOpacity>
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
    vamosAlLogin: {
        marginTop: 32,
        backgroundColor:'#54d0e0',
        padding: 10,
        borderRadius: 20,
    }
})

export default FormRegister