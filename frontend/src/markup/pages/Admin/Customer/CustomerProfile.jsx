import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import Profile from "../../../components/Admin/Customer/CustomerProfile/CustomerProfile";

export default function CustomerProfile() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}
