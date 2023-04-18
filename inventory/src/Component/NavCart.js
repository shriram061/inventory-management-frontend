import axios from 'axios';
import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import NavNotification from "./NavNotification";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export default function NavCart(){
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


 

  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = () => {
      setLoading(true);
      fetch('http://localhost:9876/cart/checkout?userId='+ userIdmain, {
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

  


  
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
   
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
      let totalPrice = 0;
      for (const item of cartItems) {
        totalPrice += item.quantity * item.product.price;
      }
      setTotalPrice(totalPrice);
    }, [cartItems]);



    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);



return(
    <div>
        
      
  

        
<Dropdown  isOpen={dropdownOpen} toggle={toggleDropdown}>
        {/* <DropdownToggle caret>
          View Products
        </DropdownToggle> */}
        <DropdownToggle id="bgm" caret>
  Cart <span id="span" className="badge badge-danger" style={{  verticalAlign: 'super', marginLeft: '5px' }}>
        {cartItemCount}
      </span>
</DropdownToggle>

        <DropdownMenu>
        {/* <div className="shadow  mt-4 p-5 bg-white rounded text-dark">  */}
        <div>
        <h1 class="text-center">Cart Items</h1>
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
              {cartItems.map(item => (
                <tr className="table-warning" key={item.id}>
                  <td>{item.product.productId}</td>
                  <td>{item.product.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
          <DropdownItem divider />
          <DropdownItem>
            {/* <button className="btn btn-outline-success mx-2" onclick="location.href = 'http://localhost:3000/viewdelivery'" disabled={loading}>
              {loading ? 'Loading...' : 'CHECKOUT'}
            </button> */}
            <Link className="btn btn-outline-danger mx-2" to="/viewdelivery">View</Link>
            {/* <Link to="/viewdelivery">Logout</Link> onClick={handleCheckout}*/}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </div>
);
}
