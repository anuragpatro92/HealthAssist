import React from 'react';
import Dashboard from '../pages/dashboard/Dashboard';
import DiseasePrediction from '../pages/disease-prediction';
import DrugRecommendation from '../pages/drug-recommendation';
import DoctorProfile from '../pages/profile/DoctorProfile';
import PatientAdd from '../pages/doctor/PatientAdd';
import PatientEdit from '../pages/doctor/PatientEdit';
import Patients from '../pages/doctor/Patients';
import { Switch, Route } from "react-router-dom";
import DiagnosisList from './../pages/diagnosis/index';

export default function Routes() {
  return (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/disease-prediction/:diagnosisID?" component={DiseasePrediction} />
        <Route path="/drug-recommendation/:diagnosisID?" component={DrugRecommendation} />
        <Route path="/diagnosis" exact component={DiagnosisList} />
        <Route path="/doctor-profile" exact component={DoctorProfile} />
        <Route path="/add_patient" exact component={PatientAdd} />
        <Route path="/edit_patient" exact component={PatientEdit} />
        <Route path="/patients" exact component={Patients} />
    </Switch>
  );
}
