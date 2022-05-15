import { Navigate } from "react-router-dom";
import {useState} from 'react';
import {checkAuthed, authenticate} from '../auth/auth';

const SignIn = () => {
    const [email,setEmail] = useState('');
    const [password,setPass] = useState('');
    const [emailErrorClass, setEmailErrorClass] = useState('');
    const [passwordErrorClass, setPasswordErrorClass] = useState('');
    const [formErrors, setFormErrors] = useState([]);
    const [isAuthed, setIsAuthed] = useState(false);


    const validateForm = () => {
        //clear
        setFormErrors([]);
        setEmailErrorClass('');
        setPasswordErrorClass('');
        let valid = true;
        if(email.trim() === '') {
            setFormErrors(['You must enter a value.',]);
            setEmailErrorClass('formErrorInput');
            document.querySelector('#email').focus();
            valid = false
        }
        if(password.trim() === '') {
            setFormErrors(['You must enter a value.',]);
            setPasswordErrorClass('formErrorInput');
            document.querySelector('#password').focus();
            valid = false
        }
        return valid;
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log('Sign in happens here');
        const payload = {
            email,
            password
        }
        if(validateForm()) {
            const result = await authenticate(payload);
            console.log('RESULT', result);
            if(result !== 'success') {
                setFormErrors([result]);
            }
            setIsAuthed(checkAuthed());
        }
    }

    const handleChangePass = (e) => {
        setPass(e.target.value);
    }
    
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    return(
        <>
            {
                !isAuthed
                ? <div className="content">
                    <form id="signInForm" className="userForm" onSubmit={handleSignIn} >
                        <h1 className="centerText">Sign In</h1>
                        <div className="formGroup">
                            <label htmlFor="email">Email:</label>
                            <input id="email" className={emailErrorClass} type="email" onChange={handleChangeEmail} />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password:</label>
                            <input id="password" className={passwordErrorClass} type="password" onChange={handleChangePass} />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                        <div className="formErrors">
                            <ul>
                                {
                                    formErrors.map(e => (
                                        <li key={e}>{e}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </form>
                </div>
                : <Navigate to="/" replace={true} />
            }
        </>

    );
}


export default SignIn;