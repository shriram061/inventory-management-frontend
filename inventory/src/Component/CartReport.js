import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavNotification from "./NavNotification";


function Report() {
  const [reportData, setReportData] = useState([]);
  const userIdmain = localStorage.getItem('userId');
  


  useEffect(() => {
    fetch(`http://localhost:12345/cartreport?userId=${userIdmain}`)
      .then((response) => response.json())
      .then((data) => setReportData(data));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toDateString();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString();
  };

  return (
    <>
      <div>
        {/* <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">
            <span id="q">eeee</span>
            <NavNotification />
            
            <div class="nav navbar-nav mx-auto navbar-left">
              <Link to="/ehome">
                <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand">
                  INVENTORY MANAGEMENT 
                </a>
              </Link>
            </div>
            <div class="nav navbar-nav mx-auto navbar"></div>
            <div class="nav mx-auto navbar-nav navbar-right order-3">
              <ul class="navbar-nav ml-auto">
                <Link to="/deliverycart">
                  <a className="navbtn2">AddCart</a>
                </Link>
                <Link to="/viewdelivery">
                  <a className="navbtn2">ViewCart</a>
                </Link>
                <Link to="/login">
                  <a className="navbtn2">Logout</a>
                </Link>
              </ul>
            </div>
          </nav>
        </div> */}
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

              <Link className="btn" to="/deliverycart">
                {" "}
                <a className="navbtn2 ">AddCart</a>
              </Link>
              
              <Link className="btn" to="/viewdelivery">
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
      </div>
      
      <div className="container">
        <div className="shadow  mt-4 p-5 bg-white rounded text-dark">
          <h1 className="text-center">Cart Report</h1>
          <table class="table table-striped table-dark table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
                <th>Time</th>
                
                <th>Total</th>

                
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr class="table-info" key={item.productId}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatTime(item.date)}</td>
                  
                  <td>{item.total}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Report;
