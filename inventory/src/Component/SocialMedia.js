import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';


function SocialMedia(){

    
    const login = useGoogleLogin    ({
        onSuccess: async response => {
            try{

            
            const data =  await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
                headers:{
                    "Authorization": `Bearer ${response.access_token}`
                }
                
            })

            console.log(data)
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

<button onClick={login}>
    ContactUs
</button>

    </div>
);
}

export default SocialMedia;


