import React, { Component} from "react";
import { Link } from "react-router-dom";
import "../style.css";
import "./Component.css";

export default class Admin extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
       username:"",
       password:""

    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event){
    event.preventDefault();
    if(this.state.username === "admin" && this.state.password === "password"){
      alert('succesfull login as '+this.state.username);
       window.location="/home"
    }else{
      alert('Given username and pasword was wrong please check again');
    }
  }
  render(){
    return (
      <div className="main" >
        <form className="form-main" onSubmit={this.handleSubmit}>
          <h2>ADMIN LOGIN</h2>
          <input id="r"
            type="text"
            className="field"
            name="username"
            placeholder="Enter User Name"
            onChange={this.handleChange}
            
          />
          <input id="r"
            type="password"
            className="field"
            name="password"
            placeholder="Enter Password"
            onChange={this.handleChange}
            
          />
          <button type="submit" className="butr">SIGNIN</button>

          
          {/* <p id="qwerty"><span>  </span><Link to="/login"><button className="butr">USER SIGNIN</button></Link></p> */}
        </form>
        <div className="text-center left-main p-2">
          <h1>Hello! there</h1>
          <p>Are you an USER???? </p>
          <Link to="/login"><button className="btnl">USER SIGNIN</button></Link>
        </div>
      </div>
    );
          }
}
