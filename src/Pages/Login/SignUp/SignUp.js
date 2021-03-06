import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import './SignUp.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import spinner from '../../../images/spinner.gif';
import SocialLogin from '../SocialLogin/SocialLogin';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    let loadingElement;

    const [
        createUserWithEmailAndPassword,
        loading
    ] = useCreateUserWithEmailAndPassword (auth, {sendEmailVerification: true});

    if (loading) {
        loadingElement = <img className='spinner' src={spinner} alt="loading" />;
    }

    const onSubmit = async(data) => {
        const email = data.email;
        const password = data.password;
        const confirmpassword = data.confirmpassword;

        if (password !== confirmpassword) {
            setError('Your two passwords did not match!!!');
            return;
        }

        if (password.length < 6) {
            setError('Password must have 6 characters or more!!!');
            return;
        }

        if (!/(?=.*[0-9])/.test(password)) {
            setError('Password must have at least one number!!!');
            return;
        }

        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Password must have at least one special character!!!');
            return;
        }

        await createUserWithEmailAndPassword(email, password);
        navigate('/addtask');
    };

    return (
        <div>
            <PageTitle title="Sign-Up"></PageTitle>
            <div className="container">
                <div className="row">
                        <div className='form-bg-sign-up'>
                            <div className='form-container-sign-up'>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input placeholder="Your Name" className="mt-5 mb-4 signup-input" {...register("name", { required: true, maxLength: 20 })} required/>
                                <input placeholder="Your Email" className="mb-4 signup-input" type="email" {...register("email")} required/>
                                <input placeholder="Password" className="mb-4 signup-input" type="password" {...register("password")} required/>
                                <input placeholder="Confirm Password" className="mb-3 signup-input" type="password" {...register("confirmpassword")} required/>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <input onClick={ () =>  setAgree(!agree) } {...register("checkbox")} type="checkbox" value="A" />
                                    <label className={`ms-2 ${agree ? 'green' : 'red'}`}>Agree to terms and Conditions</label>
                                </div>

                                <p className='red text-center mt-2'>{error}</p>
                                {loadingElement}

                                <input disabled={!agree} className='submit-style mx-auto' type="submit" value="Sign Up" />
                            </form>

                            <p className='text-center login-text'>Already have an Account?
                                <Link to='/login' className="text-decoration-none login-link"> Please Login</Link>
                            </p>

                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='signup-or-line'></div>
                                <h5 className='signup-or-text'>or sign up with</h5>
                                <div className='signup-or-line'></div>
                            </div>

                            <SocialLogin></SocialLogin>

                            </div>
                        </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;