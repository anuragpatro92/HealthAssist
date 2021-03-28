'use strict';

const DoctorModel = require('../../models/doctors');

//not done
const authenticateDoctor = (email, password) => new Promise(async(resolve, reject) => {
        try {
            let query = DoctorModel.findOne({ email, password });
            const result = await query.exec();
            if(result) {
                resolve(result);
            } else {
                throw new Error("Auth failed")
            }
        }catch(e) {
            console.log(e);
            reject(e);
        }
})

module.exports = { authenticateDoctor }