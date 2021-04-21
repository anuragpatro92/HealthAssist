import json
import numpy as np
from sklearn.cluster import KMeans

class DrugService():

    def __init__(self):
        disease_dataset_to_FDA_disease_mapping = None
        FDA_disease_to_drugs_mapping = None
        FDA_drugs_to_reactions_mapping = None
        disease_dataset_symptom_id_mapping = None
        FDA_reactions_to_disease_dataset_symptom_mapping=None



    def get_similar_diseases(self,disease):
        return self.disease_dataset_to_FDA_disease_mapping.get(disease, [])

    def read_file(self,path):
        data = None
        with open(path) as json_file:
            data = json.load(json_file)
        return data

    def get_Mappings(self):
        self.disease_dataset_to_FDA_disease_mapping = self.read_file("zone_1/disease_dataset_FDA_disease.json")
        self.FDA_disease_to_drugs_mapping = self.read_file("zone_1/disease_drugs.json")
        self.FDA_drugs_to_reactions_mapping =self.read_file("zone_1/drugs_reactions.json")
        self.disease_dataset_symptom_id_mapping = self.read_file("zone_1/disease_dataset_symptom_id.json")
        self.FDA_reactions_to_disease_dataset_symptom_mapping =self.read_file(
            "zone_1/disease_dataset_symptom_FDA_reactions.json")

    def get_drugs_for_disease(self,disease):
        return self.FDA_disease_to_drugs_mapping.get(disease, [])

    def get_reactions_for_drug(self,drug):
        return self.FDA_drugs_to_reactions_mapping.get(drug, [])

    def get_similar_symptoms(self,reaction):
        return self.FDA_reactions_to_disease_dataset_symptom_mapping.get(reaction, [])

    def construct_feature_vector(self,symptoms):
        num_symptoms = len(self.disease_dataset_symptom_id_mapping)
        fv = np.zeros((num_symptoms), dtype=int)
        for symptom in symptoms:
            id = self.disease_dataset_symptom_id_mapping.get(symptom)
            fv[id] = 1
        return fv

    def recommend_drug(self,disease, symptoms):
        patient_fv = self.construct_feature_vector(symptoms)
        diseases = self.get_similar_diseases(disease)

        drug_name = []
        drug_fv = []
        for disease in diseases:
            drugs = self.get_drugs_for_disease(disease)
            for drug in drugs:
                symptoms = []
                reactions = self.get_reactions_for_drug(drug)
                for reaction in reactions:
                    symptoms.extend(self.get_similar_symptoms(reaction))
                symptoms = list(set(symptoms))
                fv = self.construct_feature_vector(symptoms)
                drug_name.append(drug)
                drug_fv.append(fv)
        kmeans = KMeans(n_clusters=10, random_state=0).fit(drug_fv)
        avoid_cluster = kmeans.predict(patient_fv.reshape(1, -1))

        recommended_drugs = []
        avoided_drugs = []
        for index, drug in enumerate(drug_name):
            if kmeans.labels_[index] == avoid_cluster:
                avoided_drugs.append(drug)
            else:
                recommended_drugs.append(drug)

        return recommended_drugs,avoided_drugs