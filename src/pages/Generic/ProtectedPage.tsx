import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const ProtectedPage = ({ children }: any) => {
  const { user } = useSelector((store: RootState) => store.user);
  if (!user) {
    return <Navigate to="login" />;
  }
  return children;
};

export default ProtectedPage;
