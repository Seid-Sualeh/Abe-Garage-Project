import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../../../utils/axiosConfig";
import { FaHandPointer } from "react-icons/fa";

function SelectVehicle() {
  const { customerId } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const employee = JSON.parse(localStorage.getItem("employee"));
        const token = employee?.employee_token;
        const response = await axios.get(`/api/vehicles/${customerId}`, {
          headers: { "x-access-token": token },
        });
        setVehicles(response.data.result || []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [customerId]);

  if (loading) {
    return <p>Loading vehicles...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="contact-section pad_1">
        <div className="contact-title mb-1">
          <h2>Select a vehicle for the order</h2>
        </div>
      </div>

      {vehicles.length > 0 ? (
        <div className="table-responsive rounded-3">
          <table className="table table-bordered table-striped table-hover border">
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>
                    {vehicle.vehicle_make} {vehicle.vehicle_model}
                  </td>
                  <td>{vehicle.vehicle_year}</td>
                  <td>{vehicle.vehicle_tag}</td>
                  <td>
                    <Link
                      to={`/admin/new-order/${customerId}/${vehicle.vehicle_id}`}
                      className="editButton"
                    >
                      <FaHandPointer />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No vehicles found for this customer.</p>
      )}
    </div>
  );
}

export default SelectVehicle;
