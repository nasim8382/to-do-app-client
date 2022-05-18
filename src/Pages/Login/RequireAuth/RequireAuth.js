import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import "./RequireAuth.css";
import spinnerImg from '../../../images/spinner1.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from "../../../firebase.init";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);

  if (loading || sending) {
    return <img className="img-fluid spinner-img mx-auto d-block" src={spinnerImg} alt="" />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.emailVerified) {
    return <div className="requireauth">
        <div className="text-center mt-5">
          <h2 className="text-danger mb-5">Your Email is not verified!!</h2>
          <button
            className="social-login verify-btn mx-auto"
            onClick={async () => {
              await sendEmailVerification();
              toast.success('Successfully sent your email');
            }}
          >Send Verification Email Again</button>
          <ToastContainer position="top-center" />
        </div>
      </div>
  }

  return children;
};

export default RequireAuth;
