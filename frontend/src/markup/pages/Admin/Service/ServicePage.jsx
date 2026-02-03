import React from "react";
import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import ServiceList from "../../../components/Admin/Service/ServiceList";

function ServicePage() {
  return (
    <div>
        <div>
            <div className="container-fluid admin-pages">
                <div className="row">
                    <div className="col-md-3 admin-left-side">
                      <AdminMenu />
                    </div>
                    <div className="col-md-9 admin-right-side ">
                      <ServiceList />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ServicePage;