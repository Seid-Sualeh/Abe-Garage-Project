import React, { useState, useEffect } from "react";
import customerService from "../../../../pages/servicesAPI/customer.service";
import { useAuth } from "../../../../../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCustomerForm({ customerId }) {
  const { employee } = useAuth();
  let loggedInEmployeeToken = "";
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone, setPhoneNumber] = useState("");
  const [customer_email, setCustomerEmail] = useState("");

  const [active_customer, setActiveCustomer] = useState(true);
  // Errors
  const [firstNameRequired, setFirstNameRequired] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await customerService.getCustomer(
          customerId,
          loggedInEmployeeToken,
        );
        const data = await response.json();
        if (data.customer) {
          const customer = data.customer;

          setFirstName(customer.customer_first_name);
          setLastName(customer.customer_last_name);
          setCustomerEmail(customer.customer_email);
          setPhoneNumber(customer.customer_phone_number);
          setActiveCustomer(customer.active_customer_status);
        } else {
          toast.error("Failed to load customer data");
        }
      } catch (error) {
        toast.error("Error loading customer data");
      }
    };
    if (customerId) {
      fetchCustomer();
    }
  }, [customerId, loggedInEmployeeToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    // First name is required
    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    if (!valid) {
      return;
    }
    const formData = {
      customer_id: customerId,
      customer_first_name,
      customer_last_name,
      customer_email,
      customer_phone_number: customer_phone,
      active_customer_status: active_customer,
    };

    const updateCustomer = customerService.updateCustomer(
      customerId,
      formData,
      loggedInEmployeeToken,
    );
    updateCustomer
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Customer updated successfully!");
          setTimeout(() => {
            window.location.href = "/admin/customers";
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

  return (
    <div>
      <section className="contact-section">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="auto-container">
          <div className="contact-title">
            <h2>
              Edit : {customer_first_name} {customer_last_name}
            </h2>
            <b>
              <h5>Customer email : {customer_email}</h5>
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
                          name="customer_phone"
                          value={customer_phone}
                          onChange={(event) =>
                            setPhoneNumber(event.target.value)
                          }
                          placeholder="Customer phone (555-555-5555)"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label>
                          <input
                            type="checkbox"
                            checked={active_customer}
                            onChange={(event) =>
                              setActiveCustomer(event.target.checked)
                            }
                            style={{
                              accentColor: "blue",
                              marginRight: "8px",
                              padding: "4px",
                            }}
                          />
                          Is customer active
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

export default EditCustomerForm;
