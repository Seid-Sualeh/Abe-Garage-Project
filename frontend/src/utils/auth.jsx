//functions to get auth info from local storage and decode token payload
//the purpose of this code is to take a JWT token extract its payload decode it from base64 encoding and then convert decoded payload into javascript object for further use and manipulation
const getAuth = async () => {
  const employee = await JSON.parse(localStorage.getItem("employee"));
  if (employee && employee.employee_token) {
    const decodedToken = decodeTokenPayload(employee.employee_token);
    employee.employee_role = decodedToken.employee_role;
    employee.employee_first_name = decodedToken.employee_first_name;
    employee.employee_id = decodedToken.employee_id;
    return employee;
  } else {
    return {};
  }
};

// Function to decode JWT token payload

function decodeTokenPayload(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  return JSON.parse(jsonPayload);
}
// Export the functions for use in other parts of the application
export { getAuth, decodeTokenPayload };
