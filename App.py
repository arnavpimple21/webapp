from flask import Flask, jsonify, request
from flask_cors import CORS  # Importing CORS correctly
import pickle  # Importing pickle correctly, as it's part of the standard library
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Enable CORS on the app
CORS(app)

# Load the Pickle model (ensure 'logistic_regressor.pkl' exists in your working directory)
with open('logistic_regressor.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract data from the incoming JSON request
        data = request.get_json()

        # Assuming the model expects a list of features
        features = np.array([data['features']])

        # Make a prediction
        prediction = model.predict(features)

        # Return prediction as a JSON response
        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
