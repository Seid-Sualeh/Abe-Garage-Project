const api_url = import.meta.env.VITE_API_URL;

const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/admin/add-employee`, requestOptions);
  return response;
};

const getAllEmployees = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/admin/employees`, requestOptions);
  return response;
};

const getEmployee = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/admin/employee/${id}`,
    requestOptions,
  );
  return response;
};

const updateEmployee = async (employeeId, formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/admin/employee/edit/${employeeId}`,
    requestOptions,
  );
  return response;
};

const deleteEmployee = async (employeeId, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await fetch(
    `${api_url}/admin/employee/${employeeId}`,
    requestOptions,
  );
  return response;
};

const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
