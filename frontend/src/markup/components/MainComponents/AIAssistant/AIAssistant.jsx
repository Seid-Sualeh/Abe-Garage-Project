import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../../pages/servicesAPI/login.service";
import { ToastContainer, toast } from "react-toastify";

export default function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const demoAccounts = [
    {
      role: "Admin",
      roleId: 3,
      email: "admin@admin.com",
      password: "12345678",
      description: "Full access to all features including employee management",
      icon: "👑",
      color: "#dc3545",
      bgColor: "#fff5f5",
      permissions: [
        "Manage Employees",
        "Manage Services",
        "Manage Customers",
        "Manage Orders",
        "View Dashboard",
      ],
    },
    {
      role: "Manager",
      roleId: 2,
      email: "manager@manager.com",
      password: "12345678",
      description: "Can manage customers, orders, and view employees",
      icon: "💼",
      color: "#ffc107",
      bgColor: "#fff9e6",
      permissions: [
        "Add Customers",
        "Manage Orders",
        "Create Orders",
        "View Employees",
        "View Services",
      ],
    },
    {
      role: "Employee",
      roleId: 1,
      email: "employee@employee.com",
      password: "12345678",
      description: "Can view orders and manage customer services",
      icon: "👨‍💼",
      color: "#28a745",
      bgColor: "#f0fff4",
      permissions: [
        "View Orders",
        "Create Orders",
        "View Customers",
        "View Vehicles",
      ],
    },
  ];

  const handleQuickLogin = (account) => {
    setIsLoggingIn(true);
    const formData = {
      employee_email: account.email,
      employee_password: account.password,
    };

    loginService
      .loginEmployee(formData)
      .then((response) => {
        if (response.status === "success") {
          toast.success(`Logged in as ${account.role}!`);
          if (response.data.employee_token) {
            localStorage.setItem("employee", JSON.stringify(response.data));
          }
          setTimeout(() => {
            window.location.replace("/");
          }, 1500);
        } else {
          toast.error(response.message || "Login failed");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Floating Button */}
      <div
        className="ai-assistant-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#4a90e2",
          boxShadow: "0 4px 20px rgba(74, 144, 226, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: "9999",
          transition: "all 0.3s ease",
          border: "none",
        }}
        title="Demo Accounts Assistant"
      >
        <span style={{ fontSize: "28px" }}>🤖</span>
      </div>

      {/* Assistant Panel */}
      {isOpen && (
        <div
          className="ai-assistant-panel"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "380px",
            maxHeight: "500px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.15)",
            zIndex: "9999",
            overflow: "hidden",
            animation: "slideUp 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #4a90e2 0%, #667eea 100%)",
              padding: "20px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "32px" }}>🎯</span>
              <div>
                <h4 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>
                  Demo Accounts Assistant
                </h4>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "12px",
                    opacity: 0.9,
                  }}
                >
                  Click to login as different user roles
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            style={{ padding: "15px", maxHeight: "350px", overflowY: "auto" }}
          >
            <p
              style={{ fontSize: "13px", color: "#666", marginBottom: "15px" }}
            >
              Welcome! Use these demo accounts to explore the application with
              different access levels:
            </p>

            {demoAccounts.map((account, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: account.bgColor,
                  borderRadius: "12px",
                  padding: "15px",
                  marginBottom: "12px",
                  border: `1px solid ${account.color}30`,
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{account.icon}</span>
                  <div>
                    <strong style={{ color: account.color, fontSize: "15px" }}>
                      {account.role}
                    </strong>
                    <p
                      style={{
                        margin: "2px 0 0 0",
                        fontSize: "11px",
                        color: "#888",
                      }}
                    >
                      {account.description}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "10px",
                    marginTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ color: "#888" }}>Email:</span>
                    <span
                      style={{ fontWeight: "500", fontFamily: "monospace" }}
                    >
                      {account.email}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#888" }}>Password:</span>
                    <span
                      style={{ fontWeight: "500", fontFamily: "monospace" }}
                    >
                      {account.password}
                    </span>
                  </div>
                </div>
                {/* Permissions Section */}
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    borderRadius: "6px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "10px",
                      color: "#666",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    ✓ Permissions:
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                  >
                    {account.permissions &&
                      account.permissions.map((perm, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "9px",
                            padding: "2px 6px",
                            backgroundColor: account.color + "20",
                            color: account.color,
                            borderRadius: "4px",
                            fontWeight: "500",
                          }}
                        >
                          {perm}
                        </span>
                      ))}
                  </div>
                </div>
                <button
                  onClick={() => handleQuickLogin(account)}
                  disabled={isLoggingIn}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: account.color,
                    color: account.role === "Manager" ? "#333" : "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: isLoggingIn ? "not-allowed" : "pointer",
                    opacity: isLoggingIn ? 0.7 : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  {isLoggingIn ? "Logging in..." : `Login as ${account.role}`}
                </button>
              </div>
            ))}

            <div
              style={{
                backgroundColor: "#e8f4fd",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "10px",
                textAlign: "center",
                border: "1px solid #b8daff"
              }}
            >
              <p style={{ margin: 0, fontSize: "11px", color: "#155724" }}>
                <strong>🔐 Role-Based Access Control:</strong><br/>
                <span style={{ fontSize: "10px" }}>
                  Role 1 (Employee) → Role 2 (Manager) → Role 3 (Admin)<br/>
                  Each level inherits permissions from the previous level
                </span>
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ai-assistant-floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(74, 144, 226, 0.5);
        }
      `}</style>
    </>
  );
}
