import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';


export default function EditService1() {
    let navigate = useNavigate();

    const {id} = useParams();

    const [showAlert, setShowAlert] = useState(false);
    const [products, setProducts] = useState({
     
        productName: "",
        price: "",
        quantity: "",
        validity: "",
       

    });
    const [showReloadMessage, setShowReloadMessage] = useState(false);
    const { productName, price, quantity,validity } = products;

    useEffect(() => {
        loadProducts();
    }, []);

    // const onInputChange = (e) => {
    //     setProducts({ ...products, [e.target.name]: e.target.value });
    // };
    const onInputChange = (e) => {
      if (e.target.value < 0) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
        setProducts({ ...products, [e.target.name]: e.target.value });
      }
    };

   

    // const loadProducts = async () => {
    //     const result = await axios.get(`http://localhost:9876/view/${id}`);
    //     console.log(result.data);
    //     setProducts(result.data);
    //   };

    const loadProducts = async () => {
      const response = await fetch(`http://localhost:9876/view/${id}`);
      const data = await response.json();
      console.log(data);
      setProducts(data);
    };
    

  //   const onSubmit = async (e) => {
  //       e.preventDefault();
  //       await axios.put(`http://localhost:9876/view/update/${id}`, products);
  //   navigate("/viewstatus");
  //   loadProducts();
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setShowReloadMessage(true);
  //   await fetch(`http://localhost:9876/view/update/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(products)
  //   });
  //   navigate("/viewstatus");
  //   setShowReloadMessage(false);
  //   loadProducts();
  // };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setShowReloadMessage(true);

    await fetch(`http://localhost:9876/view/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(products)
    });

    navigate("/viewstatus");
    setShowReloadMessage(false);
    loadProducts();

    // Show a success message
    Swal.fire({
        title: 'Success',
        text: 'Product has been updated',
        icon: 'success',
        confirmButtonText: 'OK'
    });
};


  return (
    <div className="container">
      
      <div className="bg-secondary nav-bar  navbar-expand-md navbar-dark bg-dark">
                        <nav className="navbar shadow navsection navbar-expand-md navbar-dark ">
                            <div class="nav navbar-nav mx-auto navbar-left">
                             <Link to="/home">   <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand" >INVENTORY MANAGEMENT - ADMIN</a></Link>
                            </div>
                            <div class="nav navbar-nav mx-auto navbar">
                                <a class="navbar-brand mx-auto nav navbar-nav navbar" href="#" ></a>
                            </div>
                            <div class="nav mx-auto navbar-nav navbar-right order-3">
                                <ul class="navbar-nav ml-auto">
                                <Link to="/">   <a className="navbtn2 "  >Search</a></Link>
                                    <Link to="/viewstatus">   <a className="navbtn2 " >View Status</a></Link>
                                <Link to="/login">    <a className="navbtn2 "> Logout</a></Link>
                                </ul>
                            </div>



                        </nav>
                    </div>

                   
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Product</h2>
          {showReloadMessage && <div className="alert alert-info">Please Wait...</div>}
          {showAlert && (
            <div className="alert alert-danger">Please enter a positive value.</div>
          )}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
               Product Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                name="productName"
                value={productName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
               Price
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                quantity
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="validity" className="form-label">
                VALIDITY
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="validity"
                name="validity"
                value={validity}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/*   */}
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/viewstatus">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}