import React, { useEffect } from 'react';
import './SocialLogin.css';
import spinner from '../../../images/loader.gif';
import google from '../../../images/google.png';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [
        signInWithGoogle, 
        user, 
        loading, 
        error
    ] = useSignInWithGoogle(auth);

    let from = location.state?.from?.pathname || "/";

    let errorElement;
    let loadingText;

    if (error) {
        errorElement =  <p className='text-center text-danger'>Error:  {error?.message}</p>
    }

    if (loading) {
        loadingText = <img className='loader' src={spinner} alt="spinner" />
    }

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate]);

    return (
        <div className='mt-3'>
            {loadingText}
            {errorElement}
            <button className='d-flex align-items-center justify-content-around social-login mt-3 mx-auto' onClick={ () => signInWithGoogle() }>
                <img height={30} src={google} alt="" />
                <p>Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;