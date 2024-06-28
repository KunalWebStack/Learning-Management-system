import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PrivateRoutes = () => {
    const token = useSelector((state) => state.user.token);
    console.log(token,">>>>>>>>>>token");
    return token ? <Outlet/> : (
        <>
            {toast.error("You have to Login first", {
                position: "top-center",
                autoClose: 2000,
                theme: "colored"
            })}
            <Navigate to="/" />
        </>
    );
};

export default PrivateRoutes;
