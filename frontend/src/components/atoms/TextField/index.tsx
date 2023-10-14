import styled from "@emotion/styled";
import { InputProps, SxProps, TextField,TextFieldVariants } from "@mui/material";
import theme from "../../../theme/theme";

interface TextFieldProps  {
label?:string,
value?:string,
required?:boolean,
onChange?:(event: React.ChangeEvent<HTMLInputElement>)=>void,
error?:boolean,
errorMessage?:string,
type?:string,
onBlur?:()=>void,
variant?:TextFieldVariants,
placeholder?:string,
inputProps?:InputProps,
style?:SxProps,
size?:any,
id?:string,
name?:string,
onFocus?: React.FocusEventHandler<HTMLInputElement>,
}
const StyleTextField=styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          border: `1px solid ${theme.palette.greyColor.stroke}`,
        },
        '&.Mui-focused fieldset': {
          border: `1px solid ${theme.palette.greyColor.stroke}`,
          borderBottom: `2px solid ${theme.palette.primaryColor[500]}`,
        },
        color: `${theme.palette.textColor.highemp}`,
        fontSize: `${theme.typography.body2.fontSize}`,
        borderRadius: '8px',
      },
      '.MuiInputLabel-root': {
        fontSize: `${theme.typography.body2.fontSize}`,
        color: `${theme.palette.textColor.lowemp}`,
      },
      '& .Mui-focused.MuiInputLabel-root': {
        color: `${theme.palette.primaryColor[500]}`,
      },
})

export const TextFieldComponent = (props:TextFieldProps)=>{

    const {label,value,required,onChange,onFocus,error,errorMessage,type,onBlur,variant,placeholder,inputProps,size,style,id,name} = props;

    return (
        <StyleTextField
        required={required}
        onChange={onChange}
        error={error}
        helperText={errorMessage}
        type={type}
        onBlur={onBlur}
        variant={variant}
        placeholder={placeholder}
        InputProps={inputProps}
        sx={style}
        size={size}
        id={id}
        label={label}
        onFocus={onFocus}
        value={value}
        name={name}
        />
    );
    
}