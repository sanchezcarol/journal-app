import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { uiRemoveError, uiSetError } from '../../actions/ui';
import { startRegisterUser } from '../../actions/auth';

export const RegisterScreen = () => {
    
    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = values;

    const {msgError} = useSelector(state => state.ui)

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch( startRegisterUser(email,password,name) )
        }
       
    }

    const isFormValid = () => {

        if(name.trim().length === 0){
            dispatch(uiSetError('Name is required'))
            return false;
        } else if( !validator.isEmail(email) ){
            dispatch(uiSetError('email is not valid'))
            return false
        } else if(password.trim().length < 5){
            dispatch(uiSetError('password should be at least 6 characters'))
            return false;
        } else if( password !== password2 ){
            dispatch(uiSetError('password not match'))
            return false;
        }

        dispatch(uiRemoveError())
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            {
                (msgError) &&
                ( <div className="auth__alert-error">{msgError}</div> )
                
            }

            <form onSubmit={handleRegister}>
                <input className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                />
                <input className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />
                <input className="auth__input"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                <input className="auth__input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button 
                    type="submit" 
                    className="mb-5 btn btn-primary btn-block"
                   
                >
                    Register
                </button>

                <Link className="link mt-1" to="/auth/login">
                    Already register?
                </Link>
            </form>
        </>
    )
}
