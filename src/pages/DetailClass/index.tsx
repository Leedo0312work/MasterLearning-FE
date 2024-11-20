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
}

export default DetailClass;
