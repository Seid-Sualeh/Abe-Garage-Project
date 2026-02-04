import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../../../../context/Auth";
import vehicleService from "../../../../pages/servicesAPI/vehicle.service";
import { useNavigate } from "react-router-dom";
// import { BeatLoader } from "react-spinners";

const Vehicleform = ({ id, v }) => {
  const { addvehicle, setVehicle } = v;

  const customer_id = id;

  const [serverError, setServerError] = useState("");
  const { employee } = useAuth();
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [spin, setSpinner] = useState(false);
  const navigate = useNavigate();
  // console.log(employee,employee?.employee_token)

  const token = employee?.employee_token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    if (
      !customer_id ||
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_model ||
      !vehicle_type ||
      !vehicle_mileage ||
      !vehicle_tag ||
      !vehicle_serial ||
      !vehicle_color
    ) {
      setServerError("Please fill all required fields.");
      setSpinner(false);
      return;
    }

    const formData = {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };

    try {
      const result = await vehicleService.AddVehicle(formData, token);

      // console.log(result)
      setTimeout(() => {
        setSpinner(false);
        navigate("/admin/create-order");
      }, 1000);
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <section className="contact-section row pad">
      <div className="auto-container col-md-8 bgc ">
        <div className="close-btn" onClick={() => setVehicle(!addvehicle)}>
          <IoCloseSharp
            color="#fff"
            style={{
              background: "red",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </div>

        <div className="contact-title ">
          <h2>Add a new Vehicle</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column ">
            <div className="inner-column ">
              <div className="contact-form  col-lg-10 ">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="text"
                        name="vehicle-year"
                        value={vehicle_year}
                        onChange={(event) => setVehicleYear(event.target.value)}
                        placeholder="Vehicle year"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="first-name"
                        value={vehicle_make}
                        onChange={(event) => setVehicleMake(event.target.value)}
                        placeholder="Vehicle make"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle-model"
                        value={vehicle_model}
                        onChange={(event) =>
                          setVehicleModel(event.target.value)
                        }
                        placeholder="Vehicle model"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle-type"
                        value={vehicle_type}
                        onChange={(event) => setVehicleType(event.target.value)}
                        placeholder="Vehicle type"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle-mileage"
                        value={vehicle_mileage}
                        onChange={(event) =>
                          setVehicleMileage(event.target.value)
                        }
                        placeholder="Vehicle mileage"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle-tag"
                        value={vehicle_tag}
                        onChange={(event) => setVehicleTag(event.target.value)}
                        placeholder="Vehicle tag"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle-serial"
                        value={vehicle_serial}
                        onChange={(event) =>
                          setVehicleSerial(event.target.value)
                        }
                        placeholder="Vehicle serial"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle-color"
                        value={vehicle_color}
                        onChange={(event) =>
                          setVehicleColor(event.target.value)
                        }
                        placeholder="Vehicle color"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      {/* <input id="form_botcheck" name="form_botcheck" className="form-control" type="hidden" value="" /> */}
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>
                          {spin ? "Adding Vehicle..." : "ADD VEHICLE"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vehicleform;
