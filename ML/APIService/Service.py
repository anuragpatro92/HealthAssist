import pickle
import json
import numpy as np

class Service():

    def __init__(self):
        print()


    def getNeighbours(self,symptoms):
        with open('knn.sav', 'rb') as pickle_file:
            model = pickle.load(pickle_file)
            print(model.predict(symptoms))
        return model.kneighbors(symptoms)

    def create_feature_matrix(self,symptoms):
      symptom_mapping = self.getSymptomsId()
      number_symptoms = len(symptom_mapping.keys())
      feature_matrix = np.zeros((1,number_symptoms),dtype=int)

      for symptom in symptoms:
          feature_matrix[0][symptom_mapping[symptom]] = 1

      return feature_matrix

    def getSymptomsId(self):
        f = open('disease_dataset_symptom_id.json', )
        data = json.load(f)
        f.close()
        return data

    def read_csv(self,fileName):
        dataset_disease_array= np.genfromtxt('dataset_disease.csv', delimiter=',')
        return dataset_disease_array

    def get_disease_labels(self):
        file = open("disease_labels.txt", "r")
        content = file.read()
        return content.split('\n')

    def get_predicted_disease(self,symptoms):
        matrix = self.create_feature_matrix(symptoms)
        neighbours =self.getNeighbours(matrix)

        disease_labels = self.get_disease_labels()
        datset_diseases = self.read_csv('dataset_disease.csv')

        predicted_disease = {}

        for i in range(0,len(neighbours[1][0])):
            disease = disease_labels[int(datset_diseases[neighbours[1][0][i]])]

            if disease in predicted_disease:
                predicted_disease[str(disease)] += 1
            else:
                predicted_disease[str(disease)] = 1



        print(predicted_disease)

        return predicted_disease



