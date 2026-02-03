import React from 'react'
import OrderDetail from '../../../components/Admin/Order/OrderDetail';
import AdminMenu from '../../../components/Admin/AdminMenu/AdminMenu';

function OrderDetailPage() {
  return (
    <div>
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side ">
              <OrderDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage