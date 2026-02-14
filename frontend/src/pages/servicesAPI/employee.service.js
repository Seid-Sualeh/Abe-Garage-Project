import axios from "../../utils/axiosConfig";

const employeeService = {
  getAllEmployees: async (token) => {
    try {
      const response = await axios.get("/admin/employees", {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getEmployeeById: async (employeeId, token) => {
    try {
      const response = await axios.get(`/admin/employee/${employeeId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
  },

  createEmployee: async (employeeData, token) => {
    try {
      const response = await axios.post("/admin/employee", employeeData, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },

  updateEmployee: async (employeeId, employeeData, token) => {
    try {
      const response = await axios.put(
        `/admin/employee/${employeeId}`,
        employeeData,
        {
          headers: {
            "x-access-token": token,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },

  deleteEmployee: async (employeeId, token) => {
    try {
      const response = await axios.delete(`/admin/employee/${employeeId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },
};

export default employeeService;
