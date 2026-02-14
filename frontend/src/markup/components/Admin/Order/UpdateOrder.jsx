import React, { useRef, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ordersService from "../../../pages/servicesAPI/order.service";
import serviceService from "../../../pages/servicesAPI/service.service";
import "./CreateNewOrder.css";
import { useAuth } from "../../../../context/Auth";

const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function UpdateOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams();
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const [orderData, setOrderData] = useState({
    order_id: orderId,
    order_description: "",
    estimated_completion_date: "",
    completion_date: "",
    order_status: "",
    order_services: [],
  });
  const [availableServices, setAvailableServices] = useState([]);
  const [serverMsg, setServerMsg] = useState("");
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [spin, setSpinner] = useState(false);

  const descriptionDom = useRef();
  const estimatedDateDom = useRef();
  const completionDateDom = useRef();
  const statusDom = useRef();

  const descriptionTracker = () =>
    setOrderData((prev) => ({
      ...prev,
      order_description: descriptionDom.current.value,
    }));
  const estimatedDateTracker = () =>
    setOrderData((prev) => ({
      ...prev,
      estimated_completion_date: estimatedDateDom.current.value,
    }));
  const completionDateTracker = () =>
    setOrderData((prev) => ({
      ...prev,
      completion_date: completionDateDom.current.value,
    }));
  const statusTracker = () =>
    setOrderData((prev) => ({
      ...prev,
      order_status: statusDom.current.value,
    }));

  useEffect(() => {
    console.log(location.state);
    if (!location.state?.order) {
      const formattedOrder = {
        ...location.state.order,
        estimated_completion_date: formatDateForInput(
          location.state.order.estimated_completion_date,
        ),
        completion_date: formatDateForInput(
          location.state.order.completion_date,
        ),
        order_services:
          [
            {
              service_id: location.state.order.service_id,
              service_completed: location.state.order.service_completed,
            },
          ] || [],
      };
      setOrderData(formattedOrder);
    } else {
      const fetchData = async () => {
        try {
          const [fetchedOrder] = await ordersService.getOrderById(
            token,
            orderId,
          );
          console.log("Fetched Order:", fetchedOrder);
          const formattedOrder = {
            ...fetchedOrder,
            estimated_completion_date: formatDateForInput(
              fetchedOrder.estimated_completion_date,
            ),
            completion_date: formatDateForInput(fetchedOrder.completion_date),
          };
          setOrderData(formattedOrder);
        } catch (error) {
          setApiError(true);
          setApiErrorMessage("An error occurred while fetching order data.");
        }
      };
      fetchData();
    }

    const fetchServices = async () => {
      try {
        const fetchedServices = await serviceService.getServiceList(token);
        setAvailableServices(fetchedServices.data);
      } catch (error) {
        setApiError(true);
        setApiErrorMessage("An error occurred while fetching services.");
      }
    };

    fetchServices();
  }, [orderId, location.state, token]);

  const handleServiceChange = (serviceId, checked) => {
    setOrderData((prevState) => {
      const existingService = prevState.order_services.find(
        (service) => service.service_id === serviceId,
      );
      const updatedServices = checked
        ? existingService
          ? prevState.order_services
          : [
              ...prevState.order_services,
              { service_id: serviceId, service_completed: false },
            ]
        : prevState.order_services.filter(
            (service) => service.service_id !== serviceId,
          );
      return {
        ...prevState,
        order_services: updatedServices,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const updatedOrderData = { ...orderData };
      if (updatedOrderData.order_status !== "1") {
        updatedOrderData.completion_date = "";
      }
      await ordersService.updateOrder(updatedOrderData, token);
      setServerMsg("Order updated successfully. Redirecting...");
      setTimeout(() => {
        setSpinner(false);
        setServerMsg("");
        navigate("/admin/orders", { state: { updated: true } });
      }, 2000);
    } catch (error) {
      setSpinner(false);
      setApiError(true);
      setApiErrorMessage("An error occurred while updating the order.");
    }
  };

  return (
    <section className="update-order-section">
      <div className="mx-4">
        <div className="contact-title mb-1 sec-title style-two">
          <h2>Update Orders</h2>
        </div>
        {spin && <BeatLoader color="#36d7b7" />}
        {!spin && (
          <form onSubmit={handleSubmit}>
            {apiError && <p className="error-message">{apiErrorMessage}</p>}
            <div className="form-group">
              <label htmlFor="order_description">Order Description:</label>
              <br />
              <input
                className="form-control"
                type="text"
                id="order_description"
                ref={descriptionDom}
                value={orderData.order_description}
                onChange={descriptionTracker}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="estimated_completion_date">
                Estimated Completion Date:
              </label>
              <input
                className="form-control"
                type="date"
                id="estimated_completion_date"
                ref={estimatedDateDom}
                value={orderData.estimated_completion_date}
                onChange={estimatedDateTracker}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="completion_date">Completion Date:</label>
              <input
                className="form-control"
                type="date"
                id="completion_date"
                ref={completionDateDom}
                value={orderData.completion_date}
                onChange={completionDateTracker}
              />
            </div>
            <div className="form-group">
              <label htmlFor="order_status">Status:</label>
              <select
                className="form-control"
                id="order_status"
                ref={statusDom}
                value={orderData.order_status}
                onChange={statusTracker}
                required
              >
                <option value="">Select status</option>
                <option value="0">In Progress</option>
                <option value="1">Completed</option>
                <option value="3">Received</option>
              </select>
            </div>
            <div className="service_list_container">
              <div className="services-list">
                <label className="customer_name v_font">Order Services:</label>
                {availableServices &&
                  availableServices.length > 0 &&
                  availableServices.map((service) => (
                    <div className="service-item" key={service.service_id}>
                      <div className="service-d w-100">
                        <div>
                          <h3 className="service_font">
                            {service.service_name}
                          </h3>
                          <p>{service.service_description}</p>
                        </div>
                        <input
                          type="checkbox"
                          id={`service_${service.service_id}`}
                          checked={orderData.order_services.some(
                            (os) => os.service_id === service.service_id,
                          )}
                          onChange={(e) =>
                            handleServiceChange(
                              service.service_id,
                              e.target.checked,
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <button type="submit" className="submit-order">
              Update Order
            </button>
            {serverMsg && <p>{serverMsg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}

export default UpdateOrder;
