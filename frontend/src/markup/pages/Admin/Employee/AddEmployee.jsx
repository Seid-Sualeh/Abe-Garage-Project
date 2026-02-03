import AdminMenu from '../../../components/Admin/Admin/AdminMenu/AdminMenu';
import AddEmployeeForm from '../../../components/Admin/Employee/AddEmployeeForm/AddEmployeeForm';

export default function AddEmployee() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </>
  );
}
