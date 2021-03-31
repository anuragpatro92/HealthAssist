'use strict';

const PatientModel = require('../../models/patients');
const DoctorModel = require('../../models/doctors');

const addPatientInfo = (doctor_id,name, email, phone, age, sex, height,weight,chronic_conditions) => new Promise(async(resolve, reject) => {
        try {
            let query = PatientModel.findOne({email});
            const result = await query.exec();
            if(!result) {
                const patient = new PatientModel({name, email, phone,age, sex, height,weight,chronic_conditions});
                const saveResult = await patient.save();
                  //checking whether able to save patient info or not
                  if(saveResult) {
                    let docQuery = DoctorModel.findByIdAndUpdate(doctor_id,{ $push: { patients: saveResult._id } },{new:true});
                    const docResult = await docQuery.exec();
                      if(docResult){
                        resolve(saveResult);
                      }else{
                        //if required, can delete the patient record-> to maintain the transactionality  
                        throw new Error("Cannot Insert Patient Id in Doctor Document");   
                      }
                      
                    }
                  else throw new Error("Patient Info Saving Failed");

            } else {
                throw new Error("Patient Email Id already exists")
            }
        }catch(e) {
            reject(e);
        }
});

const updatePatientInfo = (id,name, email, phone, age, sex, height,weight,chronic_conditions) => new Promise(async(resolve, reject) => {
    try {
        let query = PatientModel.findByIdAndUpdate(id,{$set: {name, email, phone, age, sex, height,weight,chronic_conditions}},{new:true});
        const result = await query.exec();
        if(result) {
            resolve(result);
        } else {
            throw new Error("Patient Info Updation Failed")
        }
    }catch(e) {
        reject(e);
    }
});

module.exports = { addPatientInfo , updatePatientInfo}