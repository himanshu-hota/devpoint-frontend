import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

const ProtectedRoutes = () => {


  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('devPToken');
    if (!token) {
      navigate('/login');
    }

  }, [navigate]);

  return <Outlet />;
}


export default ProtectedRoutes;
