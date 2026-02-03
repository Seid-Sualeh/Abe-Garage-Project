const serviceService = require("../services/service.service");

// create service

async function createService(req, res, next) {
  try {
    const serviceData = req.body; // Extract service data from request body
    console.log("Received service data:", serviceData); // Log the received data
    const service = await serviceService.createService(serviceData); // Call service layer function
    if (!service) {
      return res.status(400).json({
        error: "Failed to add the service!",
      });
    }
    res.status(200).json({
      status: "Service added successfully",
      // service: service, // Include the created service data
      // serviceData: serviceData
    });
  } catch (error) {
    console.error(error); // Log the actual error object for debugging
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

// update service

async function updateService(req, res) {
  const { service_name, service_description } = req.body;
  const { id } = req.params;
  const service_id = id;

  // console.log("service_id ===>", service_id);
  console.log("service_name ===>", service_name);
  console.log("service_description ===>", service_description);

  if (!service_name || !service_description) {
    return res.status(400).json({ msg: "Invalid input" });
  }

  try {
    const result = await serviceService.updateService(
      service_id,
      service_name,
      service_description,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Service not found" });
    }

    return res.status(200).json({ msg: "The service has been updated" });
  } catch (error) {
    console.error("Error updating service:", error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

// delete service

async function deleteService(req, res) {
  const { service_name, service_description } = req.body;
  const { service_id } = req.params;

  console.log("service_id ===>", service_id);
  console.log("service_name ===>", service_name);
  console.log("service_description ===>", service_description);

  // if (!service_name || !service_description) {
  //     return res.status(400).json({ msg: "Invalid input" });
  // }

  try {
    const result = await serviceService.deleteService(service_id);
    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Service not found" });
    }

    return res.status(200).json({ msg: "The service has been deleted" });
  } catch (error) {
    console.error("Error deleting service:", error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

// Create the getAllServices controller

async function getAllServices(req, res, next) {
  // Call the getAllServices method from the service service
  const services = await serviceService.getAllServices();
  if (!services) {
    res.status(400).json({
      error: "Failed to get all services!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: services,
    });
  }
}

// get single service

async function getSingleService(req, res, next) {
  try {
    const serviceId = req.params.id;
    const service = await serviceService.getSingleService(serviceId);
    res.status(200).json({
      status: "success",
      data: service,
    });
  } catch (error) {
    console.error("Error getting single service:", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  createService,
  updateService,
  deleteService,
  getAllServices,
  getSingleService,
};
