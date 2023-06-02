import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {auth, db} from '../../firebase/config'


class Register extends Component {

    contructor(props){
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


    registrarUsuario(email, password, username, bio, foto){
        auth.createUserWithEmailAndPassword(email,password)

        .then(data=>{
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
                this.props.navigation.navigate("Login")
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
                    style={styles.email}
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
                    style={styles.password}
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
                    style={styles.username}
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
                    style={styles.foto}
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
                    style={styles.bio}
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
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