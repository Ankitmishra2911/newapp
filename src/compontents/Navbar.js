import React,{useState} from "react";
import { Link } from "react-router-dom";

function Navbar(){
  const [search,setSearch]=useState('');
    return(
        <div>
          <div style={{position:"sticky",top:"0" ,zIndex:5}}></div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">CTZ</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        </ul>
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
    );
}
export default Navbar;