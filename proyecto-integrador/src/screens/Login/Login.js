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
      <View style={styles.container}>
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
                    <Text style={styles.btnLoginCerrado}>Inicia Sesión</Text>
                </TouchableOpacity>
                    <Text style={styles.textoFaltanDatos}>Te faltan datos!!</Text>
        </View>
            :
            <TouchableOpacity style={styles.btn} onPress={()=> this.logIn(this.state.inputMail, this.state.inputPassword)}>
            <Text style={styles.btnText}>Inicia Sesión</Text>
            </TouchableOpacity>

        }
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.text}>No estas registrado? Registrate</Text>
        </TouchableOpacity>

      </View>
      
      
    )
  }
}


const styles = StyleSheet.create({
    reg: {
        borderWidth:1,
        borderColor:'#3d3d3d',
        borderRadius: 15,
        marginBottom: 24,
        height: 24,
        padding: 15,
        width: 350,
        backgroundColor: 'white'
    },
    btn: {
        backgroundColor:'#54d0e0',
        padding: 10,
        borderRadius: 20,
        width: 250,
        alignSelf: 'center',
        alignItems: 'center',
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    container:{
        marginTop: 150,
        height: '50%',
        minWidth: 500,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 25,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 25,
        backgroundColor: '#bbe3f0',
    },
    text:{
        textDecorationLine: 'underline',
        marginTop: 24
    },
    btnLoginCerrado:{
        textAlign: 'center',
        marginBottom: 24,
        backgroundColor:'#cfcfcf',
        padding: 10,
        borderRadius: 20,
        width: 250,
        alignSelf: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    textoFaltanDatos:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBotton: 24
    }
})
//boton para ir al regitro

export default Login