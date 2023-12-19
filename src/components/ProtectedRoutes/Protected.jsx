import { Suspense, lazy } from "react";
import Loading from "../LazyLoader/Loading";
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'));
import { Outlet } from "react-router-dom";


const Protected = () => {
    return <Suspense fallback={<Loading />}>
        <ProtectedRoutes>
            <Outlet />
        </ProtectedRoutes>
    </Suspense>
}

export default Protected;