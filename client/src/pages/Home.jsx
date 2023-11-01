import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const user = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.currentUser != null) {
          const res = await axios.get(`https://blog-23-3a2h.onrender.com/api/posts${cat}`);
          setPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat, user]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {user.currentUser == null ? (
          <p>No posts available. Please login to view posts.</p>
        ) : (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`./public/upload/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <button>Read More</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
