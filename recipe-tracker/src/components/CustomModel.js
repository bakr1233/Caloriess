import * as tf from '@tensorflow/tfjs';

class CustomFoodClassifier {
  constructor() {
    this.model = null;
    this.classes = ['recognized', 'unrecognized'];
  }

  async loadModel() {
    this.model = await tf.loadLayersModel('/models/custom-food-model/model.json');
  }

  async classify(imageElement) {
    if (!this.model) {
      await this.loadModel();
    }

    // Preprocess the image
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    // Make prediction
    const predictions = await this.model.predict(tensor);
    const results = await predictions.data();
    tensor.dispose();

    // Get the highest probability
    const maxProbability = Math.max(...results);
    const predictedClass = this.classes[results.indexOf(maxProbability)];

    return {
      class: predictedClass,
      probability: maxProbability
    };
  }
}

export default CustomFoodClassifier; 