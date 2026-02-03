import React, { useState } from "react";
import customerService from "../../../../pages/servicesAPI/customer.service";
import { useAuth } from "../../../../../context/Auth.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCustomerForm() {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");

  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");

  let loggedInEmployeeToken = "";
  // Get the logged in employee token from the context
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // Email is required
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    // If the form is valid, create the form data object
    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status: 1,
    };

    // Pass the form data to the service
    const newCustomer = customerService.createCustomer(
      formData,
      loggedInEmployeeToken,
    );
    newCustomer
      .then((response) => response.json())
      .then((data) => {
        // If Error is returned from the API server, set the error message
        if (data.error) {
          toast.error(data.error);
        } else {
          // Handle successful response
          toast.success("Customer created successfully!");
          // Redirect to the customers page after 2 seconds
          setTimeout(() => {
            window.location.href = "/admin/customers";
          }, 2000);
        }
      })
      // Handle Catch
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

  return (
    <section className="contact-section">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="customer_email"
                        value={customer_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Customer_email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Customer first name"
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
                        name="customer_last_name"
                        value={customer_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Customer last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        value={customer_phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Customer phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add customer</span>
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
  );
}

export default AddCustomerForm;
