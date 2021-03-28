'use strict';

const DoctorModel = require('../../models/doctors');
const PatientModel = require('../../models/patients');

const getAllPatients = (doctor_id) => new Promise(async(resolve, reject) => {
        try {
            let query = DoctorModel
                        .findOne({ id: doctor_id })
                        .populate('patients')
                        .select('patients');
            const result = await query.exec();
            if(result) {
                resolve(result);
            } else {
                throw new Error("Could not find patients")
            }
        }catch(e) {
            console.log(e);
            reject(e);
        }
})

module.exports = { getAllPatients }