import { Navigate } from 'react-router-dom';
import { useAuthContext} from "../context/AuthProvider";

const PrivateRoute = ({ children}) => {
    const {authToken} = useAuthContext();

    if (!authToken) {
      return <Navigate to="/LoginPage" replace/>;
    }
    return children
};

export default PrivateRoute;
