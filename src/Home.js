import React, { useEffect, useState } from "react";
import Navbar from './compontents/Navbar';
import Card from './compontents/Card';
import Footer from "./compontents/Footer";
import Carousal from "./compontents/Carousal";
import { Link,useNavigate } from "react-router-dom";
import Banner from "./compontents/Banner";


function Home() {
    const navigate=useNavigate();
    const [search,setSearch]=useState('');
    const [items, setItems] = useState([]);
    const [categories,setCategories]=useState([]);
    const loadData = async () => {
        let response = await fetch("http://localhost:4000/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        setItems(response[0].rows);
        setCategories(response[1].rows);
        console.log(response[0].rows,response[1].rows);

    }
    useEffect(() => {
        loadData();

    }, []);
    const handlelogout=async()=>{    
        localStorage.removeItem("authtoken");
        navigate("/login");
    }
    const handleSellButton=async()=>{
      if(localStorage.getItem("authtoken")){
      navigate("/sell");
      }
    else{
      alert("Please Login First");
      navigate('/login');
    }
    }
    return (
        <div>
            <div style={{position:"sticky",top:"0" ,zIndex:5}}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success cursor-pointer"  style={{backgroundColor:"#FFFFFF"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>CTZ</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
        </li>
        </ul>
        {(!localStorage.getItem("authtoken"))?
        
        <div className="d-flex">
        
          <Link className="btn bg-white text-success mx-1" to="/login" style={{cursor:"pointer"}}>Login</Link>
          <Link className="btn bg-white text-success mx-1" to="/createUser">Signup</Link>
          <Link className="btn bg-white text-success mx-1"  onClick={handleSellButton} >Sell</Link>

        
        </div>:<div className="d-flex">
        
        <div className="btn bg-white text-success mx-1" onClick={handlelogout} style={{cursor:"pointer"}}>LogOut</div>
        <Link className="btn bg-white text-success mx-1" to="/sell" onClick={handleSellButton}>Sell</Link>
      
      </div>}
      <div className="d-flex justify-content-center">
        <input className="div-control me-2" type="search" placeholder="Enter the item to search" aria-label="Search" value={search} onChange={(e)=>{
          setSearch(e.target.value);
        }}/>
        <button className="btn btn-outline-dark text-white" type="submit">Search</button>
      </div>
    </div>
  </div>
</nav>
</div>

            <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
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
            <span onClick={()=>setSearch("Bicycle")} >Bicycle</span>
            <span onClick={()=>setSearch("Electronics")} >Electronics</span>
            <span onClick={()=>setSearch("Book")} >Books</span>
            <span onClick={()=>setSearch("Stationary")} >Stationary</span>
            <span onClick={()=>setSearch("OtherAccessories")} >Other Accessories</span>
          </div>
        </div>
        <div className="banner">
          <img src="src/compontents/banner copy.png" alt="" />
        </div>
      </div>
</div>
<Carousal items={items.slice(0,6)}/>
            <h2 style={{ "margin": "40px 5px 10px 10px" }}>Fresh Recommendation</h2>
            <div className="container">
                {
                    categories != [] ? categories.map((data) => {
                        return (
                            <div className="row mb-6">
                            <div key={data.id} className="fs-3 m-3">{data.category_name}
                            </div>
                            <hr/>{
                                
                                    items != []? items.filter((item)=>item.category == data.category_name && (item.itemname.toLowerCase().includes(search.toLocaleLowerCase()) || item.category.toLowerCase().includes(search.toLocaleLowerCase()) )).map((filterItems) => {
                                    return(
                                        
                                        <div key={filterItems.itemid} className="col-12 col-md-6 col-lg-4 mb-6">
                                            <Card foodName={filterItems.itemname} category={filterItems.category} price={filterItems.itemprice} source={filterItems.imgsrc} sellername={filterItems.sellername} itemid={filterItems.itemid}/>
                                            </div>
                                    )
                                    })
                                :<div>No such Data Found
                                    </div>}
                                    </div>
                            )
                    }) : ""
                }
            </div>
            <Footer />
        </div>
    )
}
export default Home;