from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# Load the saved models
with open('linear_regression_model_p1.pkl', 'rb') as file1:
    model_p1 = pickle.load(file1)

with open('linear_regression_model_p2.pkl', 'rb') as file2:
    model_p2 = pickle.load(file2)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    heurefonction = data['heurefonction']
    temperature = data['temperature']
    pointderose = data['pointderose']
    tauxdecharge = data['tauxdecharge']
    debit = data['debit']
    production = data['production']

    features = np.array([heurefonction, temperature, pointderose, tauxdecharge, debit, production]).reshape(1, -1)
    
    # Scale the features
    scaler = StandardScaler()
    with open('scaler_mean.pkl', 'rb') as file:
        scaler.mean_ = pickle.load(file)
    with open('scaler_scale.pkl', 'rb') as file:
        scaler.scale_ = pickle.load(file)

    features_scaled = scaler.transform(features)

    prediction_p1 = model_p1.predict(features_scaled)

    prediction_p2 = model_p2.predict(features_scaled)

    # Adjust pression_1 to be slightly higher than pression_2
    epsilon = 0.01
    prediction_p1 += epsilon

    # Format predictions to display only four digits after the decimal point
    prediction_p1 = round(prediction_p1[0], 4)
    prediction_p2 = round(prediction_p2[0], 4)

    return jsonify({'pression_1': prediction_p1, 'pression_2': prediction_p2})

if __name__ == '__main__':
    app.run(debug=True)
