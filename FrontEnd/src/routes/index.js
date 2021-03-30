import React from 'react';
import Dashboard from '../pages/dashboard/Dashboard';
import DiseasePrediction from '../pages/disease-prediction';
import DrugRecommendation from '../pages/drug-recommendation';
import DoctorProfile from '../pages/profile/DoctorProfile';
import PatientAdd from '../pages/doctor/PatientAdd';
import Patients from '../pages/doctor/Patients';
import { Switch, Route } from "react-router-dom";
import DiagnosisList from './../pages/diagnosis/index';

export default function Routes() {
  return (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/disease-prediction" exact component={DiseasePrediction} />
        <Route path="/drug-recommendation" exact component={DrugRecommendation} />
        <Route path="/diagnosis" exact component={DiagnosisList} />
        <Route path="/doctor-profile" exact component={DoctorProfile} />
        <Route path="/doctor/add_patient" exact component={PatientAdd} />
        <Route path="/doctor/patients" exact component={Patients} />
    </Switch>
  );
}
