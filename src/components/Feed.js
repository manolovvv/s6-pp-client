import React, { useEffect } from "react";
import { useState } from "react";
import Post from '../fragments/Post'
import axios from "axios";

import './style/Feed.css'


const Feed = () =>{

    const[posts, setPosts] = useState([])
   

    useEffect(()=>{

        

        const jwt = window.sessionStorage.getItem("jwt")
        window.sessionStorage.setItem("jwt",jwt)


        axios.get('http://34.147.33.195:8080/api/post-service',{
            headers:{
                Authorization: "Bearer "+ jwt
            }
        }).then(function (response) {
            setPosts(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
       
    },[])

        return(
            <div className="feed">
            {posts.length>0 && posts.map((post, id)=>{
                return <Post 
                post={post}
                key={id}/>
            })}
            </div>
            );
    
}

export default Feed;