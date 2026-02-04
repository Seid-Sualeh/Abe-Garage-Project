import axios from "../../utils/axiosConfig";

const vehicleService = {
  getVehicleInfo: async (vehicleId, token) => {
    try {
      const response = await axios.get(`/api/vehicle/${vehicleId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      throw error;
    }
  },
  AddVehicle: async (formData, token) => {
    try {
      const response = await axios.post("/api/vehicle", formData, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding vehicle:", error);
      throw error;
    }
  },
};

export default vehicleService;
