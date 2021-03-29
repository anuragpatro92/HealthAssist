'use strict';

const DoctorModel = require('../../models/doctors');

const addDoctorInfo = (name, email, phone, password, cert_id, address) => new Promise(async(resolve, reject) => {
        try {
            let query = DoctorModel.findOne({email});
            const result = await query.exec();
            if(!result) {
                const doctor = new DoctorModel({name, email, phone, password, cert_id, address});
                const saveResult = await doctor.save();
                  //checking whether able to save doctor info or not
                  if(saveResult) resolve(saveResult);
                  else throw new Error("Doctor Info Saving Failed");

            } else {
                throw new Error("Doctor Email Id already exists")
            }
        }catch(e) {
            reject(e);
        }
});

const updateDoctorInfo = (id,name, email, phone, password, cert_id, address) => new Promise(async(resolve, reject) => {
    try {
        let query = DoctorModel.findByIdAndUpdate(id,{$set: {name,email,phone,password, cert_id, address}},{new:true});
        const result = await query.exec();
        if(result) {
            resolve(result);
        } else {
            throw new Error("Doctor Info Updation Failed")
        }
    }catch(e) {
        console.log(e);
        reject(e);
    }
});

module.exports = { addDoctorInfo , updateDoctorInfo}