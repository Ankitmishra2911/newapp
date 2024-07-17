import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { useState, } from 'react';
import './SingleItem.css';
import ChatPage from './ChatPage';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function SingleItem(){
    const [{itemid,itemprice,itemname,imgsrc,description,sellername,sellerid}]=useLoaderData();
    const handleChat = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/chat', {
          method: 'POST',
          headers: {  
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sellerid: sellerid, itemid:itemid})
        });
        const data = await response.json();
      const chatId = data.id;
      } catch (error) {
        console.error('Error initiating chat:', error);
      }
      console.log(JSON.stringify({ sellerid: sellerid, itemid:itemid}));
    };
  let chatId=9;
    return (
      <div>
        <Navbar style={{position:'sticky'}}/>
      <div className="item-card-container">
        <div className="item-card">
          <div className="item-image">
            <img src={imgsrc} alt={itemname} />
          </div>
          <div className="item-details">
            <div className="item-header">
              <h2 className="item-title">{itemname}</h2>
              <span className="item-price">₹{itemprice}</span>
            </div>
            <div className="item-location-time">
              <span className="item-location">Address</span>
              <span className="item-time">Time</span>
            </div>
            <div className="item-seller">
              <span className="seller-name">{sellername}</span>
              <Link to = {`/chat/${chatId}`} className="btn btn-primary" onClick={handleChat}>Chat with seller</Link> 
              <span className="seller-contact">ContactNumber</span>
            </div>
            <div className="item-description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
export default SingleItem;
