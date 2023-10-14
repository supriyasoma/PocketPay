import { FormControl, Grid, PaperProps, Stack, SxProps, Theme, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@emotion/styled";
import theme from "/src/theme/theme";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { logos } from "/src/utils/constants";
interface DropDownProps {
  onChange?:(event: SelectChangeEvent)=>void,
  menuItems: MenuItemType[];
  sx?: SxProps<Theme>;
  defaultValue?: string;
  labelId?: string;
  id?: string;
  label?: React.ReactNode;
  placeholder?: string;
  variant?:"filled" | "outlined" | "standard" ,
  IconComponent?:React.ElementType<any>,
  menuProps?:MenuTypeProps,
  name?:string,
  testid?:string
}
interface MenuTypeProps{
  PaperProps?:PaperProps,
}
interface MenuItemType {
  imgSrc?: string;
  selected?:boolean,
  tail?:string,
  label?:string,
  value?:string,
  renderValue?:string,
  renderFlag?:boolean
}

const Body2 = styled(TypographyComponent)({
  ...theme.typography.body2,
  color:`${theme.palette.textColor.medemp}`
});
const FormControlStyled = styled(FormControl)(`
.MuiInputLabel-root{
  font-size:${theme.typography.caption1};
  color:${theme.palette.textColor.lowemp}; 
}
& .Mui-focused.MuiInputLabel-root {
  color: ${theme.palette.textColor.lowemp};
}
.MuiOutlinedInput-root {
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color:  ${theme.palette.greyColor.stroke};

  }
  
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${theme.palette.greyColor.stroke}; 
  }
  .MuiSelect-select{
    width:100% !important
   }
}
`);
const DropDown = ({
  sx,
  onChange,
  menuItems,
  defaultValue,
  labelId,
  id,
  label,
  placeholder,
  variant,
  IconComponent,
  name,
  menuProps,
  testid

}: DropDownProps) => {
  const handleRender = (selected: string) => {
     let selectedObj:MenuItemType = menuItems.filter(obj=>obj.value == selected)[0];
    return (
      <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        {selectedObj?.imgSrc ? (
          <img
            src={logos[selectedObj.imgSrc]}
            height={25}
            width={25}
            style={{paddingTop:"2px"}}
          />
        ) : null}
        <TypographyComponent sx={{ ...theme.typography.body1 }}>
          {selectedObj?.renderValue
            ? selectedObj?.renderValue
            : selectedObj?.label}
        </TypographyComponent>
      </div>
    );
  };
  return (
    <FormControlStyled sx={sx} size="medium" data-testid="dropDown">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        data-testid={testid}
        defaultValue={defaultValue}
        labelId={labelId}
        id={id}
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        variant={variant}
        name={name}
        IconComponent={IconComponent}
        MenuProps={menuProps}
        renderValue={(selected)=>{
          return handleRender(selected);
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.imgSrc} value={item.value} selected={item.selected}>
            <Stack
              direction="row"
              spacing={3}
              width="100%"
            >
              <Grid container>
                <Grid item sm={8} display='flex' gap={6}>
                <img src={logos[item.imgSrc ?? ""]} height={25} width={25} style={{display:item?.imgSrc ? 'inline-block':'none',paddingTop:'2px'}}/>
                <Typography> {item.label}</Typography>
                </Grid>
                <Grid item sm={4} textAlign='right'>
                  <Body2>{item.tail}</Body2>
                </Grid>
              </Grid>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControlStyled>
  );
};

export default DropDown;
