import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import formatDistance from 'date-fns/formatDistance';
import moment from 'moment';
import { Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import DepartmentForm from "./DepartmentForm";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import swal from "sweetalert";
import EditDepartmentForm from "./EditDepartment";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [activeClass, setActiveClass] = useState(false);
  const [activeClass1, setActiveClass1] = useState(false);

  const [departmentInfos, setDepartmentInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  var departmentId = localStorage.getItem("departmentId");

  const toggleForm = () => {
    setActiveClass(!activeClass);
    
  };
  const toggleForm1 = () => {
    setActiveClass1(!activeClass1);
    
  };
  


  useEffect(() => {
    setIsLoading(true)
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
        navigate("/login");
    }

    const headers = {
        contentType : "application/json",
        Authorization : "Bearer " +  token
    }
    
    axios.get("https://gtexterp.herokuapp.com/api/department/get", {
        headers : headers
    })
        .then(response => {
          setIsLoading(false);
            console.log(response.data.data)
            let departmentData = response.data.data;
            departmentData = departmentData.sort().reverse();
            setDepartmentInfos([...departmentData]);
            let objectData = response.data.data;
            objectData = objectData.sort().reverse();

      let tableData;
//       objectData.map((value, index) => {
//         const formatDate = moment().format('MMM Do YYYY');
//         const dateStr = value.createdAt;
//         const str = formatDistance(
//             new Date(dateStr),
//             new Date()
//         );
//         // return <h1>{str}</h1>
//         console.log(value.first_name);
//          tableData+= `
        
//          <tr key=${index} value=${value.id}>
       
//       <td>1</td>
//       <td>${value.name}</td>
//       <td>${str}</td>
   
//     </tr>
// `
// })
// document.getElementById("table_body")
// .innerHTML=tableData;
              }) 
              .catch(err=> {
                  console.error(err)
              })
      }, [])


      async function editHandler(id){
        setActiveClass1(!activeClass1);
        
      }



      async function deleteHandler (id) {
        setIsLoading(true);
    
        
        var organization = localStorage.getItem("organization");
    
    
        var token = localStorage.getItem("accessToken");
    
        const config = {
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + token,
          },
        };
    
    
        swal({
          title: "Are you sure?",
          text: "Once deleted, You will not be able to recover this Department",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            
        axios
        .delete(`https://gtexterp.herokuapp.com/api/department/delete?id=${id}`, config)
        .then((response) => {
          setIsLoading(false);
    
          console.log(response);
          //console.log(response.data, "the money is nigeria");
          toast.success('Department Deleted successfully');
          navigate(-1);
        })
        .catch((err) => {
          console.error(err.response);
          toast.error(err.response.data.message);
          setIsLoading(false);
          console.log(err.response.data.message);
          //setErrorMsg(err.data.message)
        });
     
          } else {
            swal("Your Department is safe!");
            setIsLoading(false);
          }
        });
    
    
    
        // }
      }





  return (
    <div>
      <button className="sm-btn" onClick={toggleForm}>Add Department</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <DepartmentForm toggleForm={toggleForm}
           />
        </div>
      </div>

 
      <div className={`employeeform-container ${activeClass1 ? "show" : ""}`}>
        <div
          onClick={toggleForm1}
          className={`employeeform-overlay ${activeClass1 ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <EditDepartmentForm toggleForm1={toggleForm1} />
        </div>
      </div> 

      <div className="back d-flex">
<button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
</div>


      <div className="" style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Created At </th>
          <th>Edit</th>
          <th>Delete</th>
        
        </tr>
      </thead>
      {isLoading && <div><LoadingSpinner /></div>}
      <tbody>
        {departmentInfos.map((departmentInfo, departmentInfoIndex) => (
          <tr key={departmentInfo._id} value={departmentInfo.id}>
       
          <td>1</td>
          <td>{departmentInfo.name}</td>
          <td>{moment(departmentInfo.createdAt).format('LLLL')}</td>
          <td><button className="sm-btn" onClick={() => editHandler(departmentInfo._id)}>Edit</button></td>
          <td><button className="sm-btn" onClick={() => deleteHandler(departmentInfo._id)}>Delete</button></td>
       
        </tr>
        ))}
      </tbody>
      {/* <tbody id='table_body'>
      </tbody> */}
        </Table>
      </div>
    </div>
  );
};

export default Department;
