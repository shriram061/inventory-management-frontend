
import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import NavNotification from "./NavNotification";
export default function Home()





{
  
  return (
    
    <>
    <div id="body">
      {/* narbar */}
      <div className="bg-secondary nav-bar navsection  navbar-expand-md navbar-dark bg-dark">
        <nav className="navbar shadow navsection navbar-expand-md navbar-dark ">

<NavNotification/>
  

          <div className="nav navbar-nav mx-auto navbar-left">
            <a
              className="navbar-brand mx-auto nav navbar-nav navbar-right"
              href="#"
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
            
            {/* <Link className="btn" to="/adminchatapplication">
                {" "}
                <a className="navbtn2 ">Chat</a>
              </Link> */}

              {/* <Link className="btn" to="/about">
                {" "}
                <a className="navbtn2 ">About</a>
              </Link> */}
              
              <Link className="btn" to="/queriesview">
                {" "}
                <a className="navbtn2 ">ViewQuery</a>
              </Link>
             
              <Link  className="btn  me-2" to="/login">
                {" "}
                <a className="navbtn2 "> Logout</a>
              </Link>
              
            </ul>
          </div>
        </nav>
      </div>
      <div className="container" >
      
  

        <div className="shadow  mt-4 p-5 bg-white rounded text-dark"  >


        <div class="row" >
  <div class="col-sm-6 mb-3 mb-sm-0"  >
    <div class="card">
      <div class="card-body" id="delete">
        <h1 class="card-title">LETS ADD THE PRODUCT </h1>
        <h5 class="card-title">Just Need to Add</h5>
        <p class="card-text">Product Name | Quantity | Price | Validity</p>

        <Link to="/add">
            {" "}
            <button id="add" className="btn btn-success butr p-2.5">ADD</button>
          </Link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body" id="add">
        <h1 class="card-title">EXECUTIVE REGISTER </h1>
        <h5 class="card-title">Registering the Executives </h5>
        <p class="card-text">User Name | E-mail | Password </p>
        
<div>
        <Link to="/register">
            {" "}
            <button id="delete" className="btn btn-success butr p-2.5">VIEW</button>
          </Link></div>
      </div>
    </div>
  </div>
</div>
{/* <br/> */}
<div class="row" id="inside">
  <div class="col-sm-6 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body" id="view">
        <h1 class="card-title">GET REPORT </h1>
        <h6 class="card-text">DOWNLOAD the Product Details Reports </h6>
        <p class="card-text">XLSX | PDF  </p>

        <Link to="/productreport">
            {" "}
            <button id="report" className="btn btn-success butr p-2.5">REPORT</button>
          </Link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body" id="edit">
        <h1 class="card-title">DELETE/EDIT Products</h1>
        <h6 class="card-text">DELETE/EDIT the Product Details</h6>

        <p class="card-text">Product Name | Quantity | Price | Validity</p>

        <Link to="/viewstatus">
            {" "}
            <button id="add" className="btn btn-success butr p-2.5">HANDLE</button>
          </Link>
      </div>
    </div>
  </div>
</div>


          
        </div>
        
        

        
      </div></div>
    </>
  );
}
