import React from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import './AddTask.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const { register, handleSubmit } = useForm();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const onSubmit = (data, event) => {
        axios.post('http://localhost:5000/task', data)
            .then(res => {
                const {data} = res;
                if (data.insertedId) {
                    toast.success('New Task added successfully');
                    event.target.reset();
                }
            });
    };

    return (
        <div className='add-tasks-section'>
            <PageTitle title="Add-Task"></PageTitle>
            <div className="container">
                <div className="row">
                        <div className='add-bg'>
                            <div className='add-form'>
                                <h2 className='purple text-center my-5'>Task Details</h2>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input placeholder="Task Name" className="mt-3 mb-4 signup-input" {...register("name", { required: true, maxLength: 20 })} required/>
                                <input placeholder="Task Description" className="mb-4 add-textarea" type="text" {...register("description")} required/>
                                <input placeholder="Your Email" className="mb-5 signup-input" type="text" {...register("email", { value: user?.email})} required readOnly disabled/>
                                <input className='submit-style mx-auto' type="submit" value="Add Task" />
                            </form>
                            </div>
                        </div>
                </div>
                <button
                    onClick={() => navigate("/alltasks")}
                    className="social-login mt-5 d-block mx-auto">
                        See All Tasks
                </button>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default AddTask;