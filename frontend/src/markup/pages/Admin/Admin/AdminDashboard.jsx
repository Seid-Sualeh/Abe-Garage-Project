import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import AdminDash from "../../../components/Admin/Admin/AdminDashboard/AdminDashboard";

export default function AdminDashboard() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-2 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-10 admin-right-side">
            <AdminDash />
          </div>
        </div>
      </div>
    </>
  );
}
