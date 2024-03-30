import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import LinearLoader from "./LinearLoader";

const Layout = () => {
  return (
    <>
      <LinearLoader />
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
