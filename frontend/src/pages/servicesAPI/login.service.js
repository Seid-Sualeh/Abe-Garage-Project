import axios from "../../utils/axiosConfig";

const loginService = {
  login: async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axios.post("/logout");
      return response.data;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },

  validateToken: async (token) => {
    try {
      const response = await axios.get("/validate-token", {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error validating token:", error);
      throw error;
    }
  },
};

export default loginService;