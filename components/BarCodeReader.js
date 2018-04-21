import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FileSystem, Permissions, Camera } from 'expo';
import PubSub from 'pubsub-js';
import Requests from '../services/Requests';

export default class BarCodeReader extends React.Component {
    state = {
        type: Camera.Constants.Type.back,
        hasCameraPermission: false,
        gallery:[],
        barcode:{
            type:'',
            data:'',
        }
    }

    async componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA).then(this.handlePermissionStatus);
        const gallery = await Expo.FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos/');
        this.setState({
            gallery: gallery
        });
        console.log(gallery);
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            return;// wtv, dir probably exists
        });
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    capturePhoto = async () => {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync();
            await FileSystem.moveAsync({
                from: photo.uri,
                to: `${FileSystem.documentDirectory}photos/Photo_${Date.now()}.jpg`
            });
            console.log('robiesezdjecie');
        }
    };



    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <Camera
                        onBarCodeRead={this.handleBarCodeRead}
                        style={styles.barcode}
                    >

                        <TouchableOpacity
                            onPress={this.capturePhoto}
                            style={styles.captureButtonWrapper}
                            hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
                        >
                            <View style={styles.captureButton} />
                        </TouchableOpacity>
                    </Camera>
                    <TouchableOpacity
                    onPress = {()=>Requests.searchISBNRequest(this.state.barcode.data)}
                    style = {styles.button}
                    >
                        <Text>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    handleBarCodeRead = ({ type, data }) => {
        const barcode = Object.assign({}, this.state.barcode, {
            type: type,
            data: data
        });
        this.setState({barcode});
    }
}
const styles = StyleSheet.create({
    container: {
        //flexDirection: 'column',
        flex: 1,
    },
    barcode:{
        flex:5,
    },
    button:{
        flex: 3,
        padding: 30,
    },
    captureButton: {
        backgroundColor: "white",
        width: 52,
        height: 52,
        borderRadius: 52
    }
    }
);