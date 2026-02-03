const { response } = require("express");
const connection = require("../config/db.config");

async function singleVehicle(ID) {
  try {
    const singleVehicleQuery = `SELECT customer_identifier.*, customer_info.*,customer_vehicle_info.* FROM customer_identifier INNER JOIN customer_info 
                                     ON customer_identifier.customer_id = customer_info.customer_id
                                     INNER JOIN  customer_vehicle_info 
                                     ON customer_identifier.customer_id = customer_vehicle_info.customer_id
                                     WHERE customer_vehicle_info.vehicle_id = ?`;

    console.log(ID);
    const result = await connection.query(singleVehicleQuery, [ID]);
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error getting Vehicle:", error);
    throw new Error("Could not get vehicle. Please try again later.");
  }
}

async function addVehicle(vehicleData) {
  const {
    customer_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = vehicleData;

  let response = {};

  if (
    !customer_id ||
    !vehicle_year ||
    !vehicle_make ||
    !vehicle_model ||
    !vehicle_type ||
    !vehicle_mileage ||
    !vehicle_tag ||
    !vehicle_serial ||
    !vehicle_color
  ) {
    return response;
  }

  try {
    const vehicleAddQuery = `INSERT INTO customer_vehicle_info(customer_id,vehicle_year,vehicle_make,vehicle_model,vehicle_type ,vehicle_mileage,vehicle_tag, vehicle_serial ,vehicle_color) VALUES(?,?,?,?,?,?,?,?,?)`;

    const result = await connection.query(vehicleAddQuery, [
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    ]);

    // console.log(result.rows.affectedRows, result.rows.insertId)
    console.log(result);
    if (result.affectedRows !== 0) {
      response = {
        status: result.affectedRows,
      };
    } else {
      response = {};
    }
  } catch (error) {
    console.log(error);
    return "Internal Server Error " + error;
  }
  console.log(response);
  return response;
}

async function updateVehicleInfo(updateVehicleData) {
  const {
    vehicle_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = updateVehicleData;

  let response = {};

  if (
    !vehicle_id ||
    !vehicle_year ||
    !vehicle_make ||
    !vehicle_model ||
    !vehicle_type ||
    !vehicle_mileage ||
    !vehicle_tag ||
    !vehicle_serial ||
    !vehicle_color
  ) {
    return response;
  }

  try {
    const updateVehicleQuery = `UPDATE customer_vehicle_info   SET  vehicle_year = ?,vehicle_make = ? ,vehicle_model = ?,vehicle_type = ?  ,vehicle_mileage = ? ,vehicle_tag = ? , vehicle_serial = ?  ,vehicle_color = ?  WHERE vehicle_id = ? `;

    const result = await connection.query(updateVehicleQuery, [
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      vehicle_id,
    ]);
    console.log("here w g");

    if (result.affectedRows !== 0) {
      response = {
        status: result.affectedRows,
      };
    } else {
      response = {};
    }
  } catch (error) {
    console.log(error);
    return "Internal Server Error " + error;
  }

  return response;
}

async function vehiclePerCustomer(ID) {
  try {
    console.log("customer_id", ID);
    let response = {};
    const query = `SELECT * FROM customer_vehicle_info WHERE customer_id = ?`;
    const result = await connection.query(query, [ID]);
    // console.log(result,result.length)

    if (result.length == 0) {
      return response;
    }

    // const [ans] =  result.rows;
    // console.log(ans)

    response = {
      result,
    };
    // console.log(response)

    return response;
  } catch (error) {
    console.error("Error getting Vehicle:", error);
    throw new Error("Could not get vehicle. Please try again later.");
  }
}

async function hasServiceOrder(ID) {
  try {
    console.log("vehicle_id", ID);
    let response = {};
    const query = `SELECT * FROM orders WHERE vehicle_id = ?`;
    const result = await connection.query(query, [ID]);
    // console.log(result,result.length)

    if (result.length == 0) {
      return response;
    }

    response = {
      result,
    };
    // console.log(response)

    return response;
  } catch (error) {
    console.error("Error getting Vehicle:", error);
    throw new Error("Could not get vehicle. Please try again later.");
  }
}

async function deleteVehicle(vehicle_id) {
  try {
    const result = await connection.query(
      "DELETE FROM customer_vehicle_info WHERE vehicle_id = ?",
      [vehicle_id],
    );

    return result;
  } catch (error) {
    throw new Error("Error Deleting service: " + error.message);
  }
}
async function searchVehicle(customer_id, query) {
  try {
    // Clean the input to remove any newline characters
    const cleanQuery = query.replace(/\n/g, "").trim();

    const sql = `
      SELECT * FROM customer_vehicle_info 
      WHERE customer_id = ? AND (
        vehicle_make LIKE ? OR 
        vehicle_model LIKE ? OR 
        vehicle_serial LIKE ?
      )
    `;
    const values = [
      customer_id,
      `%${cleanQuery}%`,
      `%${cleanQuery}%`,
      `%${cleanQuery}%`,
    ];

    console.log("SQL Query:", sql); // Log the SQL query
    console.log("Values:", values);
    const result = await connection.query(sql, values);
    console.log();
    return result;
  } catch (error) {
    console.error("Error searching vehicles:", error.message);
    throw new Error("Database Error");
  }
}

module.exports = {
  singleVehicle,
  addVehicle,
  updateVehicleInfo,
  vehiclePerCustomer,
  deleteVehicle,
  hasServiceOrder,
  searchVehicle,
};
