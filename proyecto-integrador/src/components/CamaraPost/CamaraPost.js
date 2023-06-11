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
            ratio='16:9'
            />
            <TouchableOpacity
                    onPress={()=> this.tomarFoto()}
            >
                        <Text>
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

                <View>
                    <TouchableOpacity 
                    onPress={()=> this.aceptarFoto()}>
                        <Text>
                            Aceptar foto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.rechazarFoto()}>
                        <Text>
                            Rechazar foto
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
            :
            <Text>No picture</Text>
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
        flex: 1
    },
    img:{
        flex: 1
    },
    cameraBody: {
        height: '60vh',
        width: '60vw',
    },
})

export default CamaraPost