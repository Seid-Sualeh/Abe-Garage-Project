import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axiosConfig";
import { FaHandPointer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../../../context/Auth";

function CreateOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { employee } = useAuth();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setSearchAttempted(true);
      return;
    }
    try {
      const token = employee?.employee_token;
      const response = await axios.get(
        `/api/search-customers?query=${searchTerm}`,
        {
          headers: { "x-access-token": token },
        },
      );
      // console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setSearchResults(response.data);
      } else if (response.data && typeof response.data === "object") {
        setSearchResults([response.data]);
      } else {
        console.error("Unexpected response format:", response.data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setSearchAttempted(true);
    }
  };

  const handleAddCustomer = () => {
    console.log("Add new customer clicked");
    window.location.replace("/admin/add-customer");
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="container mt-4" style={{ display: "block" }}>
      <div className="contact-section pad_1">
        <div className="contact-title mb-1">
          <h2>Create a new order</h2>
        </div>
      </div>

      <div className=" search_customer">
        <input
          type="text"
          className="w-100 form-control p-4"
          placeholder="Search for a customer using first name, last name, email address or phone number"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* <div className="search_btn">
              <CiSearch size={20} />
          </div> */}
      </div>

      {searchResults.length > 0 && (
        <div className="table-responsive rounded-3">
          <table className="table table-bordered  table-striped table-hover border">
            <tbody>
              {searchResults?.map((customer, index) => (
                <tr key={index}>
                  <td className="customer_name">
                    {customer.customer_first_name}
                  </td>
                  <td className="customer_name">
                    {customer.customer_last_name}
                  </td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    <Link
                      to={`/admin/order-single/${customer.customer_id}`}
                      className="editButton"
                    >
                      <FaHandPointer />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {searchTerm.length > 0 && searchResults.length === 0 && (
        <p>No result found</p>
      )}

      {searchResults.length === 0 && (
        <div className="form-group col-md-12">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            onClick={handleAddCustomer}
          >
            ADD CUSTOMER
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateOrder;
