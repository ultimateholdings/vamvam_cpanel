import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../images/logo/logo.svg";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui/ui-slice";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SidebarOpener from "./SidebarOpener";
import { getUserRole } from "../../../helper/utils";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const dispatch = useDispatch<AppDispatch>();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  function setSidebarOpen(value: boolean) {
    dispatch(uiActions.showSidebar(value));
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const sidebarItems = [
    {
      name: "Users",
      icon: <IoPersonOutline />,
      children: [
        {
          name: "List",
          link: "users",
        },
        {
          name: "Create",
          link: "create-user",
        },
      ],
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-start gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" width="120" height="120" />
        </NavLink>

        <SidebarOpener
          ref={trigger}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-2 py-4 px-4 lg:mt-3 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {sidebarItems.map((item, index) => {
                return (
                  <SidebarLinkGroup
                    key={index}
                    activeCondition={
                      pathname === "/" || pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              (pathname === "/" ||
                                pathname.includes("dashboard")) &&
                              "bg-graydark dark:bg-meta-4"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            {item.icon}
                            {item.name}
                            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                          </NavLink>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && "hidden"
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5">
                              {item.children.map((child, index) => {
                                return (
                                  <NavLink
                                    key={index}
                                    to={`${getUserRole()}/${child.link}`}
                                    className={({ isActive }) =>
                                      "group ml-6 relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                      (isActive && "!text-white")
                                    }
                                  >
                                    {child.name}
                                  </NavLink>
                                );
                              })}
                            </ul>
                          </div>
                        </>
                      );
                    }}
                  </SidebarLinkGroup>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
