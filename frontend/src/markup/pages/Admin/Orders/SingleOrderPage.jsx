import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CreateNewOrder from "../../../components/Admin/Order/CreateNewOrder";
import SingleOrder from "../../../components/Admin/Order/SingleOrder";

function SingleOrderPage() {
  return (
    <div>
        <div>
              <div className="container-fluid admin-pages">
                  <div className="row">
                      <div className="col-md-3 admin-left-side">
                        <AdminMenu />
                      </div>
                      <div className="col-md-9 admin-right-side px-5">
                        <SingleOrder />
                      </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SingleOrderPage;