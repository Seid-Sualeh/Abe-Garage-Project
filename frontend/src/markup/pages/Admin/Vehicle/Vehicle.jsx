import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import Vehicleform from "../../../components/Admin/VehicleForm/Vehicleform";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { MdBorderClear } from "react-icons/md";
import zIndex from "@mui/material/styles/zIndex";
import { useParams, Link } from "react-router-dom";
import customerService from "../../servicesAPI/customer.service";
import { useAuth } from "../../../../context/Auth";
import { LiaEdit } from "react-icons/lia";
import { FiExternalLink } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

const Vehicle = () => {
  const [customerinfo, setCustomerInfo] = useState({});
  const [addvehicle, setVehicle] = useState(false);
  const [table, setTable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const { employee } = useAuth();
  // console.log(employee,employee?.employee_token)
  const { id } = useParams();
  // console.log(id)

  const token = employee?.employee_token;

  const circleStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: "blue",
    color: "white",
    display: "inline-block",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "100px",
    position: "relative",
    zIndex: "100",
  };

  const lineStyle = {
    borderLeft: "2px solid #DDD",
    height: " 500px" /* Adjust the height as needed */,
    position: "absolute",
    top: "95px",
    left: "10%",
    //   transform: 'translateX(-50%)'
  };

  const singCustomerData = async () => {
    try {
      const data = await customerService.singleCustomer(id, token);
      const response = await customerService.getCustomerOrderbyId(id, token);

      // console.log(data?.customer)
      // console.log(response1)
      // console.log(response?.data)
      setCustomerInfo(data.customer);
      setTable(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchFunction = async () => {
    try {
      const response1 = await customerService.searchCustomerVehicles(
        id,
        token,
        searchQuery,
      );

      // console.log(response1)

      setSearchResult(response1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchFunction();
  }, [searchQuery, employee]);

  useEffect(() => {
    singCustomerData();
  }, [employee]);

  //  console.log(customerinfo)

  console.log(searchResult);
  console.log(customerinfo);
  console.log(table);

  return (
    <div>
      <div className="container-fluid admin-pages ">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>

          <div
            className="col-md-9 admin-right-side d-flex "
            style={{ position: "relative" }}
          >
            {/* <div style={lineStyle}></div> */}
            <div className="d-sm-none d-md-block">
              <div className="pl-2 pt-5 d-flex flex-column k">
                <div className="text-center bg-info my-5" style={circleStyle}>
                  Info
                </div>

                <div className="text-center bg-info my-5" style={circleStyle}>
                  Cars
                </div>

                <div
                  className="text-center bg-warning my-5"
                  style={circleStyle}
                >
                  Orders
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className=" contact-section row">
                <div className="auto-container col-md-10">
                  <div className="customer-vehicle">
                    <h2>
                      Customer : {customerinfo.customer_first_name}{" "}
                      {customerinfo.customer_last_name}
                    </h2>
                  </div>

                  <div className="v_info">
                    <p>
                      <span className="v_title">Email</span> :
                      <span>{customerinfo.customer_email}</span>
                    </p>
                    <p>
                      <span className="v_title">phone no</span> :
                      <span>{customerinfo.customer_phone_number}</span>
                    </p>
                    <p>
                      <span className="v_title"> Active Customer</span> :
                      <span>
                        {customerinfo.active_customer_status ? "Yes" : "No"}
                      </span>
                    </p>
                    <p>
                      <span className="v_title">Edit Customer info</span> :
                      <span>
                        <Link to={`/admin/edit-customer/${id}`}>
                          <FaEdit size={20} />
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-section row pad">
                <div className="auto-container  col-md-10 ">
                  <div className="contact-title mrg">
                    <h2>Vehicles of {customerinfo.customer_first_name}</h2>
                    <div className="contact-form">
                      <div className="row clearfix">
                        <div className="form-group col-md-12 search">
                          <input
                            type="text"
                            name="vehicle-model"
                            placeholder="Search for vehicle"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                          />
                        </div>

                        {searchQuery && (
                          <div className="table-responsive rounded-3 fs">
                            <table className="table table-striped table-bordered table-hover border ">
                              <thead className="table-info text-white">
                                <tr>
                                  <th>vehicle make</th>
                                  <th>vehicle model</th>
                                  <th>Vehicle tag</th>
                                  <th>vehicle type</th>
                                </tr>
                              </thead>

                              <tbody>
                                {searchResult?.map((search) => (
                                  <tr key={search.vehicle_id}>
                                    <td>{search.vehicle_make}</td>

                                    <td>{search.vehicle_model}</td>

                                    <td>{search.vehicle_tag}</td>

                                    <td>{search.vehicle_type}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    {!addvehicle && (
                      <div
                        className="form-group col-md-10"
                        style={{ paddingLeft: "0" }}
                      >
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                          onClick={() => setVehicle(!addvehicle)}
                        >
                          <span>ADD NEW VEHICLE</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {addvehicle && (
                <Vehicleform id={id} v={{ addvehicle, setVehicle }} />
              )}

              <div className="table-responsive rounded-3 fs">
                <table className="table table-striped table-bordered table-hover border ">
                  <thead className="table-info text-white">
                    <tr>
                      <th>Order date</th>
                      <th>Rec by</th>
                      <th>Vehicle</th>
                      <th>ECD</th>
                      <th>Order Status /Link</th>
                      <th>Price</th>
                      <th>Service</th>
                    </tr>
                  </thead>

                  <tbody>
                    {table?.map((customer) => (
                      <tr key={customer.customer_id}>
                        <td className="customer_name">
                          {customerService.formatDate(customer?.order_date)}
                        </td>

                        <td className="customer_name">
                          {`${customer?.employee_first_name}  ${customer?.employee_last_name}`}
                        </td>

                        <td>
                          {customer?.vehicle_serial || customer?.vehicle_make}
                        </td>
                        <td>
                          {customerService.formatDate(
                            customer?.estimated_completion_date,
                          )}
                        </td>
                        <td>{customer?.order_hash}</td>
                        <td>{customer?.order_total_price}</td>
                        <td>{customer?.service_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
