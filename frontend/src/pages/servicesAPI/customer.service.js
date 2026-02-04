import axios from "../../utils/axiosConfig";

const customerService = {
  singleCustomer: async (customerId, token) => {
    try {
      const response = await axios.get(`/admin/customer/${customerId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  },
};

export default customerService;
