const api_url = import.meta.env.VITE_API_URL;

const loginEmployee = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
  return response.json();
};

const logOut = () => {
  localStorage.removeItem("employee");
};

// Export the login service
const loginService = {
  loginEmployee, logOut
};
export default loginService;
