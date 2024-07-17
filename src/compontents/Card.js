import React from "react";
import { Link } from "react-router-dom";

function Card(props){
    return(
        <div class="card" style={{"width": "18rem","backgroundColor":"green","margin":"1px 20px"}}>
<img src={props.source} className="card-img-top" style={{height:"270px",objectFit:"fill"}} alt="Loading..."/>
  <div className="card-body" >
    <h5 className="card-title">{props.foodName}</h5>
    <p className="card-text">Price:₹{props.price} <br/>
    SellerName:{props.sellername}</p>
    <Link to = {`/category/${props.itemid}`} className="btn btn-primary">More Details</Link>
  </div>
</div>
    )
}
export default Card; 