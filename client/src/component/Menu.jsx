import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/?cat=${cat}`);
        setPosts(res.data); // Update the state with the fetched data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <img src={`../uploads/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
