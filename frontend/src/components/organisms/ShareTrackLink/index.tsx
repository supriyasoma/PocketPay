import React from 'react';
import { Box, Modal, SxProps } from '@mui/material';
import styled from '@emotion/styled';

import { TypographyComponent } from '/src/components/atoms/Typography';
import theme from '/src/theme/theme';
import Image from '/src/components/atoms/Image';
import ShareIcon from '/src/components/molecules/ShareIcon';
import Sharelink from "/public/assets/images/Illustrations/Share link.svg";
import Email from "/public/assets/images/Muiicons/Email.svg";
import Copy from "/public/assets/images/Muiicons/link.svg";
export interface ShareTrackLinkProps {
    open: boolean;
    onClose?: () => void;
    sx?: SxProps;
}
const ModalDiv=styled(Box)({
width:'548px',
height:'510px',
display:'flex',
flexDirection:'column',
margin:'122px 409px',
borderRadius:'16px',
backgroundColor:theme.palette.structuralColor.white,
cursor:'pointer'
})
const ImageDiv=styled(Image)({
    width:'175px',
    height:'126px',
    paddingLeft:'187px',
    paddingBottom:'36px',
})
const TypographyComponentDiv=styled(TypographyComponent)({
    color:theme.palette.textColor.highemp,
    ...theme.typography.body1,
    paddingTop:'56px',
    paddingBottom:'44px',
    paddingLeft:'194px'

})
const TypographyComponentDiv2=styled(TypographyComponent)({ 
    color:theme.palette.textColor.medemp,
    ...theme.typography.body3,
    paddingLeft:'39px'
})
const IconsDiv=styled(Box)({
    display:'flex',
    gap:'40px',
    paddingLeft:'187px',
    paddingBottom:'40px'
})
export const ShareTractLink = ({ open, onClose, sx }:ShareTrackLinkProps) => {
    return (
        <Modal open={open} onClose={onClose} sx={sx} >
           <ModalDiv>
            <TypographyComponentDiv>Share tracking link</TypographyComponentDiv>
            <ImageDiv src={Sharelink} alt="image loading"/>
           <IconsDiv>
            <ShareIcon  srcIcon={Email} title="Email"/>
            <ShareIcon  srcIcon={Copy} title="Copy"/>
            </IconsDiv>
            <TypographyComponentDiv2>Share the link above, and they can securely track this transfer.</TypographyComponentDiv2>
           </ModalDiv>
        </Modal>
    );
};
