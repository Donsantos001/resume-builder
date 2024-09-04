import { useRef } from "react";
import Logo from "../../asset/imgs/logo.png";
// import useClickOutside from "../../hooks/useClickOutside";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/slices/userSlice";
import { Link, useLocation } from "react-router-dom";

const SideMenu = ({ open }: { open: boolean }) => {
  const { pathname } = useLocation();
  const menuRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  //   useClickOutside(menuRef, () => {
  //     dispatch(closeNav());
  //   });

  return (
    <div
      ref={menuRef}
      className={`fixed h-screen z-40 max-w-[calc(100vw_-_40px)] w-[280px] bg-blue-900 transition-all lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full w-full justify-between p-2">
        <div className="">
          <div className={`flex items-center ${open ? "p-2" : "p-2 md:py-2"}`}>
            <img
              className="h-16 object-contain"
              src={Logo}
              alt="Career Kit Logo"
            />

            <h3 className="text-3xl font-bold text-white">CareerKit</h3>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <Link
              to={"/"}
              className={`relative mt-2 overflow-hidden rounded-lg py-3 px-2 text-white ${
                pathname === "/" ? "bg-white/30" : "hover:bg-white/20"
              }`}
            >
              <div className="grid grid-cols-[50px,_minmax(200px,_1fr)]">
                <div className="flex items-center justify-center mr-2">
                  <div className={`fa fa-user-circle`}></div>
                </div>

                <div>Profiles</div>
              </div>
            </Link>
            <Link
              to={"/createprofile"}
              className={`relative mt-2 overflow-hidden rounded-lg py-3 px-2 text-white ${
                pathname === "/createprofile"
                  ? "bg-white/30"
                  : "hover:bg-white/20"
              }`}
            >
              <div className="grid grid-cols-[50px,_minmax(200px,_1fr)]">
                <div className="flex items-center justify-center mr-2">
                  <div className={`fa fa-plus-square`}></div>
                </div>

                <div>Create Profile</div>
              </div>
            </Link>
            <Link
              to={"/resumetemplates"}
              className={`relative mt-2 overflow-hidden rounded-lg py-3 px-2 text-white ${
                pathname === "/resumetemplates"
                  ? "bg-white/30"
                  : "hover:bg-white/20"
              }`}
            >
              <div className="grid grid-cols-[50px,_minmax(200px,_1fr)]">
                <div className="flex items-center justify-center mr-2">
                  <div className={`fa fa-file-alt`}></div>
                </div>

                <div>Templates</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => {
              dispatch(logOut());
            }}
            className={`relative mt-2 text-left overflow-hidden rounded-lg py-3 px-2 text-white hover:bg-white/20`}
          >
            <div className="grid grid-cols-[50px,_minmax(200px,_1fr)]">
              <div className="flex items-center justify-center mr-2">
                <div className={`fa fa-sign-out-alt`}></div>
              </div>

              <div>Logout</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
