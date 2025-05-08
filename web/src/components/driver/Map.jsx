import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistributerLocationMap from './DistributerLocationMap';
import Sidebar from '../driver/sidebar/Sidebar';
import Footer from '../driver/footer/Footer';

axios.defaults.baseURL = "http://127.0.0.1:8000"; // Your backend base URL

const Map = () => {
  const [Distributes, setDistributes] = useState([]);

  // Fetch distributor data from the backend
  useEffect(() => {
    const fetchDistributes = async () => {
      try {
        const response = await axios.get('/distribute/'); // Fetch data from your API
        setDistributes(response.data); // Store the distributor data
      } catch (error) {
        console.error('Error fetching Distributes:', error);
      }
    };
    fetchDistributes();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className='main'>
        <div className='card'>
          <div className="card-body p-0" style={{ minHeight: "38rem" }}>
            <div>
              <DistributerLocationMap Distributes={Distributes} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Map;
