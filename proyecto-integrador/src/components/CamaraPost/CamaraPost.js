import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from 'firebase-config'

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
        Camera.getCameraPermissionAsync()
        .then (resp => this.setState({mostrarCamara: true}))
        .catch(err => console.log(err))
    }
    tomarFoto(){
        this.metodosCamara.takePictureAsyn()
        .then(fotoTomo => {
            this.setState({
                fotoTomada: fotoEnMemorio.uri,
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
                .then((url)=> this.props.actualizarEstadoFoto(url))
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
            <Camera
            style={styles.camara}
            type={Camera.Constants.Type.back}
            ref={(metodosComponente) => this.metodosCamara = metodosComponente}
            />
            </>
            :
            this.state.mostrarCamara === false && this.state.fotoTomada !== '' ?
            <>
                <Image source={{uri: this.state.fotoTomada}} style={styles.img} />
                <View>
                    <TouchableOpacity onPress={()=> this.aceptarFoto()}>
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
    }
})

export default CamaraPost