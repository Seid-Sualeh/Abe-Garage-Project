const express = require("express");
const router = express.Router();
const serviceController = require("../controller/service.controller");

// POST request to add a service
router.post("/admin/add-service", serviceController.createService);
router.put("/api/service-update/:id", serviceController.updateService);
router.delete(
  "/api/deleteservice/:service_id",
  serviceController.deleteService,
);
// router.get('/api/service/:service_id', serviceController.getService);
router.get("/admin/services", serviceController.getAllServices);
router.get("/api/services/:id", serviceController.getSingleService);
// router.post("/api/add-service", serviceController.createService);

module.exports = router;
