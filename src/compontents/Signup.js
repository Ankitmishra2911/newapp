import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [credentials,setcredentials]=useState({fname:"",lname:"",email:"",password:"",personid:""});
    const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
      if(otpVerified){
        e.preventDefault();
        const response=await fetch("http://localhost:4000/api/createUser",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({fname:credentials.fname,lname:credentials.lname,email:credentials.email,password:credentials.password,personid:credentials.personid,otp:otp})
    });
    console.log(JSON.stringify(credentials));
    const json=await response.json()
    console.log(json);
    if(!json.success && otpVerified){
        alert("Enter valid Credentials");
    }
    if(json.success){
      localStorage.setItem("authtoken",json.authtoken);
      console.log(localStorage.getItem("authtoken"));
      navigate("/");
    }
  }

}
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    function passwordVisibity(){
      let x = document.getElementById("exampleInputPassword1");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
    const sendOtp=async(e)=>{
      e.preventDefault();
      try {
        await fetch("http://localhost:4000/send_otp",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({email:credentials.email})
        })
        setOtpSent(true);
      } catch (error) {
        console.error('Error sending OTP', error);
      }

    }
    const verifyOtp=async(e)=>{
      e.preventDefault();

      try {
        await fetch("http://localhost:4000/verify_otp",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({newotp:otp})
        })
        setOtpVerified(true);
      } catch (error) {
        console.error('Error sending OTP', error);
      }
    }
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="card-title text-center mb-4">SignUp</h2>
             <form onSubmit={handleSubmit}>
             <div className="mb-3">
    <label htmlFor="name" className="form-label">First Name</label>
    <input type="text" className="form-control" name='fname' value={credentials.fname} onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Last Name</label>
    <input type="text" className="form-control" name='lname' value={credentials.lname} onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    <button onClick={sendOtp} className="btn btn-primary">Send OTP</button>

{otpSent && (
  <div>
    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
    <button onClick={verifyOtp} className="btn btn-primary">Verify OTP</button>
  </div>
)}

{otpVerified && <p>OTP verified successfully!</p>}
  </div>
  <div className="mb-">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
    <input type="checkbox" onclick="myFunction()" onClick={passwordVisibity} style={{marginTop:"20px",marginBottom:"10px"}}/>Show Password
  </div>
  <div className="mb-3">
    <label htmlFor="personid" className="form-label">RollNo</label>
    <input type="personid" className="form-control" name='personid' value={credentials.personid} onChange={onChange} />
    <div id="text" className="form-text">Format of RollNo is BTECH/XXXXX/XX</div>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
</form>
<div className="d-flex ">
<button type="submit" className="btn btn-primary m-3" >Login with Google <FaGoogle/></button>
<button type="submit" className="btn btn-primary m-3">Login with Google <FaFacebook/></button>
</div>

        </div>
        </div>
    )
}
export default Signup;