import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Edit from '../imgs/Edit.svg';
import Delete from '../imgs/Delete.svg';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authVerification';

function Manage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {user, login} = useContext(AuthContext);

    const fetchData = async () => {
        try {
            const res = (await axios.get(`http://localhost:8080/api/manage/${user.id}`));
            if (Array.isArray(res.data)) {
                setBlogs(res.data);
            } else {
  
                setError('Invalid data received from the server.');
            }
        } catch (error) {
            setError('Error fetching data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    async function deleteBlog(id) {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}`);
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='edit'>
            <h1>Blog Management</h1>
            <hr />
            <div className='blogs'>
                {blogs.map(blog => (
                    <div key={blog.id}>
                        <div className='blog'>
                            <div className='content'>
                                <h4>{blog.title}</h4>
                                <p>{blog.description}</p>
                            </div>
                            <div className='buttons'>
                                <Link to={`/write/?edit=${blog.id}`} state={blog}>
                                    <img src={Edit} alt="Edit" />
                                </Link>
                                <img src={Delete} alt="Delete" onClick={() => deleteBlog(blog.id)} />
                            </div>
                        </div>
                        <div className="background-divider"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Manage;
