import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import HeaderUser from '~/components/Header';
import SidebarClassAdmin from '~/components/SidebarClassAdmin';

function AdminLayout() {
    return (
        <div>
            <div>
                {/* <Header /> */}
                <SidebarClassAdmin />
            </div>
            <div className={'tw-ml-[240px]'}>
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
