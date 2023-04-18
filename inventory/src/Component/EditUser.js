import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavNotification from "./NavNotification";
export default function EditUser() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userIdmain = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`http://localhost:9876/user/getuser/${userIdmain}`);
            setUsername(response.data.userName);
            setEmail(response.data.emailId);
            setPassword(response.data.password);
        }

        fetchUser();
    }, [userIdmain]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.put(`http://localhost:9876/user/`+userIdmain, {
            userName: username,
            emailId: email,
            password: password,
        });

        console.log(response.data);
        navigate('/ehome'); // redirect to user list page after update
    };

    return (
        <>
        <div className="bg-secondary nav-bar navsection  navbar-expand-md navbar-dark bg-dark">
            <nav className="navbar shadow navsection navbar-expand-md navbar-dark ">
                <NavNotification />
                <div className="nav navbar-nav mx-auto navbar-left">
                    <a className="navbar-brand mx-auto nav navbar-nav navbar-right" href="#">
                        {/* INVENTORY MANAGEMENT */}
                        <span className="brand">INVENTORY MANAGEMENT</span>
                    </a>
                </div>
                <div className="nav navbar-nav mx-auto navbar">
                    <a className="navbar-brand mx-auto nav navbar-nav navbar" href="#" />
                </div>
                <div className="nav mx-auto navbar-nav navbar-right order-3">
                    <ul className="navbar-nav ml-auto">
                        <Link className="btn " to="/ehome">
                            {" "}
                            <a className="navbtn2 ">Home</a>
                        </Link>
                        <Link className="btn  me-2" to="/login">
                            {" "}
                            <a className="navbtn2 "> Logout</a>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
        <>
        <div className="container"><div className="shadow  mt-4 p-5 bg-white rounded text-dark">
    <h1 className="text-center">Edit Executive Details</h1>
    <form className="mx-auto mt-5 p-3 border" onSubmit={handleSubmit}>
        <div className="mb-3 d-flex align-items-center">
            <label htmlFor="username" className="form-label me-2">Username:</label>
            <div className="flex-grow-1">
                <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled onBlur={() => document.getElementById('username').disabled = true} />
            </div>
            <button type="button" className="btn btn-secondary btn-sm ms-2" onClick={() => document.getElementById('username').disabled = false}>Edit</button>
        </div>
        <div className="mb-3 d-flex align-items-center">
            <label htmlFor="email" className="form-label me-2">Email - Id:</label>
            <div className="flex-grow-1">
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled onBlur={() => document.getElementById('email').disabled = true} />
            </div>
            <button type="button" className="btn btn-secondary btn-sm ms-2" onClick={() => document.getElementById('email').disabled = false}>Edit</button>
        </div>
        <div className="mb-3 d-flex align-items-center">
            <label htmlFor="password" className="form-label me-2">Password:</label>
            <div className="flex-grow-1">
                <input type="password" placeholder="Edit to change the password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} disabled onBlur={() => document.getElementById('password').disabled = true} />
            </div>
            <button type="button" className="btn btn-secondary btn-sm ms-2" onClick={() => document.getElementById('password').disabled = false}>Edit</button>
        </div>
        <button type="submit" className="btn btn-primary">Update User</button>
        <Link className="btn btn-outline-danger mx-2" to="/ehome">Back</Link>
    </form></div>
</div>

     {/* <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
     <div className="shadow  mt-4 p-5 bg-white rounded text-dark">
        <form className="mx-auto mt-5 p-3 border" onSubmit={handleSubmit}>
            <div className="mb-3 d-flex align-items-center">
                <label htmlFor="username" className="form-label me-2">Username:</label>
                <div className="flex-grow-1">
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled onBlur={() => document.getElementById('username').disabled = true} />
                </div>
                <div className="ms-2">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => document.getElementById('username').disabled = false}>Edit</button>
                </div>
            </div>
            <div className="mb-3 d-flex align-items-center">
                <label htmlFor="email" className="form-label me-2">Email:</label>
                <div className="flex-grow-1">
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled onBlur={() => document.getElementById('email').disabled = true} />
                </div>
                <div className="ms-2">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => document.getElementById('email').disabled = false}>Edit</button>
                </div>
            </div>
            <div className="mb-3 d-flex align-items-center">
                <label htmlFor="password" className="form-label me-2">Password:</label>
                <div className="flex-grow-1">
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} disabled onBlur={() => document.getElementById('password').disabled = true} />
                </div>
                <div className="ms-2">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => document.getElementById('password').disabled = false}>Edit</button>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Update User</button>
        </form>
        </div>
    </div> */}
</>

    </>
    
    );
}
