import React, { useState } from "react";
import Card from "./Card";


import "./Banner.css";

function Banner() {
  const [items, setItems] = useState([]);
  const [categories,setCategories]=useState([]);

  
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="categories"
              value={categories}
              onChange={(e) => {
                setCategories(e.target.value);
              }}
            >
              {" "}
              <option value="null">ALL CATEGORIES</option>
              <option value="Book">Book</option>
        <option value="Stationary">Stationary</option>
        <option value="Electronics">Electronics</option>
        <option value="Bicycle">Bicycle</option>
        <option value="OtherAccessories">Other Accessories</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategories("Bicycle")} >Bicycle</span>
            <span onClick={()=>setCategories("Electronics")} >Electronics</span>
            <span onClick={()=>setCategories("Book")} >Books</span>
            <span onClick={()=>setCategories("Stationary")} >Stationary</span>
            <span onClick={()=>setCategories("OtherAccessories")} >Other Accessories</span>
          </div>
        </div>
        <div className="banner">
          <img src="src/compontents/banner copy.png" alt="" />
        </div>
      </div>
</div>

  );
}

export default Banner;