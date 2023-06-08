import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputMail: '',
            inputPassword: '',
            inputUsername: '',
        }
    }

    
    registrarUsuario(mail, password, username){
        auth.createUserWithEmailAndPassword(mail, password, username)
        .then( data => {
            this.props.navigation.navigate('HomeNav')
            db.collection('users').add({
                owner:auth.currentUser.email,
                createdAt: Date.now()
            })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
        })
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
            onChangeText={(text)=>this.setState({inputUsername: text})}
            value={this.state.inputUsername}
        />
       
        <TouchableOpacity style={styles.btn} onPress={()=> this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.inputUsername)}>
            <Text>Registrarme</Text>
        </TouchableOpacity>
      
       <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
       <Text style={styles.vamosAlLogin}>Ya estás regitrado? Vamos al Login</Text>   
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
    },
    vamosAlLogin: {
        marginTop: 32,
        backgroundColor:'#54d0e0',
        padding: 10,
        borderRadius: 20,
    }
})

export default FormRegister