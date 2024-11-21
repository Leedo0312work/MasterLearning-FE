<<<<<<< HEAD
import { Outlet } from 'react-router-dom';
import SidebarClass from '~/components/SidebarClass';

function DetailClass() {
    return (
        <div>
            <div>
                {/*<SidebarClass />*/}
                <SidebarClass />
            </div>
            <div className={'tw-ml-[240px]'}>
                <Outlet />
            </div>
        </div>
    );
=======
import { Outlet } from "react-router-dom";
import SidebarClass from "~/components/SidebarClass";
import SidebarClassAdmin from "~/components/SidebarClassAdmin";

function DetailClass() {
  return (
    <div>
      <div>

        <SidebarClass />
      </div>
      <div className={"tw-ml-[240px]"}>
        <Outlet />
      </div>
    </div>
  );
>>>>>>> 7ded045da28b53dfd0d14877646abca0bcb8cca2
}

export default DetailClass;
