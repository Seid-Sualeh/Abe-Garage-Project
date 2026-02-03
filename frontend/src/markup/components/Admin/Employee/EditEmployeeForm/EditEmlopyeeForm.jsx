import React, { useState, useEffect } from "react";
import employeeService from "../../../../pages/servicesAPI/employee.service";
import { useAuth } from "../../../../../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditEmployeeForm({ employeeId }) {
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [company_role_id, setCompany_role_id] = useState(1);
  const [active_employee, setActiveEmployee] = useState(true);
  // Errors
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(true);

  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employeeService.getEmployee(
          employeeId,
          loggedInEmployeeToken,
        );
        const data = await response.json();
        if (data.status === "success") {
          const emp = data.data;

          setFirstName(emp.employee_first_name);
          setLastName(emp.employee_last_name);
          setEmployeeEmail(emp.employee_email);
          setPhoneNumber(emp.employee_phone);
          setCompany_role_id(emp.company_role_id);
          setActiveEmployee(emp.active_employee);
        } else {
          toast.error("Failed to load employee data");
        }
      } catch (error) {
        toast.error("Error loading employee data");
      } finally {
        setLoading(false);
      }
    };
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId, loggedInEmployeeToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    // First name is required
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // Password has to be at least 6 characters long if provided
    if (employee_password && employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) {
      return;
    }
    const formData = {
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password: employee_password || "", // send empty if not changed
      company_role_id,
      active_employee,
    };

    const updateEmp = employeeService.updateEmployee(
      employeeId,
      formData,
      loggedInEmployeeToken,
    );
    updateEmp
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Employee updated successfully!");
          setTimeout(() => {
            window.location.href = "/admin/employees";
          }, 2000);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <section className="contact-section">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="auto-container">
          <div className="contact-title">
            <h2>
              Edit Employee: {employee_first_name} {employee_last_name}
            </h2>
            <b>
              <h5>Employee email: {employee_email}</h5>
            </b>
          </div>

          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_first_name"
                          value={employee_first_name}
                          onChange={(event) => setFirstName(event.target.value)}
                          placeholder="Employee first name"
                        />
                        {firstNameRequired && (
                          <div className="validation-error" role="alert">
                            {firstNameRequired}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_last_name"
                          value={employee_last_name}
                          onChange={(event) => setLastName(event.target.value)}
                          placeholder="Employee last name"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_phone"
                          value={employee_phone}
                          onChange={(event) =>
                            setPhoneNumber(event.target.value)
                          }
                          placeholder="Employee phone (555-555-5555)"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <select
                          name="employee_role"
                          value={company_role_id}
                          onChange={(event) =>
                            setCompany_role_id(event.target.value)
                          }
                          className="custom-select-box"
                        >
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                        </select>
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="employee_password"
                          value={employee_password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Employee password"
                        />
                        {passwordError && (
                          <div className="validation-error" role="alert">
                            {passwordError}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-12">
                        <label>
                          <input
                            type="checkbox"
                            checked={active_employee}
                            onChange={(event) =>
                              setActiveEmployee(event.target.checked)
                            }
                            style={{ accentColor: "blue", marginRight: "8px" }}
                          />
                          Is employee active
                        </label>
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>UPDATE</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditEmployeeForm;
