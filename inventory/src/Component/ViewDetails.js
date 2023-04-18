import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./view.css";
import "./css.css"
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import "jspdf-autotable";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NavNotification from './NavNotification';


// const ViewDetails = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:9876/view')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error(error));
//   }, []);

const ViewDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:12345/report')
      .then(response => response.json())
      .then(json => {
        setData(json);
        


      })
      .catch(error => console.error(error));
  }, []);



 
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, "inventory.xlsx");
  };
  
  const handleExportPDF = () => {
    const unit = "pt";
    const size = "A4"; 
    const orientation = "portrait"; 
  
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
    const title = "Product Details";
    const headers = [["Product Id", "Product Name", "Price", "Quantity", "Validity", "Status","Stocks Worth"]];
    const dataRows = data.map(({productId, productName, price, quantity, validity, status}) => [productId, productName, price, quantity, validity, status,price * quantity]);
  
    let content = {
      startY: 50,
      head: headers,
      body: dataRows
    };
    
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("product-details.pdf");
  };

  
  return (
    <>
      <div>

        <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">


<NavNotification/>



            <div class="nav navbar-nav mx-auto navbar-left">
              <Link to="/home">  <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand" >INVENTORY MANAGEMENT - ADMIN</a></Link>
            </div>
            <div class="nav navbar-nav mx-auto navbar">

            </div>
            <div class="nav mx-auto navbar-nav navbar-right order-3">
              <ul class="navbar-nav ml-auto">
                <Link to="/home">   <a className="navbtn2 "  >Home</a></Link>

                <Link to="/login">    <a className="navbtn2 "> Logout</a></Link>
              </ul>
            </div>
          </nav>
        </div>

        <div className="container">

        
        

          <div className="shadow  mt-4 p-5 bg-white rounded text-dark">
            <div class="search-container">

            </div>
            <hr /> <h1 className="text-center">Product Details</h1> 
            <button className="btn btn-success btn-block" onClick={handleDownload}>Export XLSX</button><span id='hide'>ccc</span>
            <button className="btn btn-danger btn-block" onClick={handleExportPDF}>Export PDF</button>
            
            <hr />
            <div>
              <table class="table table-striped table-light table-bordered">
                <thead >
                  <tr class="table-dark"  >
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Validity</th>

                    <th>Status</th><th>Stocks Worth</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (


                    <tr key={item.reportId}>
                      <td> {item.productId}</td>
                      <td> {item.productName}</td>
                      <td> {item.price}</td>
                      <td> {item.quantity}</td>
                      <td> {item.validity}</td>


                      <td> <span className={item.status === "INSTOCK" ? "badge bg-success" :item.status === "LOWSTOCK" ? "badge bg-warning" : "badge bg-danger"}>{item.status}</span></td>
                      <td>₹ {item.price * item.quantity}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>



          </div></div></div>





    </>
  );
};

export default ViewDetails;
