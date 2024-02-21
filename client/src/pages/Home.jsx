import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";


const Home = () => {
    const [posts, setPosts] = useState([]);

    const cat = useLocation().search

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/api/posts/${cat}`);
          setPosts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [cat]);

    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
    }


  // const posts = [
  //   {id: 1, 
  //     title: 'Post 1', 
  //     desc: 'This is post 1', 
  //     img: 'https://www.hotelscombined.com/rimg/dimg/11/3f/12c0ba67-city-31449-169c066fabc.jpg?width=1366&height=768&xhint=2208&yhint=714&crop=true&watermarkposition=lowerright'
  //   },
  //   {id: 2, 
  //     title: 'Post 2', 
  //     desc: 'This is post 2', 
  //     img: 'https://www.hotelscombined.com/rimg/dimg/11/3f/12c0ba67-city-31449-169c066fabc.jpg?width=1366&height=768&xhint=2208&yhint=714&crop=true&watermarkposition=lowerright'
  //   },
  //   {id: 3, 
  //     title: 'Post 3', 
  //     desc: 'This is post 3', 
  //     img: 'https://www.hotelscombined.com/rimg/dimg/11/3f/12c0ba67-city-31449-169c066fabc.jpg?width=1366&height=768&xhint=2208&yhint=714&crop=true&watermarkposition=lowerright'
  //   },
  // ]

  // const getText = (html) =>{
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent
  // }



  return (
    

    <div className='home'>
        <div className='posts'>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
            <img src={`../uploads/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>

              </Link>
              <p>{getText(post.description)}</p>
              <Link className="link" to={`/post/${post.id}`}>
              <button>Read More</button>
              </Link>
              
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Home