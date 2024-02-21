import React, { useEffect, useState } from 'react';
import Menu from '../component/Menu';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className="single">
      <div className="content">
        <img src={`../uploads/${post.img}`} alt="" />
        <div className="user">
          <img src={post.userImg} alt="" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
        </div>
        <h2>{post.title}</h2>
        <p dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.description),
        }} />
      </div>
      <div className='menu'>
        <Menu cat={post.cat}/>
      </div>
    </div>
  );
}

export default Single;
