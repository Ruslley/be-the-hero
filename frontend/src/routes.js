import React from  'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncidents from './pages/NewIncidents';


export default function Routes() {
    //exact só ira retornar se o caminho for exato "/"
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/> 
                <Route path="/Register" component={Register}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncidents}/>
            </Switch>
        </BrowserRouter>
    );
}