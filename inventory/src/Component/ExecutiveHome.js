import axios from 'axios';
import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ehome.css";
import NavNotification from "./NavNotification";
import NavCart from "./NavCart";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export default function ExecutiveHome()


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

              <span className="brand">INVENTORY MANAGEMENT</span>
            </a>
          </div>
          <div className="nav navbar-nav mx-auto navbar">
            <a className="navbar-brand mx-auto nav navbar-nav navbar" href="#"/>
          </div>
          <div className="nav mx-auto navbar-nav navbar-right order-3">
            <ul className="navbar-nav ml-auto">
            
              
              <Link  className="btn " to="/viewcartreport">
                {" "}
                <a className="navbtn2 ">Cart Report</a>
              </Link>
              <NavCart/>
   
             
              <Link  className="btn  me-2" to="/login">
                {" "}
                <a className="navbtn2 "> Logout</a>
              </Link>
              
            </ul>
          </div>
        </nav>
      </div>
      <div className="container">
      
  

        <div className="shadow  mt-4 p-5 bg-white rounded text-dark">


        <div class="row"  id="inside">
  <div class="col-sm-6 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body" id="delete1">
        <h1 class="card-title">ADD TO DELIVERY CART</h1>
        <h5 class="card-title">Just Need to Add</h5>
        <p class="card-text">Product Name | Quantity | Price | Validity</p>

        <Link to="/deliverycart">
            {" "}
            <button id="report" className="btn btn-success butr p-2.5">ADD</button>
          </Link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body" id="add1">
        <h1 class="card-title">VIEW DELIVERY CART </h1>
        <h5 class="card-title">Available Products Displayed</h5>
        <p class="card-text">Product Name | Product Id | Quantity | Price | Validity | Status</p>
        
<div>
        <Link to="/viewdelivery">
            {" "}
            <button id="view1" className="btn btn-success butr p-2.5">VIEW</button>
          </Link></div>
      </div>
    </div>
  </div>
</div>
{/* <br/> */}
<div class="row" id="inside">
  <div class="col-sm-6 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body" id="view1">
        <h1 class="card-title">GET REPORT </h1>
        <h6 class="card-text">DOWNLOAD the DELIVERY Details Reports </h6>
        <p class="card-text">XLSX | PDF  </p>

        <Link to="/viewcartreport">
            {" "}
            <button id="add1" className="btn btn-success butr p-2.5">REPORT</button>
          </Link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body" id="edit1">
        <h1 class="card-title">EDIT Executive Details</h1>
        <h6 class="card-text">EDIT Executive Details</h6>

        <p class="card-text"> UserName | Password | Email </p>

        <Link to="/edituser">
            {" "}
            <button id="delete1" className="btn btn-success butr p-2.5">HANDLE</button>
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
