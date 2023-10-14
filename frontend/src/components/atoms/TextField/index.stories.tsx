import { types } from "@babel/core";
import { TextFieldComponent } from ".";
import { Meta, StoryObj } from "@storybook/react";
import { InputAdornment } from "@mui/material";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const meta:Meta<typeof TextFieldComponent> = {
    title:"Atoms/TextField",
    component:TextFieldComponent
};

export default meta;

type Story =StoryObj<typeof TextFieldComponent>;



export const Email:Story = {
    args:{
        type:"email",
        placeholder:"Enter your email address",
        variant:"outlined",
        size:"large",
        style:{
            width: "516px",
            height: "72px",
            borderRadius: "8px"
        }
    }
}

export const Password:Story = {
    
    args:{
        type:"password",
        placeholder:"Enter your password",
        variant:"outlined",
        size:"large",
        inputProps: { endAdornment: (
            <InputAdornment position="end">
              <VisibilityOffOutlinedIcon />
            </InputAdornment>
          )},
    }
}