'use strict';

const ConstantsModel = require('../../models/constants');

const getSymptoms = () => new Promise(async(resolve, reject) => {
        try {
            let query = ConstantsModel
                        .findOne({ key: 'symptoms' })
                        .select('symptoms');
            const result = await query.exec();
            if(result) {
                resolve(result);
            } else {
                throw new Error("Could not get symptoms")
            }
        }catch(e) {
            console.log(e);
            reject(e);
        }
})

module.exports = { getSymptoms }