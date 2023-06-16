import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {auth, db} from '../../firebase/config'
import { AntDesign } from '@expo/vector-icons';

class Register extends Component {

    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            username:"",
            bio:"",
            foto: "",
            registroError:"",
            validandoUsuario: true
        }

    }
/*remember me */
componentDidMount(){
    setTimeout(() => {
        auth.onAuthStateChanged(
            user => {
                if (user){
                    this.props.navigation.navigate('HomeNav')
                }
                else { 
                    this.setState({
                        validandoUsuario: false
                    })
                        
                    
                }
            })
    }, 
    5000
    
    ) 
    
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
                    resgistroError:"",
                })
                
            }).catch(err => console.log(err))
        })
        .catch(err => this.setState({
            registroError: `No te has podido registrar, debido a lo siguiente: ${err.message}` 
        }))
        
    }




    render() {
        return (
            
            <View style={styles.container}>
                {
                    this.state.validandoUsuario === true ?

                    <View>
                        <AntDesign name="loading1" color='green' size={24} />
                    </View>

                    :
                    <>

                
                <Text style={styles.titulo}>Registrate aquí</Text>
                <Text style={styles.errorRegister}>{this.state.errors}</Text>
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
        this.state.email =="" || this.state.password == "" || this.state.username == "" ? 
                
        <View>
                <TouchableOpacity>
                    <Text style={styles.noRegister}>Registrarme</Text>
                </TouchableOpacity>
                <Text style={styles.textoFaltanDatos}>Te faltan datos!!</Text>
        </View>
            :
            <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username, this.state.bio, this.state.foto)}>
                <Text style={styles.siRegister}>Registrarme</Text>
            </TouchableOpacity>

        }
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.text}>Ya estas registrado? Logueate</Text>
        </TouchableOpacity>
        
        </>
         }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    titulo:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24
    }, 
    container:{
        marginTop: 75,
        height: '75%',
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
    siRegister: {
        backgroundColor:'#54d0e0',
        padding: 10,
        borderRadius: 20,
        width: 250,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    noRegister:{
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
    text:{
        textDecorationLine: 'underline',
        marginTop: 24
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
    textoFaltanDatos:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBotton: 24
    },
    errorRegister:{
        textAlign: 'center',
        width: 350,
        marginBottom: 24,
        fontStyle: 'italic',
        color: '#802121',
        fontWeight: 'bold'
    }
})

export default Register