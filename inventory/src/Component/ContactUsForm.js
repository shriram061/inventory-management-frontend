import React, { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import NavNotification from "./NavNotification";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import { faUser } from '@fortawesome/free-solid-svg-icons';
function ContactUsForm() {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [question, setQuestion] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
 
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // emailId={useremailmain};
  //   const newQuery = { name,emailId, phoneNo, question };
  //   axios
  //     .post("http://localhost:9876/contact/querypost", newQuery)
  //     .then((response) => {
  //       console.log(response);
  //       // Reset form fields on success
  //       // const a = {useremailmain};
  //       setName("");
  //       setEmailId("");
  //       setPhoneNo("");
  //       setQuestion("");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuery = { name, emailId, phoneNo, question };
    axios
      .post('http://localhost:9876/contact/querypost', newQuery)
      .then((response) => {
        console.log(response);
        // Reset form fields on success
        setName('');
        setEmailId('');
        setPhoneNo('');
        setQuestion('');
  
        // Display success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Form submitted successfully!',
        });
      })
      .catch((error) => {
        console.log(error);
  
        // Display error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Form submission failed!',
        });
      });
  };
  
  const usernamemain = localStorage.getItem('name');
  const useremailmain = localStorage.getItem('email');
  const [dropdownOpen, setDropdownOpen] = useState(false);


  function handleLogout() {
    localStorage.removeItem(useremailmain);
    localStorage.removeItem(usernamemain);
    window.location.href='http://localhost:3000/';
  
   
  }
  

  

//   const [isLoggedOut, setIsLoggedOut] = useState(false);
  
//   const logout = useGoogleLogout({
//     clientId: '839098834141-hq8lr99sogsmn2s54iins6c0ge7rln5d.apps.googleusercontent.com',
//     onLogoutSuccess: () => {
//         setIsLoggedOut(true);
//         console.log('Logout successful');
//     },
//     onFailure: (err) => {
//         console.log('Logout failed with error:', err);
//     }
// });

// if (isLoggedOut) {
//     window.location.href='http://localhost:3000/'; // Redirect to home page after logout
// }
  return (<>
  <div>
        <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">
            <span id="q">eeee</span>
            {/* <NavNotification /> */}

            <span id='j' >vvv</span>
       
        

        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
<Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
  <DropdownToggle nav>
    <FontAwesomeIcon icon={faUser} style={{ color: 'white' }} />
    
  </DropdownToggle>
  <DropdownMenu right>
  <DropdownItem  header>Welcome back </DropdownItem>
  <DropdownItem id="l" header>{usernamemain} ({useremailmain})</DropdownItem>
  
    
  </DropdownMenu>
</Dropdown></div>





            
            <div class="nav navbar-nav mx-auto navbar-left">
              <Link to="#">
                <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand">
                  INVENTORY MANAGEMENT 
                </a>
              </Link>
            </div>
            <div class="nav navbar-nav mx-auto navbar"></div>
            <div class="nav mx-auto navbar-nav navbar-right order-3">
              <ul class="navbar-nav ml-auto">
                <Link to="/about">
                  <a className="navbtn2">About-Us</a>
                </Link>
               
                <Link to="/">
                  <a className="navbtn2" >Logout</a>
                </Link>
                {/* <button className="navbtn2" onClick={handleLogout}>
                  Logout
                </button> */}
                {/* <button onClick={logOut}>Log out</button> */}
                {/* <a className="navbtn2" href="http://localhost:6543/logoutx">
      Logout
    </a> */}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div class="row justify-content-center">
                    <div style={{ textAlign: "center", fontSize: "20px", marginTop: "20px" }}></div>
      <div class="form-group col-md-6 col-md-offset-5 align-center ">
      <h1>Contact Us Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder={useremailmain}
            value={emailId}
            // disabled
            onChange={(e) => setEmailId(e.target.value)}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="message"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div></div>
    </>
  );
}

export default ContactUsForm;
