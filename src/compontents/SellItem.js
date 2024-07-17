import React, { useState } from 'react';
import './PostForm.css';
import {useNavigate} from   "react-router-dom";

const SellItem = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [sellerid, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhotoUpload = (event) => {
    setPhotos([...photos, ...event.target.files]);
  };
  let navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('contactPerson', contactPerson);
    formData.append('sellerid', sellerid);
    formData.append('phone', phone);

    photos.forEach(photo => {
      formData.append('photos', photo);
    });
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    try {
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({title:title,category:category,description:description,price:price, location:location, contactPerson:contactPerson, sellerid:sellerid, phone :phone,photos:photos}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }
      else{
        navigate('/');
      }

      const data = await response.json();
      console.log(data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error posting data', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
    <h1 className='header'>Post your Items</h1>
    <form onSubmit={handleSubmit} className="post-form">
      <label>Post Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Pick category</option>
        <option value="Book">Book</option>
        <option value="Stationary">Stationary</option>
        <option value="Electronics">Electronics</option>
        <option value="Bicycle">Bicycle</option>
        <option value="OtherAccessories">Other Accessories</option>

      </select>

      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Photos</label>
      <input type="file" multiple onChange={handlePhotoUpload} required/>

      <label>Price</label>
      <input type="tel" value={price}  onChange={(e)=>setPrice(e.target.value)} required />
      <div id="emailHelp" className="form-text">In ₹(Ruppess)</div>

      <label>Location</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}  />
      <div id="emailHelp" className="form-text">Enter your Hostel Number along with Room Number</div>

      <label>Contact Person</label>
      <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)}  />
      <div id="emailHelp" className="form-text">Eg:BTECH/10024/21 ENTER ONLY 1002321</div>

      <label>Roll Number</label>
      <input type="tel" value={sellerid} onChange={(e) => setId(e.target.value)} required />

      <label>Phone Number</label>
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button type="submit">Add Post</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
    </div>
  );
};

export default SellItem;
