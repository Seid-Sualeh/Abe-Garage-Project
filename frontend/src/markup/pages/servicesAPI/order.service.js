const api_url = import.meta.env.VITE_API_URL;

const createOrder = async (formData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/admin/order`, requestOptions);
  return response.json();
};

const getAllOrders = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/admin/orders`, requestOptions);
  return response.json();
};

const getOrderById = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/admin/order/${id}`, requestOptions);
  return response.json();
};

const getOrderDetailById = async (token, id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/admin/order_detail/${id}`,
    requestOptions,
  );
  return response.json();
};

const getOrderAllDetail = async (order_hash) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/order/details/${order_hash}`,
    requestOptions,
  );
  return response.json();
};

const updateOrder = async (order_id, formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/admin/order/${order_id}/edit`,
    requestOptions,
  );
  return response.json();
};

const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderDetailById,
  getOrderAllDetail,
  updateOrder,
};

export default orderService;
