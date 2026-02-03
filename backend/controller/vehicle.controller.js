const vehicleService = require("../services/vehicle.service");

async function singleVehicle(req, res) {
  try {
    const { id } = req.params;
    const result = await vehicleService.singleVehicle(id);
    let response = {};

    if (result.length == 0) {
      response = {
        status: "fail",
        message: "vehicle does not exist",
        data: [],
      };

      return res.status(400).json(response);
    }

    response = {
      status: "success",
      data: result[0][0],
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function addVehicle(req, res) {
  try {
    const vehicleData = req.body;

    const result = await vehicleService.addVehicle(vehicleData);
    let response = {};

    if (!result.status) {
      response = {
        status: "fail",
        success: false,
        message: "failed to add vehicle",
      };

      return res.status(400).json(response);
    }

    response = {
      status: "success",
      success: true,
      data: result,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function updateVehicle(req, res) {
  try {
    const updateVehicleData = req.body;
    console.log(updateVehicleData);

    const result = await vehicleService.updateVehicleInfo(updateVehicleData);

    if (!result.status) {
      response = {
        status: "fail",
        success: false,
        message: "failed to update vehicle info",
      };

      return res.status(400).json(response);
    }

    response = {
      status: "success",
      success: true,
      data: result,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function vehiclePerCustomer(req, res) {
  try {
    const { customer_id } = req.params;
    const ID = customer_id;

    const result = await vehicleService.vehiclePerCustomer(ID);
    // console.log(result)

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "not found " });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function hasServiceOrder(req, res) {
  try {
    const { vehicle_id } = req.params;
    const ID = vehicle_id;

    const result = await vehicleService.hasServiceOrder(ID);
    // console.log(result)

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "not found " });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function deleteVehicle(req, res) {
  const {
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = req.body;
  const { vehicle_id } = req.params;

  try {
    const result = await vehicleService.deleteVehicle(vehicle_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: " not found" });
    }

    return res.status(200).json({ msg: "The vehicle has been deleted" });
  } catch (error) {
    console.error("Error deleting service:", error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

async function searchVehicle(req, res) {
  try {
    const { customer_id } = req.params;
    const { query } = req.query; // Get the search query from request query parameters

    // Perform the search in the vehicleService
    const result = await vehicleService.searchVehicle(customer_id, query);

    if (result?.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No vehicles found",
        data: [],
      });
    }
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

module.exports = {
  singleVehicle,
  addVehicle,
  updateVehicle,
  vehiclePerCustomer,
  hasServiceOrder,
  deleteVehicle,
  searchVehicle,
};
