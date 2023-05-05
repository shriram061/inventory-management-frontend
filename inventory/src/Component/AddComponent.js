import React, { Component } from 'react';

import { Link } from "react-router-dom";
import "./add.css"
import NavNotification from './NavNotification';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { NavLink,Link } from "react-router-dom";
class AddComponent extends Component {
    
        constructor(props) {
            super(props);
            this.state = {
                productName: '',
                price: '',
                quantity: '',
                validity: '',
                isLoading: false,
                errorMessage: '',
            };
            this.changeHandler = this.changeHandler.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        changeHandler(event) {
            this.setState({ [event.target.name]: event.target.value });
        }
    
        // handleSubmit(event) {
        //     event.preventDefault();
        //     this.setState({ isLoading: true });
        //     axios.post('http://localhost:9876/add', {
        //         productName: this.state.productName,
        //         price: this.state.price,
        //         quantity: this.state.quantity,
        //         validity: this.state.validity,
        //     })
        //     .then((response) => {
        //         console.log(response.data);
        //         this.setState({
        //             isLoading: false,
        //             productName: '',
        //             price: '',
        //             quantity: '',
        //             validity: '',
        //             errorMessage: '',
        //         });
        //         alert('Inventory added successfully');
        //     })
        //     .catch((error) => {
        //         console.log(error.response);
        //         this.setState({
        //             isLoading: false,
        //             errorMessage: error.response.data.message,
        //         });
        //     });
        // }
        handleSubmit(event) {
            event.preventDefault();
            this.setState({ isLoading: true });
            axios
              .post('http://localhost:9876/add', {
                productName: this.state.productName,
                price: this.state.price,
                quantity: this.state.quantity,
                validity: this.state.validity,
              })
              .then((response) => {
                console.log(response.data);
                this.setState({
                  isLoading: false,
                  productName: '',
                  price: '',
                  quantity: '',
                  validity: '',
                  errorMessage: '',
                });
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Inventory added successfully',
                });
              })
              .catch((error) => {
                console.log(error.response);
                this.setState({
                  isLoading: false,
                  errorMessage: error.response.data.message,
                });
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
                });
              });
          }
        

    render() {

        return (
            <div id="main-div">
                <div id="nav" >
                    <div className="bg-secondary nav-bar  navbar-expand-md navbar-dark bg-dark">
                        <nav className="navbar shadow navsection navbar-expand-md navbar-dark ">
                            <NavNotification/>
                            <div class="nav navbar-nav mx-auto navbar-left">
                             <Link to="/home">   <a class="navbar-brand mx-auto nav navbar-nav navbar-right brand" >INVENTORY MANAGEMENT - ADMIN</a></Link>
                            </div>
                            <div class="nav navbar-nav mx-auto navbar">
                                <a class="navbar-brand mx-auto nav navbar-nav navbar" href="#" ></a>
                            </div>
                            <div class="nav mx-auto navbar-nav navbar-right order-3">
                                <ul class="navbar-nav ml-auto">
                              
                                    <Link to="/viewstatus">   <a className="navbtn2 " >View Status</a></Link>
                                <Link to="/login">    <a className="navbtn2 "> Logout</a></Link>
                                </ul>
                            </div>



                        </nav>
                    </div>
                    <div class="row justify-content-center">
                    <div style={{ textAlign: "center", fontSize: "20px", marginTop: "20px" }}>
        
        {this.state.isLoading && <div>Loading...</div>}
        
      </div>
                        <div class="form-group col-md-6 col-md-offset-5 align-center ">

                            <form style={{ alignContent: "center", padding: "50px", textAlign: "left", backgroundColor: "#f2f2f2" }} onSubmit={this.handleSubmit}>






                                <div>
                                    <label class="col-md-4 col-form-label">Product Name </label>
                                    <input type="text" class="form-control-md" name="productName" value={this.state.productName} 
                                        minLength="3"
                                        maxLength="50"
                                        title="Name should be alphabets only"  onChange={this.changeHandler} required/>
                                </div>
                                <div>
                                    <label class="col-md-4 col-form-label">Price </label>
                                    <input type="number" class="form-control-md" name="price" value={this.state.price} 
                                        
                                        maxLength="25"
                                        title="Name should be alphabets only" required onChange={this.changeHandler} />
                                </div>
                                <div>
                                    <label class="col-md-4 col-form-label">Quantity</label>
                                    <input type="number" class="form-control-md" name="quantity" value={this.state.quantity} 
                                        
                                        
                                        title="Name should be alphabets only" required onChange={this.changeHandler} />
                                </div>
                               
                                
                                <div>
                                    <label class="col-md-4 col-form-label">validity </label>
                                    <input type="date" class="form-control-md" name="validity" value={this.state.validity}
                                        
                                         required onChange={this.changeHandler} />
                                </div>
                               
                               

                                <div>
                                    <center>
                                     <button class="btn btn-success col-md-4 col-form-label" onClick={this.onButtonClickHandler}>Submit</button>
                                                                     </center>



                                </div>







                            </form>
                            <br />
                            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

                        </div>
                    </div>

                </div>
            </div>
        );
    }

}
export default AddComponent;




