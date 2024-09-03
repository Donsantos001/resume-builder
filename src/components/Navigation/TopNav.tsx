import { useAppDispatch } from "../../redux/hooks";
import { toggleNav } from "../../redux/slices/userSlice";

const TopNav = ({ open }: { open: boolean }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="px-4 py-2 h-[50px] flex items-center justify-between">
      <h3 className="text-3xl font-bold text-gray-800">CareerKit</h3>

      <button
        onClick={() => {
          dispatch(toggleNav());
        }}
        className="text-2xl lg:hidden"
      >
        <div className="fa fa-book"></div>
      </button>
    </div>
  );
};

export default TopNav;
