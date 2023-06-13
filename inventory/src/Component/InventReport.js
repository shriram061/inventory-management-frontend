import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import "jspdf-autotable";
import NavNotification from './NavNotification';
import { json, Link, useNavigate, useParams } from 'react-router-dom';

export default function InventReport() {
  const [inventoryReport, setInventoryReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:12345/report')
      .then(response => response.json())
      .then(json => {
        setData(json);



      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:12345/productreport')
      .then(response => {
        setInventoryReport(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, an error occurred: {error.message}</p>;
  }

  if (!inventoryReport) {
    return null;
  }

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
    const headers = [["Product Id", "Product Name", "Price", "Quantity", "Validity", "Status", "Stocks Worth"]];
    const dataRows = data.map(({ productId, productName, price, quantity, validity, status }) => [productId, productName, price, quantity, validity, status, price * quantity]);

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
    <div className="inventory-report">
      {/* <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
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

              {/* <Link className="btn" to="/about">
                {" "}
                <a className="navbtn2 ">About</a>
              </Link> */}
              
              <Link className="btn" to="/home">
                {" "}
                <a className="navbtn2 ">Home</a>
              </Link>
             
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
          <h1 className="text-center">Inventory Report</h1>
          <button className="btn btn-success btn-block" onClick={handleDownload}>Export XLSX</button><span id='hide'>ccc</span>
          <button className="btn btn-danger btn-block" onClick={handleExportPDF}>Export PDF</button>
          <hr />
          <table class="table table-striped table-light table-bordered">
            <thead>
              <tr class="table-dark">
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Price</th>

                <th>Validity</th>

                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {inventoryReport.products.map(product => (
                <tr key={product.id}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td> <span className={product.status === "INSTOCK" ? "badge bg-success" : product.status === "LOWSTOCK" ? "badge bg-warning" : "badge bg-danger"}>{product.status}</span></td>

                  <td>{product.price}</td>
                  <td>{product.validity}</td>
                  <td>{product.quantity * product.price}</td>


                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

                <td class="table-warning">Total Products:</td>
                <td class="table-warning">{inventoryReport.totalProducts}</td>
              </tr>
              <tr >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="table-success">Total Stock:</td>
                <td class="table-success">{inventoryReport.totalStocks}</td>
              </tr>
            </tfoot>
          </table></div></div>
    </div>
  );
}
