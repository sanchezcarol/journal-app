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
        <div className="animate__animated animate__fadeIn animate__faster">
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
                    className="btn btn-primary btn-block mt-1"
                    disabled = {loading}
                >
                    Ingresar
                </button>

                <div className="auth__social-networks">
                    <p className="mb-1">Or login with</p>
                    <div
                        onClick={handleLoginGoogle}
                        className="google-btn mt-1"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        
                    </div>
                </div>
                <div className="auth__signup"> Don't have account?  
                  <Link className="link" to="/auth/register">
                   Signup Now
                </Link>  
                </div>
                
            </form>
        </div>
    )
}
