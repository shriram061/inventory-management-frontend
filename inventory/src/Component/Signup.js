import React, { Component } from "react";
import "../style.css";
import User from "../Service/UserService.js";
import { Link } from "react-router-dom";
import NavNotification from "./NavNotification";
import Swal from 'sweetalert2';


import ViewUserComponent from "./ViewUserComponent";
// import Signin from "./Signin";
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      emailId: "",
      password: "",
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  register = (event) => {
    event.preventDefault();
    let user = {
      userName: this.state.userName,
      password: this.state.password,
      emailId: this.state.emailId,
    };
    console.log(JSON.stringify(user));
    User.getUserByName(this.state.userName)
      .then((res) => {
        if (res.data == "") {
          User.saveUser(user)
            .then((res) => {
              console.log(res.data);
              Swal.fire({
                title: "Registration Successful",
                text: "Account Generated.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload(false);
                  //window.location.href = "http://localhost:3000/login";
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Swal.fire({
            title: "Registration Failed",
            text: "Username already exists. Please choose a different username.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };




  
  render() {
    return (<>
    
      <div id="op">
      <div className="bg-secondary nav-bar navsection  navbar-expand-md navbar-dark bg-dark">
        <nav className="navbar shadow navsection navbar-expand-md navbar-dark ">

<NavNotification/>
  

          <div className="nav navbar-nav mx-auto navbar-left">
            <a
              className="navbar-brand mx-auto nav navbar-nav navbar-right"
              href="/home"
            >
              {/* INVENTORY MANAGEMENT */}

              <span className="brand">INVENTORY MANAGEMENT - ADMIN</span>
            </a>
          </div>
          <div className="nav navbar-nav mx-auto navbar">
            <a className="navbar-brand mx-auto nav navbar-nav navbar" href="#"/>
          </div>
          <div className="nav mx-auto navbar-nav navbar-right order-3">
            <ul className="navbar-nav ml-auto">
            
              
              <Link  className="btn " to="/home">
                {" "}
                <a className="navbtn2 ">Back</a>
              </Link>
              
             
             
              <Link  className="btn  me-2" to="/login">
                {" "}
                <a className="navbtn2 "> Logout</a>
              </Link>
              
            </ul>
          </div>
        </nav>
      </div>
      {/* <nav class="navbar navbar-dark bg-dark"><span>f</span>
      <a class="navbar-brand" href="/home">INVENTORY-MANAGEMENT --- EXECUTIVE REGISTRATION</a>
      <Link class="btn btn-outline-success my-2 my-sm-0" to="/" >Logout</Link>
  </nav> */}

     
        
<div className="main">
        <form className="form-main" onSubmit={this.register}>
          <h2>REGISTRATION</h2>
          <input
            type="text"
            className="field"
            name="userName"
            placeholder="Enter User Name"
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="email"
            className="field"
            name="emailId"
            placeholder="Enter E-mail Address"
            value={this.state.emailId}
            onChange={this.handleChange.bind(this)}
            required
          />
          <input
            type="password"
            className="field"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            required
          />
          <button type="submit" className="butr">
            SIGNUP
          </button>
        </form><div className="text-center left-main p-2">
        <h2 >VIEW</h2>

        
        {/* <ViewLoanComponent/> */}

        <div class="row">
 
    <div class="card">
      <div class="card-body">
        <h5 id="rq" class="card-title">View User Details</h5>
        <p  id="rq" class="card-text">UserId | UserName | Password | Delete.</p>
        <Link to="/adm" class="btn btn-primary">View</Link>
      </div>
    
  </div>
  
</div>




        </div>
      </div></div></>
    );
  }
}
