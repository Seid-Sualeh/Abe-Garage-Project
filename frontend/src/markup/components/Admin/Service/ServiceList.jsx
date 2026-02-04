// =======================================================================

import React, { useState, useEffect } from "react";
const api_url = import.meta.env.VITE_API_URL;
import "./ServiceList.css";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const ServiceList = () => {
  const [newService, setNewService] = useState({
    service_name: "",
    service_description: "",
  });
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    fetch(`${api_url}/admin/services`)
      .then((res) => res.json())
      .then((data) => setServices(data.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleDelete = () => {
    fetch(`${api_url}/api/deleteservice/${serviceToDelete.service_id}`, {
      method: "DELETE",
    })
      .then(() =>
        setServices(
          services.filter(
            (service) => service.service_id !== serviceToDelete.service_id,
          ),
        ),
      )
      .catch((error) => console.error("Error deleting service:", error));
    window.location.reload();
  };

  const handleEdit = (id) => {
    const serviceToEdit = services.find((service) => service.service_id === id);
    setNewService({
      service_name: serviceToEdit.service_name,
      service_description: serviceToEdit.service_description,
    });
    setCurrentServiceId(id);
    setIsEditing(true);
    navigate("/admin/services#update");
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${api_url}/api/service-update/${currentServiceId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newService),
        },
      );

      console.log("one");

      if (!response.ok) throw new Error("Network response was not ok");
      console.log("two");

      const updatedService = await response.json();
      console.log("three");

      setServices(
        services.map((service) =>
          service.service_id === currentServiceId ? updatedService : service,
        ),
      );
      console.log("four");

      setNewService({ service_name: "", service_description: "" });
      setIsEditing(false);
      setCurrentServiceId(null);
      setShowSuccessModal(true);
      setSuccessMessage("Service updated successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2 seconds delay
    } catch (error) {
      // alert("Something went wrong");
      setShowErrorModal(true);
      setErrorMessage("Error updating service");
      console.error("Error updating service:", error);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/admin/add-service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const service = await response.json();
      setServices([...services, service]);
      setNewService({ service_name: "", service_description: "" });
      setShowSuccessModal(true);
      setSuccessMessage("Service added successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2 seconds delay
    } catch (error) {
      setShowErrorModal(true);
      setErrorMessage("Error adding service");
      console.error("Error adding service:", error);
    }
  };

  const handleShowDeleteModal = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setServiceToDelete(null);
    setShowDeleteModal(false);
  };
  // console.log(serviceToDelete)
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <div className="service-management">
        <div className="contact-section pad_1">
          <div className="contact-title mb-1">
            <h2 style={{ color: "#08194A" }}>Services we provide</h2>
          </div>
        </div>

        <p className="description">
          At Abe Garage, we are committed to delivering top-notch automotive
          care that keeps your vehicle performing at its best. Our comprehensive
          range of services is designed to address every aspect of your car’s
          maintenance and repair needs. Explore our services below to see how we
          can help you keep your car in peak condition.
        </p>
        <div className="services-list">
          {services?.map((service) => (
            <div key={service.service_id} className="service-item py-4">
              <div className="service-details">
                <h3 className="v_font" style={{ color: "#08194A" }}>
                  {service.service_name}
                </h3>
                <p>{service.service_description}</p>
              </div>
              <div className="service-actions">
                <button onClick={() => handleEdit(service.service_id)}>
                  <a href="#update" style={{ color: "#ff6666" }}>
                    <FaEdit size={20} />
                  </a>
                </button>
                <button onClick={() => handleShowDeleteModal(service)}>
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div
          className="additional-requests"
          style={{ paddingBottom: "40px", marginTop: "20px" }}
          id="update"
        >
          <div className="contact-section pad_1" style={{ background: "#fff" }}>
            <div className="contact-title mb-1">
              <h2 style={{ fontSize: "32px" }}>
                {!isEditing ? "Add a new Service" : "Update a Service"}
              </h2>
            </div>
          </div>

          <form onSubmit={!isEditing ? handleAddService : handleSaveEdit}>
            <div className="price">
              <input
                type="text"
                style={{ padding: "10px 15px" }}
                placeholder="Service name"
                className="w-100"
                name="service_name"
                value={newService.service_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="serviceRequest">
              <input
                type="text"
                style={{ paddingLeft: "15px" }}
                className="w-100"
                name="service_description"
                value={newService.service_description}
                onChange={handleInputChange}
                placeholder="Service Description"
                required
              />
            </div>

            {isEditing ? (
              <div className=" form-group col-md-12 d-flex gap-5 mt-3">
                <button type="submit" className="theme-btn btn-style-one">
                  Updated Service
                </button>
                <button
                  style={{ background: "#08194A" }}
                  className="theme-btn btn-style-one"
                  onClick={() => {
                    setIsEditing(false);
                    setNewService({
                      service_name: "",
                      service_description: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="form-group col-md-12">
                <button className="theme-btn btn-style-one" type="submit">
                  ADD SERVICE
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>
            {serviceToDelete ? `${serviceToDelete.service_name} ` : ""}
          </strong>
          ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseErrorModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceList;
