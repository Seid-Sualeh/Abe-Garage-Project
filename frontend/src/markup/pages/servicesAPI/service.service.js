const api_url = import.meta.env.VITE_API_URL;

const getAllServices = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response.json();
};

const serviceService = {
  getAllServices,
};

export default serviceService;