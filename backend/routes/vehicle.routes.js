const express = require("express");
const vehicleController = require("../controller/vehicle.controller");
const router = express.Router();

// import the authMiddleware
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

router.get("/api/vehicle/:id", [verifyToken], vehicleController.singleVehicle);
router.post("/api/vehicle", [verifyToken], vehicleController.addVehicle);
router.put("/api/vehicle", [verifyToken], vehicleController.updateVehicle);
router.get(
  "/api/vehicles/:customer_id",
  [verifyToken],
  vehicleController.vehiclePerCustomer,
);
router.get(
  "/api/customer-vehicle/search/:customer_id",
  [verifyToken],
  vehicleController.searchVehicle,
);

router.delete(
  "/api/deleteVehicle/:vehicle_id",
  [verifyToken, isAdmin],
  vehicleController.deleteVehicle,
);

router.get(
  "/api/vehicle_order/:vehicle_id",
  [verifyToken],
  vehicleController.hasServiceOrder,
);

module.exports = router;
