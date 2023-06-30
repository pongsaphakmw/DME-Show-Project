import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostData.css";
import firebaseApp from "../InitFirebase";

function PostData() {
    const [data, setData] = useState([]);
    const [ownerData, setOwnerData] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
        const response = await axios.get("/api/posts");
        console.log(response);
        setData(response.data);
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
    };
    
    useEffect(() => {
        fetchData();
        return () => {
        setData([]);
        };
    }, []);
    
    const handleDelete = async (postId) => {
        try {
        const response = await axios.delete(`/api/posts/${postId}`);
        console.log(response);
        fetchData();
        } catch (error) {
        console.error(error);
        }
    };
        
    return (
        <div className="center">
        {data.length === 0 ? (
            <div>No posts</div>
        ) : (
            <div>
                {data.map((post) => (
                    <div key={post._id} className="post-box">
                        <h1>{post.postOwnerName}</h1>
                        <p>{post.context}</p>
                        <img src={post.postIMG} alt="" className="image"/>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
    }

export default PostData;