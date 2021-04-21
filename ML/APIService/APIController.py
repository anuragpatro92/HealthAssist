import json
from flask import Flask, request, jsonify, Response,send_file
from flask_cors import CORS, cross_origin
from Service import Service
from DrugService import DrugService

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/api/diseasePrediction",methods=['POST'])
def diseasePredictionController():

    data = request.get_json()

    if 'symptoms' not in data.keys():
        response = {
            'statusCode': 400,
            'message': 'Please send symptoms'
        }
        return Response(response=json.dumps(response))



    symptoms = data['symptoms']
    service = Service()
    predicted_diseases = service.get_predicted_disease(symptoms)


    response = {
        'statusCode': 200,
        'diseases': predicted_diseases
    }

    return Response(response=json.dumps(response))

@app.route("/api/drugReccomendation",methods=['POST'])
def drugRecoController():

    data = request.get_json()

    if 'symptoms' not in data.keys():
        response = {
            'statusCode': 400,
            'message': 'Please send correct request'
        }
        return Response(response=json.dumps(response))

    disease = data['disease']
    symptoms = data['symptoms']

    drugService = DrugService()
    drugService.get_Mappings()
    recommended_drugs,avoided_drugs = drugService.recommend_drug(disease,symptoms)

    print(len(avoided_drugs))
    response = {
        'statusCode': 200,
        'good_drugs': recommended_drugs,
        'bad_drugs': avoided_drugs
    }

    return Response(response=json.dumps(response))

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
#diseases = { 'symptoms' : ['watering_from_eyes','swollen_blood_vessels','muscle_wasting']}
# diseases ={
#
# "symptoms":["fatigue","weight_loss","restlessness","lethargy","irregular_sugar_level","blurred_and_distorted_vision","obesity","excessive_hunger","increased_appetite","polyuria"]
#
# }
#data = {"symptoms":["palpitations"],"disease":"AIDS"}
#data = { 'disease' : 'GERD',
 #       'symptoms' : ['polyuria','red_sore_around_nose','back_pain','cold_hands_and_feets','coma']}
#diseasePredictionController()
#drugRecoController()


