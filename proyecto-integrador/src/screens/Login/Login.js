import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputMail: '',
            inputPassword: '',
            logueoError: ''
        }
    }

    logIn(mail, password){
        auth.signInWithEmailAndPassword(mail, password)
        .then( res => {
            this.setState({
                logueoError: ''
            })
            this.props.navigation.navigate('HomeNav')
        })
        .catch(error => 
            this.setState({
            logueoError: `No te has podido loguear debido a lo siguiente:${error.message}`
        })
        )
    }

  render() {
    return (
      <View>
          <Text>{this.state.logueoError}</Text>
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
       
       {
        this.state.inputMail =="" || this.state.inputPassword == ""  ? 
                
        <View>
                <TouchableOpacity>
                    <Text>Inicia Sesión</Text>
                </TouchableOpacity>
                <Text>Te faltan datos!!</Text>
        </View>
            :
            <TouchableOpacity style={styles.btn} onPress={()=> this.logIn(this.state.inputMail, this.state.inputPassword)}>
            <Text>Inicia Sesión</Text>
            </TouchableOpacity>

        }
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text>No estas registrado? Registrate</Text>
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
//boton para ir al regitro

export default Login