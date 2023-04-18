import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Nav.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const NavNotification = () => {
    const [data, setData] = useState([]);
    const [zeroQtyCount, setZeroQtyCount] = useState(0);
    const [zeroQtyCount1, setZeroQtyCount1] = useState(0);
    const [zeroQtyCount2, setZeroQtyCount2] = useState(0);
      const [products, setProducts] = useState([]);
      const [keyword, setKeyword] = useState('');
      const [dropdownOpen, setDropdownOpen] = useState(false);
  
      useEffect(() => {
        loadProducts();
      }, [keyword]);
    
      function loadProducts() {
        fetch('http://localhost:9876/search?keyword=', {
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
    return (
        <><span id='j' >vvv</span>
        {/* <div style={{ border: '1px solid #ccc', padding: '10px' }}>
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
          
            {data.filter(product => product.quantity < 5 && product.quantity > 0 ).map(product => (
              
              <DropdownItem key={product.productId}>Product:"{product.productName}"(id:{product.productId}) is in {product.status} state.</DropdownItem>
            ))}<hr/>
            <DropdownItem id="e" header>EMPTY-{zeroQtyCount2}</DropdownItem>
            {data.filter(product => product.quantity === 0  ).map(product => (
              <DropdownItem key={product.productId}>Product:"{product.productName}"(id:{product.productId}) is in {product.status} state.</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown></div></> */}
        

        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
<Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
  <DropdownToggle nav>
    <FontAwesomeIcon icon={faBell} style={{ color: 'white' }} />
    {zeroQtyCount > 0 && (
      <span id="span" className="badge badge-danger" style={{ verticalAlign: 'super', marginLeft: '5px' }}>
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
</Dropdown></div></>
        );
    };
    
    export default NavNotification;