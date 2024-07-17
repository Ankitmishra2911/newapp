import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    console.log(JSON.stringify(credentials));
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials");
    }
    if(json.success){
      localStorage.setItem("authtoken",json.authtoken);
      console.log(localStorage.getItem("authtoken"));
      navigate("/");
    }
    
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  function passwordVisibity(){
    let x = document.getElementById("exampleInputPassword1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return(
  <div className="position-relative" style={{ zIndex: 10 }}>
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          <input type="checkbox" onclick="myFunction()" onClick={passwordVisibity} style={{marginTop:"20px"}}/>Show Password
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/createUser" className="m-3 btn btn-danger">Signup</Link>
        
      </form>
      </div>
      </div>
    </div>
  )

}
export default Login;