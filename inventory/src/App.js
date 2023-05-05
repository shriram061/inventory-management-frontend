
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ViewUserComponent from "./Component/ViewUserComponent";
import ViewDetails from "./Component/ViewDetails";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AddComponent from "./Component/AddComponent";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
import Home from "./Component/Home";
import Admin from "./Component/Admin";
import "./style.css"
import EditService1 from "./Component/EditService1";
import About from "./Component/About";
import Search1 from "./Component/Search1";
import NavNotification from "./Component/NavNotification";
import ExecutiveHome from "./Component/ExecutiveHome";
import ESearch from "./Component/ESearch";
import AddCart from "./Component/AddCart";
import EditUser from "./Component/EditUser";
import ViewCartDelivery from "./Component/ViewCartProduct";
import CartReport from "./Component/CartReport";
import InventReport from "./Component/InventReport";
import ChatRoom from "./Component/ChatRoom";
import AdminChatRoom from "./Component/AdminChatRoom";
import ContactUs from "./Component/ContactUs";
import ContactUsForm from "./Component/ContactUsForm";
import SocialMedia from "./Component/SocialMedia";




class App extends Component {
  render() {
    return (
      <Router>
            <Routes>
            <Route path="/" exact element={<Signin/>} />
            <Route path="/register" element={<Signup/>} />
            <Route path="/login" element={<Signin/>} />
            <Route path="/onlyviewstatus" element={<ViewDetails/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/add" element={<AddComponent/>} />
            <Route path="/adm"  element={<ViewUserComponent/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/edit/:id" element={<EditService1/>}/>
            <Route path="/a" element={<NavNotification/>}/>
            <Route path="/ehome" element={<ExecutiveHome/>} />
            <Route path="/edituser/" element={<EditUser/>}/>
            <Route path="/chatapplication" element={<ChatRoom/>}/>
            <Route path="/adminchatapplication" element={<AdminChatRoom/>}/>
            
            <Route path="/productreport" element={<InventReport/>}/>
            
            <Route path="/add-into-deliverycart/:id" element={<AddCart/>} />
           
            <Route path="/viewstatus" element={<Search1/>}/>
            
            <Route path="/deliverycart" element={<ESearch/>}/>
            <Route path="/viewcartreport" element={<CartReport/>}/>
            
            <Route path="/queriesview" element={<ContactUs/>}/>
            <Route path="/queriespost" element={<ContactUsForm/>}/>
            {/* <Route path="/viewdselivery" element={<ViewUser/>}/> */}
            <Route path="/viewdelivery" element={<ViewCartDelivery/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/social" element={<SocialMedia/>}/>
            </Routes>
      </Router>
    );
  }
}
export default App;

