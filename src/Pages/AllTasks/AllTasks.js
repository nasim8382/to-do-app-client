import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import './AllTasks.css';
import spinnerImg from '../../images/loader1.gif';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiChatDeleteLine } from "react-icons/ri";
import { Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        axios.get('http://localhost:5000/task')
            .then(data => setTasks(data.data));
    }, [isReload])

    let [taskId, setId] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    };

    if (tasks.length === 0) {
        return <img className="img-fluid spinner-img mt-5 mx-auto d-block" src={spinnerImg} alt="" />
    }

    const handleCompleteTask = (id) => {
        var raw = JSON.stringify({
          status: "completed",
        });
    
        var requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          `http://localhost:5000/task/${id}`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            toast.success("Your task is completed");
            setIsReload(!isReload);
          })
          .catch((error) => console.log("error", error));
      };
    

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/task/${taskId}`).then((res) => {
          const remaining = tasks.filter((task) => task._id !== taskId);
          setTasks(remaining);
          toast.success("Product deleted successfully");
        });
        handleClose();
        return;
    };

    return (
        <div>
            <PageTitle title="All-Tasks"></PageTitle>
            <h1 className='purple semi-bold text-center my-5'>Total Tasks: {tasks.length}</h1>

            <div className="container table-container">
        <div className="table-section overflow-auto">
          <Table bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Task Name</th>
                <th>Task Description</th>
                <th className="text-center">Finish Task</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <th>{index + 1}</th>
                  <td className={task.status === "completed" ? "strike" : ""}>{task.name}</td>
                  <td className={task.status === "completed" ? "strike" : ""}>{task.description}</td>
                  <td>
                    <button
                      onClick={() => handleCompleteTask(task._id)}
                      className="complete-btn mx-auto"
                    >
                      Complete
                    </button>
                  </td>
                  <td className="text-center">
                    <RiChatDeleteLine
                      onClick={() => handleShow(task._id)}
                      className="delete-icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button
            onClick={() => navigate("/addtask")}
            className="social-login mt-5 d-block mx-auto"
          >
            Add New Items
          </button>
        </div>
      </div>

            <ToastContainer position="top-center" />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className= "red">Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body className= "purple">Are you sure! you want to delete this task?</Modal.Body>
                <Modal.Footer>
                    <button className="dialog-btn-cancel" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="dialog-btn-confirm" onClick={handleDelete}>
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AllTasks;