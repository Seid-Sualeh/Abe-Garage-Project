import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import loginService from "../../../pages/servicesAPI/login.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");

  // Errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // Email is required
    if (!employee_email) {
      setEmailError("Please enter your address first");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    // If the form is valid, create the form data object
    const formData = {
      employee_email,
      employee_password,
    };

    // Pass the form data to the service
    const login = loginService.loginEmployee(formData);
    login
      .then((response) => {
        if (response.status === "success") {
          toast.success("Login successful!");
          if (response.data.employee_token) {
            localStorage.setItem("employee", JSON.stringify(response.data));
          }
          setTimeout(() => {
            window.location.replace("/");
          }, 1500);
        } else {
          toast.error(
            response.message || "Login failed. Please check your credentials.",
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error has occurred. Please try again later.");
      });
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div style={{ marginLeft: "100px", marginTop: "50px" }}>
        <div className="auto-container">
          <h2 style={{ fontWeight: "bold" }}>Login to your account</h2>
        </div>
        <div className="form-column col-lg-7">
          <div className="inner-column">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="row clearfix">
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      name="email"
                      value={employee_email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    {emailError && (
                      <div className="validation-error" role="alert">
                        {emailError}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      name="Password"
                      value={employee_password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    {passwordError && (
                      <div className="validation-error" role="alert">
                        {passwordError}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      id="form_botcheck"
                      name="form_botcheck"
                      className="form-control"
                      type="hidden"
                      value=""
                    />
                    <button
                      className="theme-btn btn-style-one"
                      type="submit"
                      data-loading-text="Please wait..."
                    >
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
