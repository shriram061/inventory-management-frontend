import React, { useState, useEffect } from "react";
import axios from "axios";

import NavNotification from "./NavNotification";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
function ContactUs() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9876/contact/viewquery")
      .then((response) => {
        setQueries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Query!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:9876/contact/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to delete Query');
            }
            setData((prevData) => prevData.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error(error);
          });
        Swal.fire(
          'Deleted!',
          'Your Query has been deleted.',
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

  return (
    <>
      <div>
        <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">
            <span id="q">eeee</span>
            <NavNotification />

            <div className="nav navbar-nav mx-auto navbar-left">
              <Link to="/home">
                <a className="navbar-brand mx-auto nav navbar-nav navbar-right brand">
                  INVENTORY MANAGEMENT - ADMIN
                </a>
              </Link>
            </div>
            <div className="nav navbar-nav mx-auto navbar"></div>
            <div className="nav mx-auto navbar-nav navbar-right order-3">
              <ul className="navbar-nav ml-auto">
                <Link to="/home">
                  <a className="navbtn2">Home</a>
                </Link>
                
                <Link to="/">
                  <a className="navbtn2">Logout</a>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="container mt-5"><hr/>
        <h1 className="d-flex justify-content-center">Contact Us Queries</h1>
        {/* <br/> */}
        <hr/>
        <table className="table table-striped table-success table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id} class="table-dark" >
                <td>{query.contactId}</td>
                <td>{query.name}</td>
                <td>{query.emailId}</td>
                <td>{query.phoneNo}</td>
                <td>{query.question}</td>
                <td><button className="navbtn2" onClick={() => handleDelete(query.contactId)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ContactUs;
