import { Navigate, Outlet } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";

const PrivateRouteMyAccountPage = () => {
    const {isLogin} = useLoginContext();
    return (
        <>
           {
            isLogin ? <Outlet /> : <Navigate to={'/member-ship'}/>
           }
        </>
    );
}
 
export default PrivateRouteMyAccountPage;