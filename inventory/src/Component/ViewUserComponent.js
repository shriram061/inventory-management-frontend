import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavNotification from "./NavNotification";

import axios from 'axios';
const ViewUserComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9876/user/viewuser')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);
  
  const handleDelete = (id) => {
    fetch(`http://localhost:9876/user/${id}`, {
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
      window.location.reload(false);
  };
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  // const handleEdit = (item) => {
  //   setSelectedData(item);
  //   setIsEdit(true);
  // };

  // const handleUpdate = (id, updatedData) => {
  //   fetch(`http://localhost:9876/update/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to update item');
  //       }
  //       setData((prevData) =>
  //         prevData.map((item) => (item.id === id ? updatedData : item)),
  //       );
  //       setIsEdit(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  return (
    <>
    {/* <nav class="navbar navbar-dark bg-dark"><span>f</span>
      <a class="navbar-brand" href="/register">INVENTORY-MANAGEMENT --- ADMIN-PANEL</a>
      <Link class="btn btn-outline-success my-2 my-sm-0" to="/" >Logout</Link>
  </nav> */}
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
            
              
              <Link  className="btn " to="/register">
                {" "}
                <a className="navbtn2 ">Back</a>
              </Link>
              
             
             
              <Link  className="btn  me-2" to="/login">
                {" "}
                <a className="navbtn2 "> Logout</a>
              </Link>
              
            </ul>
          </div>
        </nav>
      </div>
    <div>
        
    

    {/* <div>
      {data.map(item => (
        <div key={item.productId}>{item.productName}</div>
      ))}
    </div> */}

     <div>
        <table class="table table-striped table-light table-bordered">
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>User Password(Encrypted)</th>
                    <th>Email Id</th>
                    <th>Delete User</th> 
                    {/* <th>Edit User</th> */}
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    
                        
                            <tr key={item.userId}>
                                <td> {item.userId}</td>
                                

                                <td> {item.userName}</td>
                                <td> {item.password}</td>
                                <td> {item.emailId}</td>
                                <td>  
                                <button onClick={() => handleDelete(item.userId)}>Delete</button>
                                </td>
                                {/* <td>
                                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger></td> */}
                <td>
                                {/* <Link to={`/edit/${item.userId}`}> Edit </Link> */}

                  </td>
                            </tr>
                    ))
                }
            </tbody>
        </table>
    </div> 

    
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
</div>
{/* 
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Product
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theProduct={} />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal> */}




</>
  );
};
export default ViewUserComponent;
