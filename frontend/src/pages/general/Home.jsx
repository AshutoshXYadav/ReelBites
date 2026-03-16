import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {

  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/show", { withCredentials: true })
      .then((response) => {
        console.log("API response:", response.data);
        setVideos(response.data.foodItems);
      })
      .catch((error) => {
        console.error(
          "Error fetching food items:",
          error.response?.status,
          error.response?.data || error.message
        );
      });
  }, []);

  return (
    <div className="reels-container">
      {videos.map((item) => (
        <div className="reel" key={item._id}>
          <video
            src={item.video}
            className="reel-video"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="reel-overlay">
            <p className="reel-description">{item.description}</p>

            <button
              className="visit-store-btn"
              onClick={() => navigate(`/store/${item.storeId}`)}
            >
              Visit Store
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;