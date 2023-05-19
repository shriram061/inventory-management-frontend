import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthFunctions } from "../context/AuthContext";
import User from "../Service/UserService";
import "../style.css";
import SocialMedia from "../Component/SocialMedia";

export default class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
        this.changePassword=this.changePassword.bind(this);
        this.changeUserName=this.changeUserName.bind(this);
        this.login=this.login.bind(this);
    }

    componentDidMount() {
        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', this.onBackButtonEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.onBackButtonEvent);
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        window.history.pushState(null, '', window.location.pathname);
    }

    changeUserName=(event)=>{
        this.setState({username:event.target.value})
    }
    changePassword=(event)=>{
        this.setState({password:event.target.value})
    }
    login=(event)=>{
        event.preventDefault();
        let user = {username:this.state.username,password:this.state.password};
        console.log(user);
        User.getUserByName(user.username).then(res=>{
            console.log(res)
            if(res.data!==""){
                console.log("begin authenticate")
                User.authenticateUser(user).then(result=>{
            
                    AuthFunctions.setToken(result.data.jwt);
                    // localStorage.setItem("jwt", result.data.jwt);
                    // console.log(AuthFunctions.getToken())
        
                    User.validateUser(AuthFunctions.getToken()).then(result=>{
                        if(result.data.valid===true){
                            alert("Successfully Logged in as "+result.data.name);
                            AuthFunctions.setUserName(result.data.name);
                            console.log(result.data)
                            AuthFunctions.setId(res.data.userId);
                            localStorage.setItem('userId', res.data.userId);
                            
                            window.location.href = "/ehome";

                        }else{
                            alert("Invalid Username or password");
                        }
                    })
                }).catch(err=>{
                    alert("Invalid Username or password")
                })
            }else{
                alert("Invalid Username or password");
            }
        })
        

    }




    
  render() {
      
    return (
      <div className="main">
        <form className="form-main" onSubmit={this.login}>
          <h2>EXECUTIVE LOGIN</h2>
          <input
            type="text"
            className="field"
            name="username"
            placeholder="Enter Executive User Name"
            value={this.state.username}
            onChange={this.changeUserName}
            required
          />
          <input
            type="password"
            className="field"
            name="password"
            value={this.state.password}
            placeholder="Enter Password"
            onChange={this.changePassword}
            required
          />
          <button type="submit" className="butr">SIGNIN</button>
          <Link to="/admin">Admin Login Go Here</Link>
          {/* <Link to="/chatapplication">Discuss Forum</Link> */}
          {/* <Link to="http://localhost:6543/log">Discuss Forum</Link> */}

        </form>
        <div className="text-center left-main p-2">
        {/* <h1 className="dog">Welcome Back </h1> */}
        <br/>
          <h2>Inventory Management System</h2>

          <p>Get in touch with us!!!!</p>
          <p>Click on contact us!</p>
          <SocialMedia/>
          
          {/* <Link to="/register"><button className="btnl">REGISTER</button></Link> */}
        </div>
      </div>
    );
  }
}
