import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/Auth";
import vehicleService from "../../../../../pages/servicesAPI/vehicle.service";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import ErrorComponent from "../../../../pages/MainPge/404Page/NotFound";

const EditVehicleForm = ({ vid }) => {
  const vehicle_id = vid;

  const [serverError, setServerError] = useState("");
  const [error, setError] = useState("");
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const [customer, setCustomer] = useState("");
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const navigate = useNavigate();
  // Spinner handler state
  const [spin, setSpinner] = useState(false);
  const [isOrderExist, setIsOrderExist] = useState(false);
  const [fof4, setFof4] = useState(false);

  const hasServicedThisVehicle = async () => {
    try {
      const result = await vehicleService.hasServiceOrder(vid, token);
      console.log(result);
      if (result >= 1 || result) {
        setIsOrderExist(true);
        setError(
          `Updating the vehicle's information is unavailable due to an existing order, but adding a new vehicle is permissible.`,
        );
      }
    } catch (error) {
      console.log(error);
      setServerError("Internal Server Error!, try again0");
    }
  };

  const fetchVehicle = async () => {
    try {
      const data = await vehicleService.getVehicleInfo(vid, token);

      if (data?.data?.data?.length == 0) {
        setFof4(true);
      }

      setCustomer(`${data.customer_first_name} ${data.customer_last_name}`);
      setVehicleYear(data.vehicle_year);
      setVehicleMake(data.vehicle_make);
      setVehicleModel(data.vehicle_model);
      setVehicleType(data.vehicle_type);
      setVehicleMileage(data.vehicle_mileage);
      setVehicleTag(data.vehicle_tag);
      setVehicleSerial(data.vehicle_serial);
      setVehicleColor(data.vehicle_color);
    } catch (error) {
      console.log(error);
      setServerError("Internal Server Error!, try again1");
    }
  };

  useEffect(() => {
    hasServicedThisVehicle();
    fetchVehicle();
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    if (
      !vehicle_id ||
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_model ||
      !vehicle_type ||
      !vehicle_mileage ||
      !vehicle_tag ||
      !vehicle_mileage ||
      !vehicle_color
    ) {
      setError("fill all required info in the form.");
      return;
    }

    const formData = {
      vehicle_id,
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
      const result = await vehicleService.updateVehicle(formData, token);

      // console.log(result.status)
      setTimeout(() => {
        setSpinner(false);
        navigate("/admin/create-order");
      }, 1000);
    } catch (error) {
      console.log(error);
      setServerError("Internal Server Error!, try again2");
      setSpinner(false);
    }
  };

  if (!fof4) {
    return (
      <section className="contact-section ">
        <div className="auto-container ">
          <div className="contact-title  edit_vehicle">
            <h2>
              Edit {customer != "undefined" && <span>{`${customer}'s`} </span>}{" "}
              vehicle info
            </h2>
          </div>

          {serverError && (
            <div className="validation-error" role="alert">
              {serverError}
            </div>
          )}

          {error && (
            <div
              className="validation-error"
              role="alert"
              style={{
                color: "red",
                fontSize: "100%",
                fontWeight: "600",
                padding: "25px",
              }}
            >
              {error}
            </div>
          )}

          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column ">
                <div className="contact-form">
                  {!isOrderExist && (
                    <form onSubmit={handleSubmit}>
                      <div className="row clearfix">
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            name="vehicle-year"
                            value={vehicle_year}
                            onChange={(event) =>
                              setVehicleYear(event.target.value)
                            }
                            placeholder="Vehicle year"
                            required
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            name="first-name"
                            value={vehicle_make}
                            onChange={(event) =>
                              setVehicleMake(event.target.value)
                            }
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
                            onChange={(event) =>
                              setVehicleType(event.target.value)
                            }
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
                            onChange={(event) =>
                              setVehicleTag(event.target.value)
                            }
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
                          <button
                            className="theme-btn btn-style-one"
                            type="submit"
                            data-loading-text="Please wait..."
                          >
                            <span>
                              UPDATE VEHICLE{" "}
                              {spin && <BeatLoader color="white" size={8} />}
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <ErrorComponent />;
  }
};

export default EditVehicleForm;
