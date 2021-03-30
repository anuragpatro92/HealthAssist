'use strict';

const ConstantsModel = require('../../models/constants');

const getDiseases = () => new Promise(async(resolve, reject) => {
        try {
            let query = ConstantsModel
                        .findOne({ key: 'diseases' })
                        .select('diseases');
            const result = await query.exec();
            if(result) {
                resolve(result);
            } else {
                throw new Error("Could not get diseases")
            }
        }catch(e) {
            console.log(e);
            reject(e);
        }
})

module.exports = { getDiseases }