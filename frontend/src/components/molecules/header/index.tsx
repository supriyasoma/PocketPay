import { Box} from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';

import Image from '/src/components/atoms/Image'
import Brand from '/public/assets/images/BrandIcons/Brand.svg';
import { HorizontalStepper } from '../HorizontalStepper';
import Close from '/public/assets/images/Muiicons/close.svg';
import Back from '/public/assets/images/Muiicons/Back button.svg'
export interface HeaderProps{
    steps: StepProps[];
    onClick?: () => void;
    arrow?:boolean;
    close?:boolean;
}

interface StepProps {
    label?: string;
    active?: boolean;
    completed?: boolean;
  }

  const Wrapper=styled(Box)({
    display:'flex',
    flexDirection:'column',
    gap:'30px',
    ".top":{
        display:'flex',
        flexDirection:'row'
    },
    ".stepper":{
        paddingLeft:'106px',
        paddingRight:'185px',
    },
    ".arrow":{
        paddingLeft:'13vw',
        paddingTop:'40px',
        cursor:'pointer'
    }
  })
 
export const Header=({steps,onClick,arrow,close}:HeaderProps)=>{
    return(
        <Wrapper>
            <Box className="top">
            <Image src={Brand} alt="brand"/>
            <Box className="stepper">
            <HorizontalStepper steps={steps}/>
            </Box>
            {close&&
            <Image src={Close} alt="CloseSvg"/> 
            }
           </Box>
            {arrow &&
            <Box className="arrow">
              <Image src={Back} alt="back button" onClick={onClick}/>
            </Box>
}
        </Wrapper>
    )
}
