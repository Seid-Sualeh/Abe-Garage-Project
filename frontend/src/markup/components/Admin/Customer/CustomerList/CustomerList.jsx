//import react useState and useEffect
import React, { useState, useEffect } from "react";
//import react router
import { useNavigate } from "react-router-dom";
//import react bootstrap
import { Table } from "react-bootstrap";
//import react icons
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

import { FaRegEdit, FaSearch } from "react-icons/fa";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

//import auth context
import { useAuth } from "../../../../../context/Auth";
//import date-fns format function for date formatting
import { format } from "date-fns";
//import customer service
import customerService from "../../../../pages/servicesAPI/customer.service";
//create CustomerList component
const CustomerList = () => {
  //create customers state to store customers data
  const [customers, setCustomers] = useState([]);
  //search term state
  const [searchTerm, setSearchTerm] = useState("");
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
    const allCustomers = customerService.getAllCustomers(token);
    allCustomers
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
        if (data.customers && Array.isArray(data.customers)) {
          setCustomers(data.customers);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customer_first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.customer_last_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.customer_email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.customer_phone_number.includes(searchTerm),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Pagination functions
  const goToFirst = () => setCurrentPage(1);
  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLast = () => setCurrentPage(totalPages);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Function to handle edit button click
  const handleEdit = (customer) => {
    navigate(`/admin/EditCustomer/${customer.customer_id}`);
  };

  // Function to handle profile button click
  const handleProfile = (customer) => {
    navigate(`/admin/CustomerProfile/${customer.customer_id}`);
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
                <h2>Customers</h2>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search for Customer using first name, last name, email address of phone number"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  style={{
                    width: "100%",
                    paddingLeft: "10px",
                    paddingRight: "40px",
                    marginBottom: "30px",
                    border: "1px solid ",
                    borderRadius: "4px",
                    height: "40px",
                    boxSizing: "border-box",
                  }}
                />
                <FaSearch
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "30%",
                    transform: "translateY(-50%)",
                    color: "#ccc",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Active</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        {customer.customer_added_date
                          ? format(
                              new Date(customer.customer_added_date),
                              "MM - dd - yyyy | HH:mm",
                            )
                          : "N/A"}
                      </td>
                      <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <button
                            onClick={() => handleEdit(customer)}
                            style={{ marginRight: "8px" }}
                          >
                            <FaRegEdit />
                          </button>
                          {/* this button is redirect to customer profile */}
                          <button onClick={() => handleProfile(customer)}>
                            <LuSquareArrowOutUpRight />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {filteredCustomers.length > itemsPerPage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={goToFirst}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      margin: "0 5px",
                      padding: "5px 30px",
                      border: "none",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <FaAngleDoubleLeft /> First
                  </button>
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      margin: "0 5px",
                      padding: "5px 30px",
                      border: "none",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <FaAngleLeft /> Previous
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      margin: "0 5px",
                      padding: "5px 30px",
                      border: "none",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    Next <FaAngleRight />
                  </button>
                  <button
                    onClick={goToLast}
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      margin: "0 5px",
                      padding: "5px 30px",
                      border: "none",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                  >
                    Last <FaAngleDoubleRight />
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CustomerList;
