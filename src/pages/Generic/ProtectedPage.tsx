import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";

const ProtectedPage = ({ children }: any) => {
  const location = useLocation();
  const { user } = useSelector((store: RootState) => store.user);
  if (!user) {
    return <Navigate to="login" state={{ prev: location.pathname }} />;
  }
  return children;
};

export default ProtectedPage;
