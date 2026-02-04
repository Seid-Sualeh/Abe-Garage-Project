import React, { useState, useEffect } from "react";
import "./orderDetail.css";
import { useParams } from "react-router-dom";
import ordersService from "../../../../pages/servicesAPI/order.service";
import { useAuth } from "../../../../context/Auth";

const OrderDetail = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        console.error("Token is not available");
        return;
      }
      try {
        const fetchedOrder = await ordersService.getOrderDetailById(token, id);
        setOrderData(fetchedOrder);
        setOrder(fetchedOrder[0]);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [token, id]);

  // console.log(order);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await ordersService.getOrderAllDetail(id);
        setOrderDetails(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const formatMileage = (mileage) => {
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  // Determine overall progress status
  const overallStatus = orderData.every((order) => order.order_status === 1)
    ? "Completed"
    : orderData.some((order) => order.order_status === 0)
      ? "In Progress"
      : "Received";

  return (
    <div className="order-detail-container">
      <div className="order-detail-card">
        <div
          className={`status-box-inline highlight overall-status-${overallStatus
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <h6 className="overallstatus">{overallStatus}</h6>
        </div>
        <div className="sec-title style-two order_customer_name red-bottom-border">
          <h2>
            {order.customer_first_name} {order.customer_last_name}
          </h2>
          <div className="text">
            This page provides the current status of the order. It will be
            updated regularly to reflect the progress of the work. Once the
            order is completed, the status will turn green, indicating that the
            car is ready for the next step in processing.
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 service-block-one">
            <div className="inner-boxx hvr-float-shadow">
              <h5>CUSTOMER</h5>
              <h2>
                {order.customer_first_name} {order.customer_last_name}
              </h2>
              <div>Email: {order.customer_email}</div>
              <div>Phone Number: {order.customer_phone_number}</div>
              <div>
                Active Customer:{" "}
                {orderDetails?.customerActiveStatus ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="col-lg-6 service-block-one">
            <div className="inner-boxx hvr-float-shadow">
              <h5>CAR IN SERVICE</h5>
              <h2>
                {order.vehicle_model} <span>({order.vehicle_color})</span>
              </h2>
              <div>Vehicle tag: {order.vehicle_tag}</div>
              <div>Vehicle year: {order.vehicle_year}</div>
              <div>Vehicle mileage: {formatMileage(order.vehicle_mileage)}</div>
            </div>
          </div>
        </div>

        <div className="order_details">
          <h5>{order.vehicle_model}</h5>
          <h2>Requested Service</h2>
          {orderData?.map((order, index) => (
            <div key={index} className="order_detail_items">
              <div className="requested_service">
                <h2>{order.service_name}</h2>
                <p>{order.service_description}</p>
                <div
                  className={`status-box ${
                    order.order_status === 0
                      ? "status-in-progress"
                      : order.order_status === 1
                        ? "status-completed"
                        : "status-received"
                  }`}
                >
                  <h6>
                    {order.order_status === 0
                      ? "In Progress"
                      : order.order_status === 1
                        ? "Completed"
                        : "Received"}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
