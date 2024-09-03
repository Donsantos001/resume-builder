import { useRef } from "react";
import Logo from "../../asset/imgs/res-builder.png";
import useClickOutside from "../../hooks/useClickOutside";
import { useAppDispatch } from "../../redux/hooks";
import { closeNav, logOut } from "../../redux/slices/userSlice";

const SideMenu = ({ open }: { open: boolean }) => {
  const menuRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  //   useClickOutside(menuRef, () => {
  //     dispatch(closeNav());
  //   });

  return (
    <div
      ref={menuRef}
      className={`fixed h-screen z-40 w-[280px] bg-blue-900 transition-all lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full w-full justify-between p-2">
        <div className="">
          <div className={`${open ? "p-2" : "p-2 md:py-2"}`}>
            <img
              className="h-16 object-contain"
              src={Logo}
              alt="Career Kit Logo"
            />
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <a
              href={"/"}
              className={`relative mt-2 overflow-hidden rounded-lg py-3 px-2 text-white hover:bg-white/20`}
            >
              <div className="grid grid-cols-[50px,_minmax(200px,_1fr)]">
                <div className="flex items-center justify-center mr-2">
                  <div className={`fa fa-book`}></div>
                </div>

                <div>Profiles</div>
              </div>
            </a>
            <a
              href={"/createprofile"}
              className={`relative mt-2 overflow-hidden rounded-lg py-3 px-2 text-white hover:bg-white/20`}
            >
              <div className="grid grid-cols-[50px,_minmax(200px,_1fr)]">
                <div className="flex items-center justify-center mr-2">
                  <div className={`fa fa-book`}></div>
                </div>

                <div>Create Profile</div>
              </div>
            </a>
            <a
              href={"/resume"}
              className={`relative mt-2 overflow-hidden rounded-lg py-3 px-2 text-white hover:bg-white/20`}
            >
              <div className="grid grid-cols-[50px,_minmax(200px,_1fr)]">
                <div className="flex items-center justify-center mr-2">
                  <div className={`fa fa-book`}></div>
                </div>

                <div>Resume/CV</div>
              </div>
            </a>
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
                <div className={`fa fa-book`}></div>
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
