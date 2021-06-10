import React, { useEffect, useState } from 'react';
import {  BrowserRouter as Router, Switch } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import {  startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking]= useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged(async(user) => {
            
            if(user?.uid){
               
                dispatch(login(user.uid, user.displayName))    
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid))
            }else {
                setIsLoggedIn( false );
            }
            
            setChecking(false);
        })

    }, [dispatch, setChecking, setIsLoggedIn]);

    if(checking){
        return(<div className="app" ><i class="fas fa-spinner fa-3x"></i> </div>)
    }

    return (
        <Router>

            <div>
                <Switch>
                    <PublicRoute  
                    path="/auth" 
                    component={AuthRouter} 
                    isAuthenticated={isLoggedIn}
                    />
                    <PrivateRoute 
                    exact 
                    path="/" 
                    component={JournalScreen} 
                    isAuthenticated={isLoggedIn}
                    
                    />
                </Switch>
            </div>

        </Router>
    )
}
