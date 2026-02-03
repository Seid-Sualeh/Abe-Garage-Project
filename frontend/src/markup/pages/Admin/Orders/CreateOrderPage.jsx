import React, { useState } from 'react';
import CreateOrder from '../../../components/Admin/Order/CreateOrder';
import AdminMenu from '../../../components/Admin/AdminMenu/AdminMenu';

function CreateOrderPage() {
    return (
    <div>
        <div>
            <div className="container-fluid admin-pages">
                <div className="row">
                    <div className="col-md-3 admin-left-side">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 admin-right-side px-5">
                        <CreateOrder />
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default CreateOrderPage