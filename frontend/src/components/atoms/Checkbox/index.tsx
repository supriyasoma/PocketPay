import { Checkbox, SxProps } from "@mui/material";

interface CheckboxProps {
size?:any,
style?:SxProps,
color?:any,
onChange?:()=>void
}

export const CheckBoxComponent = (props:CheckboxProps)=>{

    const {onChange,size,style,color} = props;

    return (
        <Checkbox onChange={onChange} size={size} sx={style} color={color} />
    );
}