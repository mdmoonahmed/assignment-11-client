import React from 'react';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import Loading from '../components/Loader/Loader';
import Forbidden from '../components/Forbidden/Forbidden';

const ChefRoute = ({ children }) => {
   const { role,roleLoading} = useRole();
    const {  loading } = useAuth();
    
    if(roleLoading || loading){
        return <Loading></Loading>
    }
    if(role !== 'chef'){
        return <Forbidden></Forbidden>
    }

    return children
};

export default ChefRoute;