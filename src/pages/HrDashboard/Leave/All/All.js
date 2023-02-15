import React from "react";
import { Table } from "react-bootstrap";

const All = () => {
  return (
    <div>
      <button className="sm-btn">Add Leave</button>
      <div style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Description</th>
              <th>From</th>
              <th>To</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Approved by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arnold Alexander</td>
              <td>Sick Leave</td>
              <td>01/10/2022</td>
              <td>30/10/2022</td>
              <td>30 Days</td>
              <td>Completed</td>
              <td>Yussuf Dayo</td>
            </tr>
            <tr>
              <td>Arnold Alexander</td>
              <td>Sick Leave</td>
              <td>01/10/2022</td>
              <td>30/10/2022</td>
              <td>30 Days</td>
              <td>Completed</td>
              <td>Yussuf Dayo</td>
            </tr>
            <tr>
              <td>Arnold Alexander</td>
              <td>Sick Leave</td>
              <td>01/10/2022</td>
              <td>30/10/2022</td>
              <td>30 Days</td>
              <td>Completed</td>
              <td>Yussuf Dayo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default All;
