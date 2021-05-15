export const getSymptomLabel = (option) => {
    return option.split('_').map(x => x[0].toUpperCase() + x.substring(1)).join(' ')
}

export const getDashboardData = (data)=>{
    let diagnosesCompleted = 0;
    let diagnosesInProgress = 0;
    let patientsTotal = 0;
    let symptomMap = {};
    let diseasesMap = {};
    const patientSet = new Set();

   if(data){
    data.map((item,index)=>{
        diagnosesCompleted++;
        if(item.status=="In Progress") diagnosesInProgress++;

        patientSet.add(item.patient_id._id);

        item.symptoms.map((symp_item)=>{
          if (symptomMap[symp_item]) symptomMap[symp_item]++;
          else symptomMap[symp_item] = 1;
        });

        item.diseases.map((disease_item)=>{
            if(disease_item.status=="Accepted"){
                if (diseasesMap[disease_item.disease_name]) diseasesMap[disease_item.disease_name]++;
                else diseasesMap[disease_item.disease_name] = 1;
            }
          });

     });
     console.log("Symptom Map ",symptomMap); 
     console.log("Diseases Map ",diseasesMap); 
   } 
   
   
    let desiredData;
    let symptomKeysSorted = Object.keys(symptomMap);
    symptomKeysSorted.sort((a,b) => symptomMap[b] - symptomMap[a])
    let symptoms = symptomKeysSorted.slice(0,10).map(k => [getSymptomLabel(k), symptomMap[k]]);

    let diseaseKeysSorted = Object.keys(diseasesMap);
    diseaseKeysSorted.sort((a,b) => diseasesMap[b] - diseasesMap[a])
    let diseases =diseaseKeysSorted.slice(0,10).map(k => [k, diseasesMap[k]]);

    
    patientsTotal = patientSet.size;
    desiredData = {diagnosesCompleted,diagnosesInProgress,patientsTotal,symptoms,diseases};

    return desiredData;
}
