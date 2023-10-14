import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { LoginSignup } from '/src/components/templates/loginSignUP';
import Image from '/src/components/atoms/Image';
import PocketPay from "/public/assets/images/BrandIcons/Brand.svg";
import { SignUp } from '/src/components/organisms/SignUp';

const Head=styled(Box)({
    display:'flex',
    flexDirection:'row',
    gap:'78vw',
    paddingLeft:'80px'
    ,paddingTop:'24px'
})
export const SignUpPage=()=>{
    return(
        <Box>
            <LoginSignup head={
                <Head>
                    <Image src={PocketPay} alt='Pocket pay'/>
                </Head>
            }
             children={<SignUp/>}
             ></LoginSignup>
        </Box>
    )
}
