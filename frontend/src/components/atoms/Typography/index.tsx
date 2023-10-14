import { SxProps, Theme, Typography } from "@mui/material";
import React from "react";

interface TypographyProps {
    variant?:any,
    style?:React.CSSProperties,
    sx?:SxProps<Theme>,
    children?: React.ReactNode;
    id?:string,
    title?:string,
    className?:string
}

export const TypographyComponent = (props:TypographyProps)=>{

const {variant,style,children,id,title ,sx,className} = props;

return <Typography id={id} title={title} variant={variant} sx={sx} style={style} className={className}>{children}</Typography>;

};