import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
const SignUp = () => {

const navigate=useNavigate();

  const [user,setUser] = useState({
    fname:"",
    lname:"",
    email:"",
    password:"",
    
  })
  const handleChange=e=>{
    const {name,value}=e.target
    setUser({
      ...user,
      [name]:value
    })
  }

  const handleLogin=async(e)=>{
    e.preventDefault();
    const{fname,lname,email,password}=user;
    const res= await fetch("/api/signup",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({ 
            "firstname":fname,
            "lastname":lname,
            "email":email,
            "password":password
        })
    })
    const data = await res.json();
    console.log(data);
    if (data.status==="200") {
        toast.success("Registration Successfully",{
            position: "top-right",
            theme:"colored",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            
          });
         setTimeout(() =>{
            navigate("/login")
         },2000)
    } else {
        toast.error(data.error,{
            position: "top-right",
            theme:"colored",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            
          });
    }
  }
  return (
    <div className="container-scroller">
      <ToastContainer/>
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div className="row flex-grow">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="auth-form-transparent text-left p-3">
              <div className="brand-logo">
                <img src="../../images/redesk.png" alt="logo" style={{width: "183px"}}/>
              </div>
              <h4>Registration</h4>
              <h6 className="font-weight-light">Happy to see you again!</h6>
              <form className="pt-3">
                <div className="form-group">
                  <label htmlFor="exampleInputName">First Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0" style={{height: "57px"}}>
                      <i className="fas fa-user text-primary"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control form-control-lg border-left-0" id="exampleInputName"
                      placeholder="First Name" name="fname" value={user.fname} onChange={handleChange}  required/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputLName">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0" style={{height: "57px"}}>
                      <i className="fas fa-user text-primary"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control form-control-lg border-left-0" id="exampleInputLName"
                      placeholder="Last Name" name="lname" value={user.lname} onChange={handleChange}  required/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0" style={{height: "57px"}}>
                      <i className="fas fa-envelope text-primary"></i>
                      </span>
                    </div>
                    <input type="email" className="form-control form-control-lg border-left-0" id="exampleInputEmail"
                      placeholder="Email" name="email" value={user.email} onChange={handleChange}  required/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0" style={{height: "57px"}}>
                      <i className="fas fa-lock text-primary"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control form-control-lg border-left-0" id="exampleInputPassword"
                      placeholder="Password" name="password" value={user.password} onChange={handleChange} required/>
                  </div>
                </div>
            
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" className="auth-link text-black">Forgot password?</a>
                </div>
                <div className="my-3">
                 <input type="submit" onClick={handleLogin} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" value="LOGIN" />
                </div>
                <div className="mb-2 d-flex">
                  <button type="button" className="btn btn-facebook auth-form-btn flex-grow me-1">
                    <i className="mdi mdi-facebook me-2"></i>Facebook
                  </button>
                  <button type="button" className="btn btn-google auth-form-btn flex-grow ms-1">
                    <i className="mdi mdi-google me-2"></i>Google
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account? <Link to="/login" className="text-primary">Login</Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6  d-flex flex-row">
          
            <video id="ap__video--login" className="ap__video--login" src="../../images/Redesk.mp4" poster="true"  playsInline
              preload="auto" autoPlay muted loop style={{width: "-webkit-fill-available", width: "100%"}}>
                  
              </video>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUp