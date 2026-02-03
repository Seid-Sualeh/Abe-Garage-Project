const api_url = import.meta.env.VITE_API_URL;

const createCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/admin/add-customer`, requestOptions);
  return response;
};

const getAllCustomers = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/admin/customers`, requestOptions);
  return response;
};

const getCustomer = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/admin/customer/${id}`,
    requestOptions,
  );
  return response;
};

const updateCustomer = async (customerId, formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/admin/customer/edit/${customerId}`,
    requestOptions,
  );
  return response;
};

const deleteCustomer = async (customerId, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await fetch(
    `${api_url}/admin/customer/${customerId}`,
    requestOptions,
  );
  return response;
};

export default {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
