import React from "react";
import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu.jsx";
import AllOrders from "../../../components/Admin/Order/AllOrders.jsx";

const AllOrdersPage = () => {
  return (
    <div>
        <div>
            <div className="container-fluid admin-pages">
                <div className="row">
                    <div className="col-md-3 admin-left-side">
                      <AdminMenu />
                    </div>
                    <div className="col-md-9 admin-right-side">
                      <AllOrders />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AllOrdersPage;
