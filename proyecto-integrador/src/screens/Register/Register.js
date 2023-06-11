import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {auth, db} from '../../firebase/config'



class Register extends Component {

    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            username:"",
            bio:"",
            foto: "",
            errors:"",
        }

    }
/*remember me */
componentDidMount(){ 
    auth.onAuthStateChanged(
    user => {
        if (user){
            this.props.navigation.navigate('HomeNav')
        }
    })
}
    registrarUsuario(email, password, username, bio, foto){
        auth.createUserWithEmailAndPassword(email,password)

        .then(data=>{
            this.props.navigation.navigate('HomeNav')
            db.collection("users").add(
                {
                    email: email,
                    nombreUsuario: username,
                    biografia: bio,
                    foto: foto,
                    createdAt: Date.now()
                }
            ).then(()=>{
                this.setState({
                    email: "",
                    password:"",
                    username:"",
                    bio:"",
                    foto: "",
                    errors:"",
                })
                
            }).catch(err => console.log(err))
        })
        .catch(err => this.setState({
            errors: `El error es el siguiente:${err.message}` 
        }))
        
    }




    render() {
        return (
            <View>
                <Text>Registrate aquí</Text>
                <Text>{this.state.errors}</Text>
                <TextInput 
                    style={styles.reg}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={ (texto) => {
                        this.setState({
                            email: texto
                        })
                    }}
                    value={this.state.email}
                />
                <TextInput 
                    style={styles.reg}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={ (texto) => {
                        this.setState({
                            password: texto
                        })
                    }}
                    value={this.state.password}
                />
                <TextInput 
                    style={styles.reg}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    onChangeText={ (texto) => {
                        this.setState({
                            username: texto
                        })
                    }}
                    value={this.state.username}
                />
                <TextInput 
                    style={styles.reg}
                    placeholder='Foto'
                    keyboardType='default'
                    onChangeText={ (texto) => {
                        this.setState({
                            foto: texto
                        })
                    }}
                    value={this.state.foto}
                />
                <TextInput 
                    style={styles.reg}
                    placeholder='Biografia'
                    keyboardType='default'
                    onChangeText={ (texto) => {
                        this.setState({
                            bio: texto
                        })
                    }}
                    value={this.state.bio}
                />


            {
        this.state.email =="" || this.state.password == "" || this.state.usuario == "" ? 
            
                <TouchableOpacity>
                    <Text style={styles.noRegistra}>Registrarme</Text>
                </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username, this.state.bio, this.state.foto)}>
                <Text style={styles.siRegistra}>Registrarme</Text>
            </TouchableOpacity>

        }
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Ya estas registrado? Logueate</Text>
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
    email:{

    },
    password:{

    },
    username:{

    },
    foto:{

    },
    bio:{

    },
    siRegistra:{

    },
    noRegistra:{

    }
})

export default Register