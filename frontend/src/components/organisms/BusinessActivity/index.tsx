import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import { CustomButton } from "/src/components/atoms/Button";
import { getCategories, getSubCategories } from "/src/services";
import { setUserDetails } from "/src/store/actions";
import { Store } from "/src/store/types";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "52px",
  paddingLeft: "31vw",
  paddingTop: "91px",
  ".mainTitle": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
    paddingBottom: "12px",
  },
  ".subTitle": {
    ...theme.typography.body3,
    color: theme.palette.textColor.medemp,
  },
  ".dropdown": {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  ".buttonBox": {
    marginLeft: "31.5vw",
    height: "56px",
    borderRadius: "56px",
    marginTop: "160px",
    width: "135px",
    backgroundColor: theme.palette.primaryColor[500],
    "&:hover": {
      background: `${theme.palette.primaryColor[500]}`,
      color: `${theme.palette.structuralColor.white}`,
    },
    ":disabled": {
      backgroundColor: theme.palette.primaryColor[100],
      color: theme.palette.structuralColor.white,
      opacity: "56%",
    },
  },
});
const FormControlStyled = styled(FormControl)(`
.MuiInputLabel-root{
  font-size:${theme.typography.caption1};
  color:${theme.palette.textColor.lowemp}; 
}
& .Mui-focused.MuiInputLabel-root {
  color: ${theme.palette.textColor.lowemp};
}
.MuiSelect-select{
 width:100% !important
}
`);
export interface BusinessActivityProps {}

export interface BusinessCategory {
  id: number;
  name: string;
}
export const BusinessActivity = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [dataArray, setDataArray] = useState<BusinessCategory[]>([]);
  const [subDataArray, setSubDataArray] = useState<BusinessCategory[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state:Store)=>state.user);

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    const { value } = event.target;
    setCategoryId(value);
    dispatch(setUserDetails({...userDetails,business:{...userDetails?.business,categoryId:parseInt(value)}}));
  };

  const handleSubCategoryChange = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    const { value } = event.target;
    setSubcategoryId(value);
    dispatch(setUserDetails({...userDetails,business:{...userDetails?.business,subCategoryId:parseInt(value)}}));
  };

  const handleSizeChange = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    const { value } = event.target;
    setBusinessSize(value);
    dispatch(setUserDetails({...userDetails,business:{...userDetails?.business,size:value}}));
  };

  const handleDisable = () => {
    return !(categoryId !== "" && subcategoryId !== "" && businessSize !== "");
  };

  useEffect(() => {
    getCategories().then((res) => {
      setDataArray(res.data);
    });
    getSubCategories().then((res) => {
      setSubDataArray(res.data);
    });
  }, []);

  const handleClick = () => {
    navigate("/yourDetails");
  };

  return (
    <Wrapper>
      <Box className="title">
        <TypographyComponent className="mainTitle">
          Help us verify account faster
        </TypographyComponent>
        <TypographyComponent className="subTitle">
          Without this information we can't verify your account{" "}
        </TypographyComponent>
      </Box>
      <Box className="dropdown">
        <FormControlStyled>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            data-testid="select"
            sx={{ width: "31.47vw", borderRadius: "8px" }}
            label="Category"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            MenuProps={{
              PaperProps: {
                sx: {
                  marginTop: "-65px",
                  border: `1px solid ${theme.palette.greyColor.stroke}`,
                },
              },
            }}
            onChange={handleCategoryChange}
          >
            <MenuItem value="" disabled>
              Search
            </MenuItem>
            {dataArray.map((item, idx) => (
              <MenuItem key={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControlStyled>
        <FormControlStyled>
          <InputLabel id="demo-simple-select-label1">Subcategory</InputLabel>
          <Select
            data-testId="select2"
            sx={{ width: "31.47vw", borderRadius: "8px" }}
            label="Subcategory"
            labelId="demo-simple-select-label1"
            id="demo-simple-select"
            MenuProps={{
              PaperProps: {
                sx: {
                  marginTop: "-65px",
                },
              },
            }}
            onChange={handleSubCategoryChange}
          >
            <MenuItem value="" disabled>
              Search
            </MenuItem>
            {subDataArray.map((item, idx) => (
              <MenuItem key={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControlStyled>
        <FormControlStyled>
          <InputLabel id="demo-simple-select-label3">
            Size of your business
          </InputLabel>
          <Select
            data-testId="select3"
            sx={{ width: "31.47vw", borderRadius: "8px" }}
            label="Size of your business"
            labelId="demo-simple-select-label3"
            id="demo-simple-select"
            MenuProps={{
              PaperProps: {
                sx: {
                  marginTop: "-65px",
                },
              },
            }}
            onChange={handleSizeChange}
          >
            <MenuItem value="" disabled>
              Search
            </MenuItem>
            <MenuItem value="10-50">10-50</MenuItem>
            <MenuItem value="50-100">50-100</MenuItem>
          </Select>
        </FormControlStyled>
      </Box>
      <CustomButton
        className="buttonBox"
        label="Continue"
        variant="contained"
        disabled={handleDisable()}
        onClick={handleClick}
      />
    </Wrapper>
  );
};
