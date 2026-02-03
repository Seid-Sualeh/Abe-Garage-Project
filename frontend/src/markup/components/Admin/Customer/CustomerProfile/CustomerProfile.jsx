import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../../../../context/Auth";
import customerService from "../../../../pages/servicesAPI/customer.service";
import Vehicleform from "../../Vehicle/VehicleForm/Vehicleform";

function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addvehicle, setVehicle] = useState(false);
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await customerService.getCustomer(id, token);
        if (response.ok) {
          const data = await response.json();
          setCustomer(data.customer);
        } else {
          setError("Failed to fetch customer data");
        }
      } catch (err) {
        setError("Error fetching customer data");
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchCustomer();
    }
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Customer Profile</h2>
          </div>

          <div>
            <h2>
              Customer: {customer.customer_first_name}{" "}
              {customer.customer_last_name}
            </h2>
            <h5>Email: {customer.customer_email}</h5>
            <h5>Phone Number: {customer.customer_phone_number}</h5>
            <h5>
              Active Customer: {customer.active_customer_status ? "Yes" : "No"}
            </h5>
            <button
              onClick={() => navigate(`/admin/EditCustomer/${id}`)}
              style={{
                color: "red",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Edit Customer Info: <FaRegEdit />
            </button>

            <h2>Vehicles of {customer.customer_first_name}</h2>
            <h5>No vehicle found</h5>
            <div className="form-group col-md-12">
              <button
                className="theme-btn btn-style-one"
                type="button"
                onClick={() => setVehicle(true)}
                data-loading-text="Please wait..."
              >
                <span>Add Vehicle</span>
              </button>
            </div>

            {addvehicle && (
              <Vehicleform id={id} v={{ addvehicle, setVehicle }} />
            )}

            <div>
              <h2>Orders of {customer.customer_first_name}</h2>
              <h5>No order found</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomerProfile;
