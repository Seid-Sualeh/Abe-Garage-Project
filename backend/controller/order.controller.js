const orderService = require("../services/order.service");
const conn = require("../config/db.config");

async function createOrder(req, res) {
  try {
    const orderData = req.body;

    // Validate the presence of required fields in the request body
    const requiredFields = [
      "customer_id",
      "employee_id",
      "vehicle_id",
      "order_status",
      "order_total_price",
      "order_description",
      "estimated_completion_date",
      "order_services",
    ];

    for (const field of requiredFields) {
      if (orderData[field] === undefined) {
        return res.status(400).json({ error: `Field ${field} is required` });
      }
    }

    if (
      !Array.isArray(orderData.order_services) ||
      orderData.order_services.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Field 'order_services' must be a non-empty array" });
    }

    const result = await orderService.createOrders(orderData);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
}
// Get all orders
async function getAllOrders(req, res) {
  try {
    const { limit, sortby, completed } = req.query;
    const orders = await orderService.getAllOrders({
      limit,
      sortby,
      completed,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get single order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
}

async function getOrderDetailById(req, res) {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderDetailById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
}

// Get single order by CUSTOMER_ID
async function getOrderByCustomerId(req, res) {
  try {
    const { customerid } = req.params;
    const order = await orderService.getOrderByCustomerId(customerid);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
}

// Update an order
async function updateOrder(req, res) {
  try {
    const { order_id } = req.params; // Ensure order_id is obtained from params
    const orderData = req.body;

    const requiredFields = [
      "order_description",
      "estimated_completion_date",
      "completion_date",
      "order_services",
    ];

    for (const field of requiredFields) {
      if (orderData[field] === undefined) {
        return res.status(400).json({ error: `Field ${field} is required` });
      }
    }

    if (
      !Array.isArray(orderData.order_services) ||
      orderData.order_services.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Field 'order_services' must be a non-empty array" });
    }
    console.log("orderData:", orderData);
    console.log("order_id:", order_id);

    const result = await orderService.updateOrder(orderData, order_id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
}

async function searchOrder(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const searchQuery = `
  SELECT ci.*, cinfo.customer_first_name, cinfo.customer_last_name
  FROM customer_identifier ci
  JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
  WHERE 
    cinfo.customer_first_name LIKE ? OR 
    cinfo.customer_last_name LIKE ? OR 
    ci.customer_email LIKE ? OR 
    ci.customer_phone_number LIKE ?
`;
    const values = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];
    const results = await conn.query(searchQuery, values);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

//get all order detail info for status page
const getOrderAllDetail = async (req, res) => {
  const { order_hash } = req.params;

  console.log("Received request with order_hash:", order_hash); // Log the received hash

  if (!order_hash) {
    console.log("No order_hash provided in the request");
    return res.status(400).json({ message: "Order hash is required" });
  }

  try {
    const orderDetails = await orderService.getOrderAllDetail(order_hash);

    if (!orderDetails) {
      console.log("No order details found for the provided hash");
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(orderDetails);
  } catch (error) {
    console.error(
      `Error fetching order details with hash ${order_hash}:`,
      error,
    );
    res.status(500).json({
      message: "An error occurred while retrieving the order details",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  searchOrder,
  getOrderByCustomerId,
  getOrderAllDetail,
  getOrderDetailById,
};
