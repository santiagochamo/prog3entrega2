import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from '../../firebase/config'

class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamara: false,
            fotoTomada: '',
        }
        this.metodosCamara = null
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then (resp => this.setState({mostrarCamara: true}))
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then(fotoEnMemoria => {
            this.setState({
                fotoTomada: fotoEnMemoria.uri,
                mostrarCamara: false
            })
        })
        .catch(err => console.log(err))
    }
    aceptarFoto(){
        fetch(this.state.fotoTomada)
        .then(resp => resp.blob())
        .then (imagen => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagen)
            .then(() => {
                ref.getDownloadURL()
                .then((url)=> this.props.onImageUpload(url))
            })
        })
        .catch(err => console.log(err))
    }
    rechazarFoto(){
        this.setState({
            mostrarCamara: true,
            fotoTomada: ''
        })
    }
  render() {
    return (
      <View style={styles.container}>
        {
            this.state.mostrarCamara && this.state.fotoTomada === '' ?
            <>
            <View style={styles.cameraBody}>
            <Camera
            style={styles.camara}
            type={Camera.Constants.Type.back}
            ref={(metodosComponente) => this.metodosCamara = metodosComponente}
            ratio='1:1'
            />
            <TouchableOpacity
                    onPress={()=> this.tomarFoto()}
            >
                        <Text style={styles.tomarFoto}>
                            Tomar foto
                        </Text>
            </TouchableOpacity>
            </View>
            </>

            :

            this.state.mostrarCamara === false && this.state.fotoTomada !== '' ?
            <>
                <Image 
                source={{uri: this.state.fotoTomada}} 
                style={styles.img} />

                <View style={styles.btnsFoto}>
                    <TouchableOpacity 
                    onPress={()=> this.aceptarFoto()}>
                        <Text style={styles.aceptar}>
                            Aceptar foto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.rechazarFoto()}>
                        <Text style={styles.rechazar}>
                            Rechazar foto
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
            :
            <Text style={styles.noPicture}>No picture</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camara:{
        height: 500,
        width: 500,
        alignSelf: 'center',
        borderWidth: 2,
    },
    img:{
        height: 500,
        width: 500,
        alignSelf: 'center',
        borderWidth: 2,
        marginTop: 24
    },
    cameraBody: {
        height: '80vh',
        width: '60vw',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 24,
    },
    tomarFoto: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        width: 200,
        paddingTop: 4,
        minWidth: 200,
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'white',
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 20
    },
    btnsFoto:{
        flexDirection: 'row',
        alignSelf: 'center'
    },
    aceptar:{
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        width: 200,
        paddingTop: 4,
        minWidth: 200,
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'white',
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 20,
        marginRight: 10,
    },
    rechazar:{
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        width: 200,
        paddingTop: 4,
        minWidth: 200,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#6e2e2e',
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 20,
        marginLeft: 10
    },
    noPicture: {
        textAlign: 'center',
        width: 350,
        marginBottom: 24,
        fontStyle: 'italic',
        fontSize: 30,
        color: '#802121',
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 200
    }
})

export default CamaraPost