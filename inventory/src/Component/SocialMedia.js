import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

function SocialMedia(){

    const gitlogin = () =>{
      window.location.assign('http://localhost:6543/log');

    };
    const login = useGoogleLogin    ({
        onSuccess: async response => {
            try{

            
            const data =  await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
                headers:{
                    "Authorization": `Bearer ${response.access_token}`
                }
                
            })

            console.log(data)
            console.log(data.data.email)
            console.log(data.data.name)
            localStorage.setItem('name', data.data.name);
            localStorage.setItem('email', data.data.email);


            window.location.href='http://localhost:3000/queriespost';
        }
            catch(err){
                console.log(err)
            }
        }
      });

// function handleCallbackResponse(response){
// console.log("Token:"+ response.credential);
// }

// useEffect(() =>{
// google.accounts.id.initialize({
//     client_id: "839098834141-hq8lr99sogsmn2s54iins6c0ge7rln5d.apps.googleusercontent.com",
//     callback: handleCallbackResponse
// });
// google.accounts.id.renderButton(
//     document.getElementById("signInDiv"),
//     { theme: "outline", size: "large"}
// );
// }, []);
return(
    <div className='App'>
        {/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>; */}

{/* <button onClick={login}>
    ContactUs
</button> */}
{/* <button type="button"  class="btn btn-outline-warning">Contact Us</button> */}
<button type="button" onClick={() => login()} class="btn btn-info btn-lg">
<i><FaGoogle /></i>

</button>
{/* <button onClick={() => gitlogin()}  className="btn btn-warning btn-lg">
            
<i><FaGithub /></i>
            
          </button> */}
  </div>
  
)
}

export default SocialMedia;


