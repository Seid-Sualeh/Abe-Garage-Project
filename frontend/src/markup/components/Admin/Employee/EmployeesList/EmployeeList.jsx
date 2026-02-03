//import react useState and useEffect
import React, { useState, useEffect } from "react";
//import react router
import { useNavigate } from "react-router-dom";
//import react bootstrap
import { Table } from "react-bootstrap";
//import react icons
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

//import auth context
import { useAuth } from "../../../../../context/Auth";
//import date-fns format function for date formatting
import { format } from "date-fns";
//import employee service
import employeeService from "../../../../pages/servicesAPI/employee.service";
//create EmployeeList component
const EmployeeList = () => {
  //create employees state to store employees data
  const [employees, setEmployees] = useState([]);
  //API error states
  const [apiError, setApiError] = useState(false);
  // Error message state
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const { employee } = useAuth();
  const navigate = useNavigate();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees
      .then((response) => {
        if (!response.ok) {
          setApiError(true);
          if (response.status === 401) {
            setApiErrorMessage("Please log in again");
          } else if (response.status === 403) {
            setApiErrorMessage("You do not have permission to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setEmployees(data.data);
        }
      })
      .catch((err) => {});
  }, []);

  // Function to handle edit button click
  const handleEdit = (employee) => {
    navigate(`/admin/EditEmployee/${employee.employee_id}`);
  };

  // Function to handle delete button click
  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await employeeService.deleteEmployee(
          employeeId,
          token,
        );
        if (response.ok) {
          // Refresh the employee list
          const allEmployees = employeeService.getAllEmployees(token);
          allEmployees
            .then((res) => res.json())
            .then((data) => {
              if (data.data && Array.isArray(data.data)) {
                setEmployees(data.data);
              }
            });
        } else {
          alert("Failed to delete employee");
        }
      } catch (error) {
        alert("Error deleting employee");
      }
    }
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("Employees array before map:", employees)}
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>
                        {format(
                          new Date(employee.added_date),
                          "MM - dd - yyyy | kk:mm",
                        )}
                      </td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <button onClick={() => handleEdit(employee)}>
                            <FaRegEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.employee_id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>

          {/* on click to Edit Employee button redirect to editemployee page */}
        </>
      )}
    </>
  );
};

export default EmployeeList;
