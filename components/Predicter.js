import * as tf from '@tensorflow/tfjs';


export default class Predicter extends React.Component {




    loadModel = async () => {
        this.model = await tf.loadModel('./retrained_graph.pb');  //to jest mi potrzebne!
    };

    predict = async (imageData) => {

        const pred = await tf.tidy(() => {

            let img = tf.fromPixels(imageData);
            img = img.reshape([1, 224, 224, 3]);

            img = tf.cast(img, 'float32');

            var output = this.model.predict(img);

            this.prediction = Array.from(output.dataSync())  //skad sie bierze to prediction

        })

    };
}