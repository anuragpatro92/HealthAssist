'use strict';

const PatientModel = require('../../models/patients');

const addPatientInfo = (name, email, phone, age, sex, height,weight,chronic_conditions) => new Promise(async(resolve, reject) => {
        try {
            let query = PatientModel.findOne({email});
            const result = await query.exec();
            if(!result) {
                const patient = new PatientModel({name, email, phone,age, sex, height,weight,chronic_conditions});
                const saveResult = await patient.save();
                  //checking whether able to save patient info or not
                  if(saveResult) resolve(saveResult);
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