import SideMenu from "../../components/Navigation/SideMenu";
import TopNav from "../../components/Navigation/TopNav";
import { useAppSelector } from "../../redux/hooks";

const SharedLayout = ({ children }: { children: any }) => {
  const { navOpen } = useAppSelector((state) => state.user);

  return (
    <div>
      <SideMenu open={navOpen} />
      <div className="main-content lg:pl-[280px]">
        <TopNav/>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default SharedLayout;
