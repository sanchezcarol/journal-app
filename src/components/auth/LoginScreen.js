import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signInWithEmailPassword, signInWithGoogle } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        email: 'carol_jennifer@hotmail.com',
        password: '123456'
    });

    const { email, password } = values;
    
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(signInWithEmailPassword(email,password))
    }

    const {loading} = useSelector(state => state.ui);

    const handleLoginGoogle = (e) => {
        e.preventDefault();
        dispatch(signInWithGoogle())
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                <input className="auth__input"
                    type="text"
                    placeholder="email"
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
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled = {loading}
                >
                    Ingresar
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        onClick={handleLoginGoogle}
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link" to="/auth/register">
                    Create new account
                </Link>
            </form>
        </>
    )
}
