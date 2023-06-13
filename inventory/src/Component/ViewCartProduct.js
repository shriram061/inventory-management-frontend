import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, Link, useNavigate, useParams } from 'react-router-dom';
import NavNotification from './NavNotification';
// import './ViewUser.css';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import "jspdf-autotable";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
function ViewCartProduct() {
    const [zeroQtyCount, setZeroQtyCount] = useState(0);
    const [zeroQtyCount1, setZeroQtyCount1] = useState(0);
    const [zeroQtyCount2, setZeroQtyCount2] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [message, setMessage] = useState('');
    
    
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        
    }, []);

    const userIdmain = localStorage.getItem('userId');
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9876/cart/all', {
            params: {
                // userId: 1
                userId: userIdmain

            }

        })
            .then(response => setCartItems(response.data))
            // .then(data=> {setData(data);})
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:9876/view')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, []);

   

    const handlePageChange = (event) => {
        setCurrentPage(event.target.value);
    }

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(event.target.value);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCartItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    const [sortMethod, setSortMethod] = useState('');
    const [sortDirection, setSortDirection] = useState('');
    function handleSortId() {
        let sortedProducts;
        if (sortMethod === 'id' && sortDirection === 'asc') {
          sortedProducts = [...cartItems].sort((a, b) => b.product.productId - a.product.productId);
          setSortDirection('desc');
        } else {
          sortedProducts = [...cartItems].sort((a, b) => a.product.productId - b.product.productId);
          setSortDirection('asc');
        }
        setSortMethod('id');
        setCartItems(sortedProducts);
      }


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cartItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <option key={number} value={number}>
                {number}
            </option>
        );
    });

    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const handleCheckout = () => {
    //     setLoading(true);
    //     fetch('http://localhost:9876/cart/checkout?userId='+ userIdmain, {
    //         method: 'POST',
    //         //   body: JSON.stringify({ 1}),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.text())
    //         .then(data => {
    //             setLoading(false);
    //             setMessage('Checked out successfully!');
    //             window.location.reload(false);
    //             console.log(data);
    //         })
    //         .catch(error => {
    //             setLoading(false);
    //             setError(error);
    //         });
    // }
    const handleCheckout = () => {
        setLoading(true);
        fetch('http://localhost:9876/cart/checkout?userId=' + userIdmain, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.text())
          .then(data => {
            setLoading(false);
            if (data === 'success') {
              Swal.fire({
                icon: 'success',
                title: 'Checked out successfully!',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                window.location.reload(false);
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to checkout. Please try again later.',
              });
            }
          })
          .catch(error => {
            setLoading(false);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred. Please try again later.',
            });
          });
          if (cartItems.length === 0) {
            Swal.fire({
              icon: 'warning',
              title: 'Empty Cart',
              text: 'There are no items in the cart.',
            });
          }
        };      
    


    const handleExportPDF = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "portrait"; 
      
        const marginLeft = 40;
        const marginRight =225;
        const marginRight1 =390;
        const marginRight3 =260;

        const doc = new jsPDF(orientation, unit, size);
      
        doc.setFontSize(15);
        
        // Company details
        const companyName = "My Inventory Management";
        const companyAddress = "ricky road , Ricky City";
        const companyPhone = "97666-----";
        // const companyPhone1 = "ThankYou For choosing us";
        const companyPhone2 = "";
        const title = "BILL MEMO";
      
        const headers = [["Product ID", "Product Name", "Quantity", "Price"]];
        const dataRows = cartItems.map(item => [
          item.product.productId,
          item.product.productName,
          item.quantity,
          item.product.price * item.quantity,
        ]);
      
        let content = {
          startY: 120, // Start after company details
          head: headers,
          body: dataRows,
          styles: {
            cellWidth: 'wrap',
            cellHeight: 'auto',
          },
        };
        
        // Company details
        doc.text(companyName, marginRight, 40);
        doc.text(companyAddress, marginRight1, 60);
        doc.text(companyPhone, marginRight1, 80);
       
        doc.text(companyPhone2, marginRight1, 80);
      
        // Title and table
        doc.text(title, marginRight3, 100);
        doc.autoTable(content);
      
        // Total price
        const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        doc.text(`Total: Rs.${totalPrice}`, marginLeft, doc.autoTable.previous.finalY + 20);
        // doc.text(companyPhone1, marginRight1, 80);
        // Company seal
        // const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAt0lEQVRIS+2WwQ2AMAxF0S/SKjC8vvcyT7Nbjz9XuMjlVysAm18ZuNtVJh1skx0rL2GtN+HmNo2Q9XzFq3bggZ5ia0dbbH0KpOxgV8EHyhx+fRifnuzQXHJj3qAt8dY5gkv03iMjcxHeuVJDLo8ACnRHZV7oi/NXdnD9VFGZbdYvZAAAAAElFTkSuQmCC';
        // doc.addImage(imgData, 'PNG', 400, 720, 100, 100);
      
        doc.save("bill.pdf");
      };
      
      
      
      
      const [showDropdown, setShowDropdown] = useState(false);
      const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
      const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const [totalPrice, setTotalPrice] = useState(0);

      useEffect(() => {
        let totalPrice = 0;
        for (const item of cartItems) {
          totalPrice += item.quantity * item.product.price;
        }
        setTotalPrice(totalPrice);
      }, [cartItems]);
      


    return (
        <div>
            {/* <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">


<NavNotification/>






            <div class="nav navbar-nav mx-auto navbar-left">
              <Link to="/ehome">  <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand" >INVENTORY MANAGEMENT</a></Link>
            </div>
            <div class="nav navbar-nav mx-auto navbar">

            </div>
            <div class="nav mx-auto navbar-nav navbar-right order-3">
              <ul class="navbar-nav ml-auto">
                <Link to="/ehome">   <a className="navbtn2 "  >Home</a></Link>

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
              href="/ehome"
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
            
            {/* <Link className="btn" to="/adminchatapplication">
                {" "}
                <a className="navbtn2 ">Chat</a>
              </Link> */}

              {/* <Link className="btn" to="/about">
                {" "}
                <a className="navbtn2 ">About</a>
              </Link> */}
              
              <Link className="btn" to="/ehome">
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
                
<hr/>
                <h1 className="text-center">View Cart Items</h1>
                <hr/>
                                {error && <p>{error.message}</p>}
                {message && <p className="message">{message}</p>}
                <table class="table table-striped table-dark table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>ProductId <button id="arrow" onClick={handleSortId}>  { sortMethod === 'id' && sortDirection === 'asc' ? '▼' : sortMethod === 'id' && sortDirection === 'desc' ? '▲' : '↕'}</button></th>
                            <th>ProductName</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            {/* <th>Action</th>
                            <th>checkout</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {renderCartItems} */}
                        {/* {products.map((product) => ( */}
                        {currentCartItems.map(item => (
                            <tr class="table-success" key={item.id}>
                                <td>{item.product.productId}</td>
                                <td>{item.product.productName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.price * item.quantity}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center d-inline-block border rounded p-2">
  Total price: {totalPrice}
</div>
<hr/>



                {cartItems.length > 0 && (
                    <div><br/>
                        <label> Page:</label>
                        <select value={currentPage} onChange={handlePageChange}>
                            {renderPageNumbers}
                        </select> 
                        <label> Items per page:</label>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                )}
                <br/>
                <button className="btn btn-danger btn-block" onClick={handleExportPDF}>Generate Bill</button>

<button className="btn btn-outline-success mx-2" onClick={handleCheckout} disabled={loading}>
                                    {loading ? 'Loading...' : 'CHECKOUT'}
                                </button>
                <Link className="btn btn-outline-danger mx-2" to="/ehome">Back</Link>
                {/* <div>Total price: {totalPrice}</div> */}

            </div></div>
        </div>
    );
}

export default ViewCartProduct;