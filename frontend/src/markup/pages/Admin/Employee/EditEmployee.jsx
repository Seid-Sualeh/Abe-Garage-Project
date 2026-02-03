import React from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import EditEmployeeForm from "../../../components/Admin/Employee/EditEmployeeForm/EditEmlopyeeForm";

function EditEmployee() {
  const { id } = useParams();
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditEmployeeForm employeeId={id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEmployee;
