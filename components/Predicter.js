import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
//import * as tf from '@tensorflow/tfjs';
import {FileSystem} from "expo";
import {Feather} from "@expo/vector-icons";


// export default class Predicter extends React.Component {
//
//
//     state={
//         photo:{},
//     };
//
//     askForPhoto = async () => {
//         const p = await Expo.FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos/photo.jpg');
//         const photo = Object.assign({}, this.state.photo, {
//             photo: p,
//         });
//         this.setState({photo});
//         console.log(p);
//     };
//
//
//     loadModel = async () => {
//         this.model = await tf.loadModel('./retrained_graph.pb');  //to jest mi potrzebne!
//     };
//
//     predict = async (imageData) => {
//
//         const pred = await tf.tidy(() => {
//
//             let img = tf.fromPixels(imageData);
//             img = img.reshape([1, 224, 224, 3]);
//
//             img = tf.cast(img, 'float32');
//
//             const output = this.model.predict(img);
//
//             this.prediction = Array.from(output.dataSync());  //skad sie bierze to prediction
//             console.log(this.prediction);
//         })
//
//     };
//     render(){
//         return(
//             <TouchableOpacity
//                 style={styles.button}
//                 onPress={this.determinePhoto}
//             />
//         );
//     }
//
//     determinePhoto(){
//         this.askForPhoto;
//         this.loadModel;
//         this.predict(this.state.photo);
//     }
//
//
// }
// const styles = StyleSheet.create({
//    button:{
//        width:100,
//        height: 100,
//        backgroundColor: 'red',
//        padding: 50,
//    }
// });



import { TfImageRecognition } from 'react-native-tensorflow';

const tfImageRecognition = new TfImageRecognition({
    model: require('./retrained_graph.pb'),
    labels: require('./retrained_labels.txt'),
    imageMean: 117, // Optional, defaults to 117
    imageStd: 1 // Optional, defaults to 1
});

const results = await tfImageRecognition.recognize({
    image: require('./assets/apple.jpg'),
    inputName: "input", //Optional, defaults to "input"
    inputSize: 224, //Optional, defaults to 224
    outputName: "output", //Optional, defaults to "output"
    maxResults: 3, //Optional, defaults to 3
    threshold: 0.1, //Optional, defaults to 0.1
})

results.forEach(result =>
    console.log(
        result.id, // Id of the result
        result.name, // Name of the result
        result.confidence // Confidence value between 0 - 1
    )
)

await tfImageRecognition.close() // Necessary in order to release objects on native side