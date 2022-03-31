import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/configerStore";

const ProtectedRoute = ({ children }:any) => {
    const {user} = useAppSelector(state => state.account)
    
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    else{
      return children;
    }
  };

  export default ProtectedRoute;