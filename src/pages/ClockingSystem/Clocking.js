import React, { useState, useEffect, } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GeoLocation from "../../components/Geolocation";
import TopNav from "../../components/TopNav";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { Table } from "react-bootstrap";
import Geocode from "react-geocode";
import moment from 'moment';

const ClockingSystem = () => {
  const navigate = useNavigate();
  const [guest, setUserType] = useState( false);
  const [fullName, setFulName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const  [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const current = new Date();
  const [time, setTime] = useState(current.toLocaleTimeString("en-US"));  

  const [employeeInfos, setEmployeeInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0)

  const [clockinData, setClockinData] = useState([])
  
  Geocode.setApiKey("AIzaSyDsb7F-VyBJn7r4LilYH_lRHBpPfgyUga8");
  Geocode.enableDebug();

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const currentTime = () => {
    let time = new Date().toLocaleTimeString("en-US");
    setTime(time);
  };
  
  setInterval(currentTime, 1000);

  let locator = GeoLocation();

  const handleUserType = (e) => {
    setUserType(!guest);
    setType(e.target.value)
  };

  useEffect(() => {
    setIsLoading(true)
    //getLocation()
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
      navigate("/login");
    }
    const headers = {
      contentType : "application/json",
      Authorization : "Bearer " +  token
    }

    
    axios
      .get("https://gtexterp.herokuapp.com/api/staff/get", {
        headers: headers,
      })
      .then((response) => {
        if (!response) {
          throw Error("Could not fetch the data for that resource");
        }
        setIsLoading(false);
        console.log("response",response.data.data);
        let employeeData = response.data.data;
        employeeData = employeeData.sort().reverse();
        setEmployeeInfos([...employeeData]);
        let objectData = response.data.data;
        console.log("objectData", objectData)
        objectData = objectData.sort().reverse;

        let tableData;
        employeeInfos.map((value, index) => {
          console.log(value.first_name);
          tableData += `
          
           <tr key=${index} value=${value.id}>
         
        <td>1</td>
        <td>${value.first_name}</td>
        <td>${value.last_name}</td>
        <td>${value.email}</td>
        <td>${value.gender}</td>
        <td>${value.profession}</td>
      </tr>
  `;
        });
        document.getElementById("table_body").innerHTML = tableData;
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });

      }, [])
      

  const handleSubmit = async (e) => {
    // auth.login(email);
    e.preventDefault();
    var token = localStorage.getItem("accessToken")
    var organization = localStorage.getItem("organization")

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
      }
      const data = {
    "date": date,
    "check_in_time": time,
    "location": location,
    "purpose_of_visit": purposeOfVisit,
    "email" : email,
    "fullname":  fullName,
    "phone":  phoneNumber,
    "type":  guest,
  }


  axios.post("https://gtexterp.herokuapp.com/api/clockin/create", data, config)
  .then (response => {
    console.log(response);
      console.log(response.data)
      toast.success("Clocked In successfully!")
      //navigate("/checkin");
      
      console.log(response.data.data.fullname);
      localStorage.setItem("fullName", response.data.data.fullname);
      localStorage.setItem("checkInEmail", response.data.data.email);
      localStorage.setItem("clockInTime", response.data.data.check_in_time);
  
  })
  .catch(err => {
      console.error(err.response)
      //setErrorMsg(err.data.message)
  })

  };


  function submitout(checkInEmail) {
    var token = localStorage.getItem("accessToken");

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
      }

  const data = {
    email : checkInEmail ,
  } 

  console.log("data", data)

  axios.post("https://gtexterp.herokuapp.com/api/clockin/logout", data, config)
  .then (response => {
    console.log(response);
      console.log(response.data);

      toast.success("Clocked out successfully!")
      // alert('Check out successfully');
      //navigate(-1);
  
  })
  .catch(err => {
      console.error(err.response)
      //setErrorMsg(err.data.message)
  })
    
  }



  return (
    <div >
      

        <FormContainer>
        <form className="w-25" onSubmit={handleSubmit}>
          <div className="text-center">
            <h1>{time}</h1>
            <h5>{date}</h5>
          </div>
          {/*
          <FormItem>
            <label>User</label>
            <select className="form-control-lg px-2" onChange={(e) => {setUserType(!guest)}}>
              <option value="staff">Staff</option>
              <option value="visitor">Visitor</option>
            </select>
          </FormItem>
            
          */}

          {!guest && (
          <div className="text-center">
            
              <label>Email - User Clock In</label>
              {/*
              <input className="form-control-lg" type="text" onChange={(e) => {setEmail(e.target.value)}} />
              */}
              
            
            <select
              style={{}}
              className="input-field form-control"
              // value={props.departments}
              onChange={(e) => {setEmail(e.target.value);}}
              >
                <option value="default" className="input-field"> Employee Email </option>
                {employeeInfos && Array.isArray(employeeInfos)
                  ? employeeInfos.map((employeeInfos) => {
                    // console.log("department", department);
                      return (
                        <option key={employeeInfos.email} value={employeeInfos.email}> {employeeInfos.email} </option>
                        );
                      }) : null}
              </select>
              
            
          </div>
          )}

          {/*
          guest && (
            <div>
              <FormItem>
                <label>Full Name </label>
                <input className="form-control-lg" type="text"   onChange={(e) => {setFulName(e.target.value)}} />
              </FormItem>
              <FormItem>
                <label>Phone Number</label>{" "}
                <input className="form-control-lg" type="text" onChange={(e) => {setPhoneNumber(e.target.value)}} />
              </FormItem>

              <FormItem>
                <label>Location</label>{" "}
                <input className="form-control-lg" type="text"  onChange={(e) => {setLocation (e.target.value)}}  />
              </FormItem>
              <FormItem>
                <label>Purpose of Visit</label>{" "}
                <input className="form-control-lg" type="text" onChange={(e) => {setPurposeOfVisit (e.target.value)}} />
              </FormItem>
            </div>
          )
          */}
          <div className="d-flex justify-content-center mt-3">
            <button className=" sm-btn-green mx-2" type="submit"  >
              Check-In
            </button>
            {/* <button className="sm-btn">Check-In</button> */}
          </div>
        </form>

        </FormContainer>
      


    </div>
  );
};

const FormContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default ClockingSystem;
