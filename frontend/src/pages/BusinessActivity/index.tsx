import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { LoginSignup } from '/src/components/templates/loginSignUP';
import { Header } from '/src/components/molecules/header';
import { BusinessActivity } from '/src/components/organisms/BusinessActivity';
import { Store } from '/src/store/types';
import { activeStepBusiness } from '/src/store/actions';

export const BusinessActivityPage=()=>{
const businessSteps = useSelector((state:Store)=>state.businessSteps);
const dispatch = useDispatch();
const [active,setActive] =  useState(false);

useEffect(()=>{
    if(!active){
        dispatch(activeStepBusiness(2));
        setActive(true);
    }
});

return(
    <Box>
        <LoginSignup 
        head={<Header steps={businessSteps ? businessSteps:[]}/>} 
        children={<BusinessActivity/>}/>
    </Box>
)
}
