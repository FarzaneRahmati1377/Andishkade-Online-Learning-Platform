import { useLoginContext } from "../../context/LoginContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteMemberShipPage = () => {
    const {isLogin} = useLoginContext();
    return (
        <>
           {
            isLogin ? <Navigate to={'my-account'}/> : <Outlet />
           }
        </>
    );
}
 
export default PrivateRouteMemberShipPage;