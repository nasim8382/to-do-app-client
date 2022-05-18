import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.css';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinner from '../../../images/spinner.gif';
import auth from '../../../firebase.init';

const Login = () => {
    const emailRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    let errorElement;
    let loadingElement;

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate]);

    if (loading || sending) {
        loadingElement = <img className='spinner' src={spinner} alt="spinner" />;
    }

    if (error) {
        errorElement =  <p className='text-center text-danger mt-2'>Error: {error?.message}</p>
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        await signInWithEmailAndPassword(email, password);
    }

    const resetPassword = async() => {
        const email = emailRef.current.value;
        console.log(email);
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success('Successfully sent reset link to your email');
        }
        else {
            toast.error('Please enter your email address');
        }
    }

    return (
        <div>
            <PageTitle title="Sign-In"></PageTitle>
            <div className="container">
                <div className="row">
                        <div className='form-bg-login'>
                            <div className='form-container-login'>
                            <h1 className='text-center semi-bold purple mt-5'>Welcome You</h1>

                            <form onSubmit={handleSubmit}>
                                <input ref={emailRef} placeholder="Email Address" className="mt-5 mb-4 signup-input" type="email" name="email" required/>
                                <input placeholder="Your Password" className="mb-4 signup-input" type="password" name="password" required/>
                                {errorElement}
                                {loadingElement}
                                <input className='submit-style mx-auto' type="submit" value="Login" />
                            </form>

                            <p className='text-center login-text'>No Account?
                                <Link to='/signup' className="text-decoration-none login-link"> Create One</Link>
                            </p>

                            <p onClick={resetPassword} className='text-center reset-password'>Lost Your Password?</p>

                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='signup-or-line'></div>
                                <h5 className='signup-or-text'>or sign in with</h5>
                                <div className='signup-or-line'></div>
                            </div>

                            <SocialLogin></SocialLogin>
                            <ToastContainer position="top-center" />

                            </div>
                        </div>

                </div>
            </div>
        </div>
    );
};

export default Login;