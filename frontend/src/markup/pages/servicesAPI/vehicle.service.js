const api_url = import.meta.env.VITE_API_URL;

const AddVehicle = async (formData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response.json();
};

const updateVehicle = async (formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/admin/customer/${formData.customer_id}`,
    requestOptions,
  );
  return response.json();
};

const vehiclePerCustomer = async (customer_id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/vehicles/${customer_id}`,
    requestOptions,
  );
  return response.json();
};

const vehicleService = {
  AddVehicle,
  updateVehicle,
  vehiclePerCustomer,
};

export default vehicleService;
