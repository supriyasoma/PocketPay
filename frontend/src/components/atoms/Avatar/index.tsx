import { Avatar, SxProps, Theme } from "@mui/material";

interface AvatarProps {
name?:string,
src?:string,
letters?:string,
style?:React.CSSProperties,
sx?:SxProps<Theme>,
}

export const AvatarComponent = (props:AvatarProps)=>{
    const {name,src,style,letters} = props;

    return (
        <Avatar alt={name} src={src} sx={style}>{letters}</Avatar>
    );
};