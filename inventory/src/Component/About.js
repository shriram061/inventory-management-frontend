import React from "react";
import { Link } from "react-router-dom";
import logo from './Flow.png';
import NavNotification from "./NavNotification";
export default function About() {
  return (
    <>
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
            
              
              <Link  className="btn " to="/queriespost">
                {" "}
                <a className="navbtn2 ">Back</a>
              </Link>
              
             
              {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> */}
              <Link  className="btn  me-2" to="/login">
                {" "}
                <a className="navbtn2 "> Logout</a>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      <h1 className=" my-4 Headline text-center">About Us</h1>
<div>
<img src={logo} alt="Logo" style={{ width: '100%', height: '80%' }}/>
</div>

      <div>
          
          <p className="my-3 text-center">
<ul>
    <li>As a store manager, We are responsible for managing the inventory of the store.
         We have a system that can help manager keep track of the products and their details,
         and make it easier for store manager to manage the inventory.</li>
         <li>
         If we received a shipment of new products that manager wants to add to the inventory.
          Manager went to the system and found a feature that allowed them to easily add new products,
          along with their details such as name, price, and quantity.
         </li>
         <li>
         When the manager noticed that one of the products was running low on stock,
          they quickly went to the system and updated the quantity of the product to reflect the sold items.
           This ensured that the inventory was always up-to-date and accurate.
            With the mail service if the product is below the stock levels required, 
         manager will recieve the mail.
         </li>
         <li>
         Manager also wanted to keep an eye on the products that were running low on stock,
          so theywent to the system to view a report of all such products.
           The report allowed them to quickly reorder the products that were running low on stock,
          ensuring that the store never runs out of stock.
         </li>
         <li>
         Manager wanted to have a quick overview of all the products in the inventory,
          so they used the system to view all the products and their details.
           The system provided them with all the information they needed, 
         including the name, price, and quantity of each product.
         </li>
         <li>
         Manager needed to search for a specific product in the inventory,
          so they used the system's search feature to find the product quickly. 
         The system provided them with accurate results, making it easy for them to find what they needed.
         </li>
         <li>
         Manager wanted to mark some of the products as discontinued so that they would no longe
          be visible in the inventory. The system allowed them to easily mark the products as discontinued,
          ensuring that the inventory only displayed the products that were currently available for sale.
         </li>
         <li>
         Manager was able to keep track of the products, their details,
          and the quantity, ensuring that the store always had the right stock level.
         </li>
</ul>
              
           We Provide you with automatic status update. Additionally we provide you with the low
            stock mail so that you reorder them and keep the stocks in sufficient levels.
            
          </p>
        </div>
      
    </>
  );
}
