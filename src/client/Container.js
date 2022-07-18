import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import SignIn from './SignIn';
import App from './App';
import ListOfSavedPlans from './ListOfSavedPlans'
const Container = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = '/' render = {(props)=><App user {...props} />}/>
                <Route exact path = '/signin' render = {(props)=><SignIn {...props} />}/>
                <Route exact path = '/dayplanner' render = {(props)=><App {...props} />}/>
                <Route exact path = '/dayplanner/:dateSaved' render = {(props)=><App {...props} />}/>
                <Route exact path = '/savedplans' render = {(props)=><ListOfSavedPlans {...props} />}/>
                <Route render = {()=><Redirect to = '/' />}/>
            </Switch>
        </BrowserRouter>
    )
}  

export default Container