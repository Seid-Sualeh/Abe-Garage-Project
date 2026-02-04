import axios from "../../utils/axiosConfig";

const serviceService = {
  getServiceList: async () => {
    try {
      const response = await axios.get("/admin/services");
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  },
  getAllServices: async () => {
    try {
      const response = await axios.get("/admin/services");
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  },
};

export default serviceService;
