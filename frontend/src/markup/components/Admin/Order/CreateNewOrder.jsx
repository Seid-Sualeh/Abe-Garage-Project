import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import customerService from "../../../../pages/servicesAPI/customer.service";
import vehicleService from "../../../../pages/servicesAPI/vehicle.service";
import serviceService from "../../../../pages/servicesAPI/service.service";
import "./CreateNewOrder.css";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import "./CreateNewOrder.css";
import { FaEdit } from "react-icons/fa";
// import axios from "../../../../utils/axiosConfig";

const api_url = import.meta.env.VITE_API_URL;
function CreateNewOrder() {
  const employee = JSON.parse(localStorage.getItem("employee"));
  const token = employee?.employee_token;
  // console.log(employee_id)
  // console.log("token:", token);

  const { ID, vID } = useParams();
  // console.log(ID,vID)

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDescription, setServiceDescription] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  const [orderTotalPrice, setOrderTotalPrice] = useState("");
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  const getServiceList = async () => {
    try {
      const data = await serviceService.getServiceList();

      console.log("create order", data);
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);

  const fetchSingleCustomerData = async () => {
    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      const data = await customerService.singleCustomer(ID, token);
      setCustomerInfo(data.customer);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    fetchSingleCustomerData();
  }, [ID, token]);

  const fetchVehicleInfo = async () => {
    try {
      const response = await vehicleService.getVehicleInfo(vID, token);
      console.log("vehicleService response:", response);
      // Normalize possible response shapes:
      // 1) service returns axios response.data -> { status, data }
      // 2) service returns inner data object -> { vehicle_make, ... }
      // 3) service returns axios response -> { data: { status, data } }
      let vehicleObj = null;
      if (response && response.data && response.data.data) {
        vehicleObj = response.data.data;
      } else if (response && response.data && !response.data.data) {
        vehicleObj = response.data;
      } else if (response && !response.data) {
        vehicleObj = response;
      }

      setVehicleInfo(vehicleObj);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchVehicleInfo();
  }, [vID]);

  const handleServiceSelection = (service_id) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(service_id)) {
        // If service is already selected, remove it
        return prevServices.filter((id) => id !== service_id);
      } else {
        // If service is not selected, add it
        return [...prevServices, service_id];
      }
    });
    console.log(service_id);
  };
  // console.log(service.service_id)

  const handleOrderTotalPriceChange = (e) => {
    setOrderTotalPrice(e.target.value);
  };

  const handleEstimatedCompletionDateChange = (event) => {
    setEstimatedCompletionDate(event.target.value);
  };

  const calculateOrderDescription = () => {
    return selectedServices
      .map((service) => service.service_description)
      .join(" ");
  };

  // Handle order description change
  const handleOrderDescriptionChange = (e) => {
    setOrderDescription(e.target.value);
  };

  useEffect(() => {
    setOrderDescription(calculateOrderDescription());
  }, [selectedServices]);

  const handleAdditionalRequest = (e) => {
    setServiceDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (!customerInfo) {
      console.error("Customer info not loaded");
      return;
    }
    if (!vehicleInfo) {
      console.error("Vehicle info not loaded");
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service");
      return;
    }
    if (!orderTotalPrice.trim()) {
      setErrorMessage("Please enter the order total price");
      return;
    }
    if (!estimatedCompletionDate.trim()) {
      setErrorMessage("Please enter the estimated completion date");
      return;
    }
    const requestBody = {
      employee_id: employee.employee_id, //
      customer_id: customerInfo.customer_id,
      vehicle_id: vehicleInfo.vehicle_id,
      active_order: 2, // Always active order
      order_description: orderDescription,
      estimated_completion_date: estimatedCompletionDate,
      completion_date: null,
      order_completed: 0,
      order_status: 3,
      order_total_price: orderTotalPrice,
      additional_request: serviceDescription,
      order_services: selectedServices.map((serviceId) => ({
        service_id: serviceId,
        service_completed: false,
      })),
    };
    console.log(requestBody);

    try {
      const response = await fetch(`${api_url}/admin/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Response status:",
          response.status,
          "Response body:",
          errorText,
        );
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setTimeout(() => {
        navigate("/admin/orders");
      }, 2000);
      setNotification("Order successfully submitted");
    } catch (error) {
      setErrorMessage("Error submitting order: " + error.message);
      console.error("Error submitting order:", error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/admin/orders");
  };

  const handleEditCustomerClick = () => {
    const editCustomerPath = `/admin/edit-customer/${customerInfo.customer_id}`;
    window.location.href = editCustomerPath;
  };

  const handleEditVehicleClick = () => {
    const editVehiclePath = `/edit-vehicle/${ID}`;
    window.location.href = editVehiclePath;
  };

  const handleRedirectVehicle = () => {
    navigate(`/admin/order-single/${ID}`);
  };

  const handleRedirectCustomer = () => {
    navigate(`/admin/create-order`);
  };

  const handleClickOut = (event) => {
    if (event.target.classList.contains("notification_main")) {
      setNotification("");
      navigate("/admin/orders");
      console.log("Notification cleared");
    }
  };
  const handleNotificationButtonClick = () => {
    setNotification(""); // Hide notification
    navigate("/admin/orders"); // Navigate to the orders page
  };

  return (
    <div className="create-order-container">
      {notification && (
        <div onClick={handleClickOut} className="notification_main">
          <div className="notification">
            {notification} <br />
            <button onClick={handleNotificationButtonClick}>Ok</button>
          </div>
        </div>
      )}

      <div className="contact-section pad_1">
        <div className="contact-title mb-1">
          <h2>Create a new order</h2>
        </div>
      </div>
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {customerInfo ? (
        <div className="CustomerInfo">
          <div className="CustomerInfo_two">
            <div>
              <h2 className="customer_name">
                {customerInfo.customer_first_name}{" "}
                <span>{customerInfo.customer_last_name}</span>
              </h2>
            </div>
            <div>
              <CancelPresentationIcon
                onClick={handleRedirectCustomer}
                className="icon"
              />
            </div>
          </div>
          <p>
            <span className="label customer_label_info">Email:</span>{" "}
            <span className="value customer_label_value">
              {customerInfo.customer_email}
            </span>
          </p>
          <p>
            <span className="label customer_label_info">Phone Number:</span>{" "}
            <span className="value customer_label_value">
              {customerInfo.customer_phone_number}
            </span>
          </p>
          <p>
            <span className="label customer_label_info">Active Customer:</span>{" "}
            <span className="value  customer_label_value">
              {customerInfo.active_customer_status ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <span className="label  customer_label_info">
              Edit customer info:
            </span>{" "}
            {/* <FaEdit 
                className="icon"
                onClick={handleEditCustomerClick}
                size={20}
                /> */}
            <Link to={`/admin/EditCustomer/${customerInfo.customer_id}`}>
              <FaEdit className="icon" size={20} />
            </Link>
          </p>
        </div>
      ) : (
        <p>Loading customer information...</p>
      )}

      {vehicleInfo && Object.keys(vehicleInfo).length > 0 ? (
        <div className="VehicleInfo">
          <h2 className="customer_name">
            {vehicleInfo.vehicle_make}
            <CancelPresentationIcon
              onClick={handleRedirectVehicle}
              className="icon"
            />
          </h2>
          <p>
            <span className="label  customer_label_info">Vehicle color:</span>{" "}
            <span className="value  customer_label_value">
              {vehicleInfo.vehicle_color}
            </span>
          </p>
          <p>
            <span className="label  customer_label_info">Vehicle tag:</span>{" "}
            <span className="value  customer_label_value">
              {vehicleInfo.vehicle_tag}
            </span>
          </p>
          <p>
            <span className="label  customer_label_info">Vehicle Year:</span>{" "}
            <span className="value  customer_label_value">
              {vehicleInfo.vehicle_year}
            </span>
          </p>
          <p>
            <span className="label  customer_label_info">Vehicle Mileage:</span>{" "}
            <span className="value  customer_label_value">
              {vehicleInfo.vehicle_mileage}
            </span>
          </p>
          <p>
            <span className="label  customer_label_info">Vehicle serial:</span>{" "}
            <span className="value  customer_label_value">
              {vehicleInfo.vehicle_serial}
            </span>
          </p>
          <p>
            <span className="label  customer_label_info">
              Edit Vehicle info:
            </span>{" "}
            <Link to={`/admin/edit-vehicle/${vehicleInfo.vehicle_id}`}>
              <FaEdit className="icon" size={20} />
            </Link>
          </p>
        </div>
      ) : (
        <p>Loading vehicle information...</p>
      )}

      <div className="service_list_container">
        <div className="services-list">
          <h2 className="customer_name v_font">Choose service</h2>

          {services?.length > 0 ? (
            services.map((service) => (
              <div key={service.service_id} className="service-item">
                <div className="service-d w-100">
                  <div>
                    <h3 className="service_font">{service?.service_name}</h3>
                    <p>{service?.service_description}</p>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.service_id)}
                      onChange={() =>
                        handleServiceSelection(service.service_id)
                      }
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )}
        </div>
      </div>

      <div className="additional-requests">
        {/* <h2>Additional requests</h2> */}
        <div className="contact-section pad_1" style={{ background: "#fff" }}>
          <div className="contact-title mb-1">
            <h2 style={{ fontSize: "32px" }}>Additional requests</h2>
          </div>
        </div>

        <div className="serviceRequest">
          <input
            className="w-100"
            type="text"
            style={{ paddingLeft: "15px" }}
            placeholder="Service Description"
            value={serviceDescription}
            onChange={handleAdditionalRequest}
          />
        </div>

        <div className="price">
          <input
            className="w-100"
            type="text"
            style={{ padding: "10px 15px" }}
            placeholder="Price"
            value={orderTotalPrice}
            onChange={handleOrderTotalPriceChange}
          />
        </div>

        <div>
          <div className="price">
            <input
              className="w-100"
              type="text"
              style={{ padding: "10px 15px" }}
              placeholder="Order Description"
              value={orderDescription}
              onChange={handleOrderDescriptionChange}
            />
          </div>
        </div>

        <div className="py-2 px-3">
          <label>
            <span className="v_font">Expected Completion Date:</span>
            <input
              type="datetime-local"
              value={estimatedCompletionDate}
              onChange={handleEstimatedCompletionDateChange}
            />
          </label>
        </div>

        <div className="submit mt-3 mb-5">
          <button className="submit-order" onClick={handleSubmit}>
            SUBMIT ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewOrder;
