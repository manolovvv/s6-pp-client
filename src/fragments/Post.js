import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles/Post.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { RoomPreferences } from "@mui/icons-material";



const Post = props => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const role = window.sessionStorage.getItem("role")
        if (role === "ADMIN") setIsAdmin(true)

    }, [])

    const handleDeletePost = (id) => {
        const jwt = sessionStorage.getItem('jwt')

        axios.delete('http://34.147.33.195:8080/api/post-service/deletepost/' + id,
            {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }).then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleDeleteComment = (id) =>{
        const jwt = sessionStorage.getItem('jwt')

        axios.delete('http://34.147.33.195:8080/api/post-service/deletecomment/' + id,
            {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }).then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleAddComment = () => {
        const comment = document.getElementById("comment").value;
        const jwt = sessionStorage.getItem('jwt')
        if (comment.length > 0) {
            axios.post('http://34.147.33.195:8080/api/post-service/addcomment/' + props.post.id.toString(), {
                text: comment
            },
                {
                    headers: {
                        Authorization: "Bearer " + jwt
                    }
                }).then(function (response) {
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <div
            className="post"
        >
            <div className="post__first-row">
                <span className="post__author"> Author: {props.post.user.firstName} {props.post.user.familyName}</span>
                {isAdmin && <div className="post__delete" onClick={() => handleDeletePost(props.post.id)}>delete</div>}
            </div>
            <span className="post__text">{props.post.text}</span>
            <img className="post__image" alt="" src={props.post.image}></img>

            <span>Comments</span>
            {props.post.comments.map((comment, id) => {
                return (
                    <div className="post__comment" key={id}>
                        <span>{comment.text}</span>
                        {isAdmin && <div className="post__comment__delete" onClick={()=>handleDeleteComment(comment.id)}>delete</div>}
                    </div>
                )
            })}

            {!isAdmin && (
                <div>
            <input type="text" id="comment"></input>
            <button onClick={() => { handleAddComment() }}>Add comment</button>
            </div>
            )}

        </div>
    )
}

export default Post;