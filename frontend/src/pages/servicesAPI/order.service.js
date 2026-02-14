import axios from "../../utils/axiosConfig";

const orderService = {
  getAllOrders: async (token) => {
    try {
      const response = await axios.get("/admin/orders", {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  getOrderById: async (orderId, token) => {
    try {
      const response = await axios.get(`/admin/order/${orderId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  createOrder: async (orderData, token) => {
    try {
      const response = await axios.post("/admin/order", orderData, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  updateOrder: async (orderId, orderData, token) => {
    try {
      const response = await axios.put(`/admin/order/${orderId}`, orderData, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  deleteOrder: async (orderId, token) => {
    try {
      const response = await axios.delete(`/admin/order/${orderId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },

  getOrderByPublicId: async (publicId) => {
    try {
      const response = await axios.get(`/order/status/${publicId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order by public ID:", error);
      throw error;
    }
  },
};

export default orderService;
