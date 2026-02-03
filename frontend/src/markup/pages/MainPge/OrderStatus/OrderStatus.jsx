import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderStatus.css";
import orderService from "../../../../pages/servicesAPI/order.service";
import Loading from "../../../../assets/Loading/Loading";
import img from "../../../../assets/images/side.jpg";

const OrderStatus = () => {
  const { order_hash } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await orderService.getOrderAllDetail(token, order_hash);
        setOrderDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order_hash]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching order details: {error.message}</div>;
  }

  // Determine progress percentage from orderStatus
  const progress = orderDetails
    ? orderDetails.orderStatus === 3
      ? 33
      : orderDetails.orderStatus === 0
        ? 66
        : 100
    : 0;

  return (
    <div className="order-status-page">
      <div className="progress-overlay">
        <div className="progress-card">
          <h1>Order Progress</h1>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        </div>
      </div>

      <div className="order-details-card">
        <div className="order-content">
          <div className="details-info">
            <h3>Services</h3>
            {orderDetails && orderDetails.orderDescription && (
              <p>{orderDetails.orderDescription}</p>
            )}
          </div>
        </div>
        <div className="details-list">
          <h3>Order Details</h3>
          {orderDetails && (
            <div>
              <p>
                <strong>Order ID:</strong> {orderDetails.orderId}
              </p>
              <p>
                <strong>Customer:</strong> {orderDetails.customerId}
              </p>
              <p>
                <strong>Employee:</strong> {orderDetails.employeeFirstName}{" "}
                {orderDetails.employeeLastName}
              </p>
              <p>
                <strong>Vehicle:</strong> {orderDetails.vehicleMake} (Serial:{" "}
                {orderDetails.vehicleSerial})
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(orderDetails.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Estimated Completion Date:</strong>{" "}
                {orderDetails.estimatedCompletionDate
                  ? new Date(
                      orderDetails.estimatedCompletionDate,
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Completion Date:</strong>{" "}
                {orderDetails.completionDate
                  ? new Date(orderDetails.completionDate).toLocaleDateString()
                  : "In Progress"}
              </p>
              <p>
                <strong>Additional Requests:</strong>{" "}
                {orderDetails.additionalRequest}
              </p>
              {/* for order detail page */}
              {/* <p>
                <strong>Notes for Internal Use:</strong>{" "}
                {orderDetails.notesForInternalUse || "N/A"}
              </p> */}
              {/* <p>
                <strong>Order Hash:</strong> {order_hash}
              </p> */}
              <p>
                <strong>Notes for Customer:</strong>{" "}
                {orderDetails.notesForCustomer || "N/A"}
              </p>
              <p>
                <strong>Order Total Price:</strong> $
                {orderDetails.orderTotalPrice}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
