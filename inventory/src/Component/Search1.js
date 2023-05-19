import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./search.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Swal from 'sweetalert2';

import NavNotification from './NavNotification';


export default function Search1() {
  const [data, setData] = useState([]);
  const [zeroQtyCount, setZeroQtyCount] = useState(0);
  const [zeroQtyCount1, setZeroQtyCount1] = useState(0);
  const [zeroQtyCount2, setZeroQtyCount2] = useState(0);
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
   
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  
  const [sortMethod, setSortMethod] = useState('');
  const [sortDirection, setSortDirection] = useState('');
 

    useEffect(() => {
      loadProducts();
    }, [keyword]);
  
    function loadProducts() {
      fetch(`http://localhost:9876/search?keyword=&page=${currentPage}&limit=${productsPerPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword: keyword })
      })
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => {
          return product.productName.toLowerCase().includes(keyword.toLowerCase());
        });
        setProducts(filteredProducts);
        const zeroQtyProducts2 = filteredProducts.filter(product => product.quantity < 1);
        const zeroQtyProducts1 = filteredProducts.filter(product => product.quantity < 5 && product.quantity > 0 );
        setZeroQtyCount1(zeroQtyProducts1.length);
        setZeroQtyCount2(zeroQtyProducts2.length);
        const zeroQtyProducts = filteredProducts.filter(product => product.quantity < 5);
        setZeroQtyCount(zeroQtyProducts.length);

      })
      .catch(error => {
        console.error(error);
      });
    }
    
    const handleDelete = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:9876/delete/${id}`, {
            method: 'DELETE',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to delete item');
              }
              setData((prevData) => prevData.filter((item) => item.id !== id));
            })
            .catch((error) => {
              console.error(error);
            });
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          )
          window.location.reload(false);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your item is safe :)',
            'error'
          )
        }
      })
    };
    
    // const handleDelete = (id) => {
    //   fetch(`http://localhost:9876/delete/${id}`, {
    //     method: 'DELETE',
  
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error('Failed to delete item');
    //       }
    //       setData((prevData) => prevData.filter((item) => item.id !== id));
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   window.location.reload(false);
    // };


  
    function handleSearch(event) {
      event.preventDefault();
      setCurrentPage(1);
      loadProducts();
    }
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
   
    function handleSortName() {
      let sortedProducts;
      if (sortMethod === 'name' && sortDirection === 'asc') {
        sortedProducts = [...products].sort((a, b) => b.productName.localeCompare(a.productName));
        setSortDirection('desc');
      } else {
        sortedProducts = [...products].sort((a, b) => a.productName.localeCompare(b.productName));
        setSortDirection('asc');
      }
      setSortMethod('name');
      setProducts(sortedProducts);
    }
  
    function handleSortId() {
      let sortedProducts;
      if (sortMethod === 'id' && sortDirection === 'asc') {
        sortedProducts = [...products].sort((a, b) => b.productId - a.productId);
        setSortDirection('desc');
      } else {
        sortedProducts = [...products].sort((a, b) => a.productId - b.productId);
        setSortDirection('asc');
      }
      setSortMethod('id');
      setProducts(sortedProducts);
    }

    return (
      <div>
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
            
            {/* <Link className="btn" to="/adminchatapplication">
                {" "}
                <a className="navbtn2 ">Chat</a>
              </Link> */}

              <Link className="btn" to="/add">
                {" "}
                <a className="navbtn2 ">Add</a>
              </Link>
              
              <Link className="btn" to="/productreport">
                {" "}
                <a className="navbtn2 ">Report</a>
              </Link>
             
              <Link  className="btn  me-2" to="/login">
                {" "}
                <a className="navbtn2 "> Logout</a>
              </Link>
              
            </ul>
          </div>
        </nav>
      </div>
      {/*  <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">
        

<span id='q'>eeee</span>
<NavNotification />
 <div style={{ border: '1px solid #ccc', padding: '10px' }}>
<Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
  <DropdownToggle nav>
    <FontAwesomeIcon icon={faBell} style={{ color: 'white' }} />
    {zeroQtyCount > 0 && (
      <span id="t" className="badge badge-danger" style={{ verticalAlign: 'super', marginLeft: '5px' }}>
        {zeroQtyCount}
      </span>
    )}
  </DropdownToggle>
  <DropdownMenu right>
  <DropdownItem id="l" header>LOWSTOCK-{zeroQtyCount1} </DropdownItem>
  
    {products.filter(product => product.quantity < 5 && product.quantity > 0 ).map(product => (
      
      <DropdownItem key={product.productId}>Product:"{product.productName}"(id:{product.productId}) is in {product.status} state.</DropdownItem>
    ))}<hr/>
    <DropdownItem id="e" header>EMPTY-{zeroQtyCount2}</DropdownItem>
    {products.filter(product => product.quantity === 0  ).map(product => (
      <DropdownItem key={product.productId}>Product:"{product.productName}"(id:{product.productId}) is in {product.status} state.</DropdownItem>
    ))}
  </DropdownMenu>
</Dropdown></div> 


            <div class="nav navbar-nav mx-auto navbar-left">
              <Link to="/home">  <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand" >INVENTORY MANAGEMENT - ADMIN</a></Link>
            </div>
            <div class="nav navbar-nav mx-auto navbar">

            </div>
            <div class="nav mx-auto navbar-nav navbar-right order-3">
              <ul class="navbar-nav ml-auto">
                <Link to="/add">   <a className="navbtn2 "  >Add</a></Link>
                <Link to="/productreport">   <a className="navbtn2 "  >Report</a></Link>

                <Link to="/login">    <a className="navbtn2 "> Logout</a></Link>
              </ul>
            </div>
          </nav>
        </div> */}
        <div className="container">
        <div className="shadow  mt-4 p-5 bg-white rounded text-dark">
        <form onSubmit={handleSearch}>
        <div className="form-group d-flex justify-content-center">
          
          <input 
    type="text" 
    value={keyword} 
    onChange={e => setKeyword(e.target.value)} 
    placeholder="Enter a search term..."
    className="form-control mr-2"
  />
  <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </form>
        <hr/>
             <h1 className="text-center">Product Details</h1><hr />
             {/* <button type="button" className="btn btn-primary mr-2" onClick={handleSortName}>Sort by name {sortMethod === 'name' && sortDirection === 'asc' ? '▼' : sortMethod === 'name' && sortDirection === 'desc' ? '▲' : ''}</button> */}
              {/* <button type="button" className="btn btn-primary" onClick={handleSortId}>Sort by ID {sortMethod === 'id' && sortDirection === 'asc' ? '▼' : sortMethod === 'id' && sortDirection === 'desc' ? '▲' : ''}</button> */}
        
        <table class="table table-striped table-dark table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>Product Id<button id="arrow" onClick={handleSortId}>  { sortMethod === 'id' && sortDirection === 'asc' ? '▼' : sortMethod === 'id' && sortDirection === 'desc' ? '▲' : '↕'}</button>
 </th>
            
              <th>Product Name<button id="arrow" onClick={() => handleSortName('Product Name')}>{sortMethod === 'name' && sortDirection === 'asc' ? '▼' : sortMethod === 'name' && sortDirection === 'desc' ? '▲' : '↕'}</button></th>
              <th>Price</th>
              <th>Quantity</th>
   
              <th>Status</th>
              <th>Validity</th>
             
              <th>Delete</th>
              <th>Edit</th>

            </tr>
          </thead>
          <tbody>
            {currentProducts.filter(product =>{
              return product.productName.toLowerCase().includes(keyword.toLowerCase()); 
            }).map(product=>


              
              <tr class="table-danger" key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td><span className={product.status === "INSTOCK" ? "badge bg-success" :product.status === "LOWSTOCK" ? "badge bg-warning" : "badge bg-danger"}>{product.status}</span></td>
                <td>{product.validity}</td>
                <td><button id='z' onClick={() => handleDelete(product.productId)}>Delete</button>
                </td>
                
                <td>
                        <Link to={`/edit/${product.productId}`}> Edit </Link>

                      </td>
                
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="pagination justify-content-center">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
            </li>
            {pageNumbers.map((pageNumber) => (
              <li key={pageNumber} className={`page-item ${ currentPage === pageNumber ? 'active' : '' }`}>
                <button className="page-link" onClick={() => setCurrentPage(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            ))}
            <li className={`page-item ${ currentPage === totalPages ? 'disabled' : '' }`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} >
                Next
              </button>
            </li>
          </ul>
        </div>
        
        
        </div>
      </div>
      </div>
    );
    }