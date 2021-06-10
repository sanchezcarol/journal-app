import Swal from 'sweetalert2'
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import {startLoading, finishLoading} from './ui'
import { notesLogout } from './notes';

export const signInWithEmailPassword = (email,password) => {
    return (dispatch) => {

        dispatch(startLoading());
    
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then( ({user}) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading()); 
            
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
            dispatch(finishLoading());
        })


    }
}

export const startRegisterUser = (email,password,name) => {

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( async({user}) => {
            await user.updateProfile({displayName:name})
            dispatch( login(user.uid, user.displayName) )
        })
        .catch( e => Swal.fire('Error', e.message, 'error'))

    }

}

export const signInWithGoogle = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({ user }) => {
                dispatch(login(user.uid, user.displayName))
            } )
    }
}

export const login = (uid,name) => ({
        type: types.login,
        payload: {
            uid,
            name
        }
})

export const startLogout = () => {

    return async(dispatch) => {

        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(notesLogout())

    }

}

export const logout = () => {

    return {
        type : types.logout
    }

}

