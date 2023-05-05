import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import "./ChatRoom.css";
import { Link} from "react-router-dom";
import NavNotification from './NavNotification';

var stompClient =null;
const ChatRoom = () => {
    // const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:3456/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                // if(!privateChats.get(payloadData.senderName)){
                //     privateChats.set(payloadData.senderName,[]);
                //     setPrivateChats(new Map(privateChats));
                // }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        // if(privateChats.get(payloadData.senderName)){
        //     privateChats.get(payloadData.senderName).push(payloadData);
        //     setPrivateChats(new Map(privateChats));
        // }else{
        //     let list =[];
        //     list.push(payloadData);
        //     privateChats.set(payloadData.senderName,list);
        //     setPrivateChats(new Map(privateChats));
        // }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
        //   if(userData.username !== tab){
        //     privateChats.get(tab).push(chatMessage);
        //     setPrivateChats(new Map(privateChats));
        //   }
        //   stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        //   setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
        <div className="bg-secondary nav-bar nav-sticky navbar-expand-md navbar-dark bg-dark">
          <nav className="navbar navbar-expand-md navbar-dark navsection shadow">
            <span id="q">eeee</span>
            <NavNotification />
            
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
                <Link to="/queriespost">
                  <a className="navbtn2">Contact Us</a>
                </Link>
               
                <Link to="/">
                  <a className="navbtn2">Logout</a>
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
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li>ChatRoom</li>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {/* {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))} */}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input id='input' type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button id='button' type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {/* {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))} */}
                </ul>

                <div className="send-message">
                    <input  id='input' type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button id='button' type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <input
                id="user-name input"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button id='button' type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    )
}

export default ChatRoom