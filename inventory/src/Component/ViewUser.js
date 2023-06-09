import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, Link, useNavigate, useParams } from 'react-router-dom';
import NavNotification from './NavNotification';
// import './ViewUser.css';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
function ViewProd() {
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


    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9876/cart/all', {
            params: {
                userId: 1
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

    // const addToCart = (productId, quantity) => {
    //     axios.post('http://localhost:9876/cart/addProduct', {
    //         productId,
    //         userId: 1,
    //         quantity
    //     })
    //         .then(response => {
    //             setMessage('Item added to cart successfully!');
    //             window.location.reload(false);
    //             console.log(response);
    //         })
    //         .catch(error => console.error(error));
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const productId = formData.get('productId');
    //     const quantity = formData.get('quantity');
    //     addToCart(productId, quantity);
    // }

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

    const handleCheckout = () => {
        setLoading(true);
        fetch('http://localhost:9876/cart/checkout?userId=1', {
            method: 'POST',
            //   body: JSON.stringify({ 1}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(data => {
                setLoading(false);
                setMessage('Checked out successfully!');
                window.location.reload(false);
                console.log(data);
            })
            .catch(error => {
                setLoading(false);
                setError(error);
            });
    }

    


    const handleExportPDF = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "portrait"; 
      
        const marginLeft = 40;
        const marginRight =235;
        const marginRight1 =390;
        const marginRight3 =260;

        const doc = new jsPDF(orientation, unit, size);
      
        doc.setFontSize(15);
        
        // Company details
        const companyName = "My Inventory Management";
        const companyAddress = "ricky road , Ricky City";
        const companyPhone = "97666-----";
        const companyPhone1 = "ThankYou For choosing us";
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
        doc.text(companyPhone1, marginRight1, 80);
        doc.text(companyPhone2, marginRight1, 80);
      
        // Title and table
        doc.text(title, marginRight3, 100);
        doc.autoTable(content);
      
        // Total price
        const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        doc.text(`Total: Rs.${totalPrice}`, marginLeft, doc.autoTable.previous.finalY + 20);
      
        // Company seal
        // const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAt0lEQVRIS+2WwQ2AMAxF0S/SKjC8vvcyT7Nbjz9XuMjlVysAm18ZuNtVJh1skx0rL2GtN+HmNo2Q9XzFq3bggZ5ia0dbbH0KpOxgV8EHyhx+fRifnuzQXHJj3qAt8dY5gkv03iMjcxHeuVJDLo8ACnRHZV7oi/NXdnD9VFGZbdYvZAAAAAElFTkSuQmCC';
        // doc.addImage(imgData, 'PNG', 400, 720, 100, 100);
      
        doc.save("bill.pdf");
      };
      
      const [showDropdown, setShowDropdown] = useState(false);
      const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
      const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);



    return (
        <div>
            <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">


<NavNotification/>

      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        {/* <DropdownToggle caret>
          View Products
        </DropdownToggle> */}
        <DropdownToggle caret>
  View Products ({cartItemCount})
</DropdownToggle>

        <DropdownMenu>
          <table className="table table-striped table-dark table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ProductId </th>
                <th>ProductName</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {currentCartItems.map(item => (
                <tr className="table-success" key={item.id}>
                  <td>{item.product.productId}</td>
                  <td>{item.product.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <DropdownItem divider />
          <DropdownItem>
            <button className="btn btn-outline-success mx-2" onClick={handleCheckout} disabled={loading}>
              {loading ? 'Loading...' : 'CHECKOUT'}
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>






            <div class="nav navbar-nav mx-auto navbar-left">
              <Link to="/home">  <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand" >INVENTORY MANAGEMENT</a></Link>
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
                                {/* <td>
                                    <button onClick={() => handleOrder(item.product)}>Order</button>
                                </td><td>

                                
                                <button onClick={handleCheckout} disabled={loading}>
                                    {loading ? 'Loading...' : 'Checkout'}
                                </button>
                                {error && <p>{error.message}</p>}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {cartItems.length > 0 && (
                    <div>
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
                <Link className="btn btn-outline-danger mx-2" to="/ehome">Cancel</Link>
            </div></div>
        </div>
    );
}

export default ViewProd;