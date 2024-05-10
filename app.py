from flask import Flask, request, jsonify
from joblib import load

app = Flask(__name__)

# Load the trained model
model = load('best_modelefinale123.pkl')

# Define API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    rpm = data['rpm']
    motor_power = data['motor_power']
    torque = data['torque']
    outlet_pressure_bar = data['outlet_pressure_bar']
    wpump_outlet_press = data['wpump_outlet_press']
    wpump_power = data['wpump_power']
    water_flow = data['water_flow']
    oilpump_power = data['oilpump_power']
    
    # Make prediction
    input_data = [[rpm, motor_power, torque, outlet_pressure_bar, wpump_outlet_press, wpump_power, water_flow, oilpump_power]]
    predicted_air_flow = model.predict(input_data)[0]
    
    
    # Return prediction and total production as JSON response
    return jsonify({
        'debit_de_air_flow': predicted_air_flow
    })

if __name__ == '__main__':
    app.run(debug=True, host='92.168.1.19', port=6000)
