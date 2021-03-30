import React from 'react';
import DoctorRegistration from '../pages/auth/DoctorSignUp';
import SignIn from '../pages/auth/SignIn';

import { Switch, Route, Redirect } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
        <Redirect from="/" to="/signIn" exact />
        <Route path="/signIn" exact component={SignIn} />
        <Route path="/signUp" exact component={DoctorRegistration} />
    </Switch>
  );
}
