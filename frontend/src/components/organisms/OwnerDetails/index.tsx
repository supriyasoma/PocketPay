import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

import { TypographyComponent } from "/src/components/atoms/Typography";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import theme from "/src/theme/theme";
import DropDown from "/src/components//molecules/DropDown";
import { CustomButton } from "/src/components/atoms/Button";
import { getMyData } from "/src//services";
import { Country } from "/src/models/country";
import { BusinessOwner } from "/src/models/business-owner";
import { setTransaction } from "/src/store/actions";
import { Store } from "/src/store/types";
export interface OwnerDetailsProps {
  mainTitle?: string;
  subTitle?: string;
  nameTitle: string;
  buttonLabel?: string;
  onClick?: () => void;
}
const Wrapper = styled(Box)({
  paddingLeft: "31vw",

  ".mainTitle": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
    paddingBottom: "12px",
  },
  ".subTitle": {
    ...theme.typography.body3,
    color: theme.palette.textColor.medemp,
    paddingBottom: "40px",
  },
  ".subBox": {
    width: "515px",
  },
  ".userName": {
    ...theme.typography.body3,
    color: theme.palette.textColor.highemp,
    paddingBottom: "12px",
  },
  ".fieldDiv": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  ".addButton": {
    ...theme.typography.body3,
    color: theme.palette.primaryColor[500],
    paddingBottom: "40px",
  },
  ".button": {
    ...theme.typography.body3,
    color: theme.palette.primaryColor[500],
    marginBottom: "40px",
  },
  ".continuebutton": {
    marginLeft: "31.5vw",
    marginTop: "7vw",
    width: "9.88vw",
    height: "56px",
    borderRadius: "56px",
    backgroundColor: theme.palette.primaryColor[500],
    ":disabled": {
      backgroundColor: theme.palette.primaryColor[100],
      color: theme.palette.structuralColor.white,
      opacity: "56%",
    },
    "&:hover": {
      background: `${theme.palette.primaryColor[500]}`,
      color: `${theme.palette.structuralColor.white}`,
    },
  },
  ".customdate":{
    color:"red"
  }
});
export const OwnerDetails = ({
  mainTitle,
  subTitle,
  nameTitle,
  buttonLabel,
  onClick,
}: OwnerDetailsProps) => {
  const [directors, setDirectors] = useState([
    { type: "", firstName: "", lastName: "", dob: "", country: "" },
  ]);
  const [labelDate, setLabelDate] = useState(false);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [menuList, setMenuList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const transaction = useSelector((state:Store)=>state.transaction);
  
  const handleChange =
    (index: number, property: keyof (typeof directors)[0]) => (event: any) => {
      const updatedUsers = [...directors];
      updatedUsers[index][property] = event.target.value;
      setDirectors(updatedUsers);
      if (property === "dob") {
        setLabelDate(true);
      }
    };
  useEffect(() => {
    if(countryList.length == 0){
      getMyData("countries").then(res=>{
        if(res?.data){
        setCountryList(res.data);
        let list:any[] = [];
        res.data.forEach((country:Country)=>{
          let obj = {
            imgSrc: country.flagSrc,
          label: country.name,
          value: country.id,
          renderValue: country.name,
          };
          list.push(obj);
        });
        setMenuList(list);
        }
      });
    }

    setDirectors((directors) => {
      const owner = [...directors];
      owner[0].type = nameTitle;
      return owner;
    });
  }, []);

  const handleDisable = () => {
    return !(
      directors[0].type !== "" &&
      directors[0].firstName !== "" &&
      directors[0].lastName !== "" &&
      directors[0].dob !== "" &&
      directors[0].country !== ""
    );
  };

  const isDisabled = () => {
    const director = directors[0];
    return !(
      director.type !== "" &&
      director.firstName !== "" &&
      director.lastName !== "" &&
      director.dob !== "" &&
      director.country !== ""
    );
  };

  const handleClick = () => {
    const businessOwner:BusinessOwner[] = transaction?.businessOwner ? transaction?.businessOwner:[]; 
    directors.forEach(obj=>{
      let owner:BusinessOwner = {
        firstName:obj.firstName,
        lastName:obj.lastName,
        dob:obj.dob,
        role:obj.type,
        countryId:parseInt(obj.country)
      };
      businessOwner.push(owner);
    });
    dispatch(setTransaction({businessOwner:businessOwner}));
    if (onClick) {
      onClick();
    }
  };

  return (
    <Wrapper>
      <TypographyComponent className="mainTitle">
        {mainTitle}
      </TypographyComponent>
      <Box className="subBox">
        <TypographyComponent className="subTitle">
          {subTitle}
        </TypographyComponent>
      </Box>
      {directors.map((user, index) => (
        <Box key={user.type}>
          <TypographyComponent className="userName">
            {" "}
            {nameTitle} {index + 1}
          </TypographyComponent>
          <Box className="fieldDiv">
            <TextFieldComponent
              style={{ width: "31.47vw", height: "7.81vh" }}
              type="text"
              label="First name"
              placeholder="First name"
              onChange={handleChange(index, "firstName")}
            />
            <TextFieldComponent
              style={{ width: "31.47vw", height: "7.81vh" }}
              type="text"
              label="last name"
              placeholder="Last name"
              onChange={handleChange(index, "lastName")}
            />
            <TextFieldComponent
              style={{ width: "31.47vw", height: "7.81vh" ,
              "& .MuiInputBase-input": {
                color: "#9F9DA3",
              },
              "& input[type='date']::-webkit-calendar-picker-indicator ":{
                cursor: 'pointer'
              }
              
              }}
              type="date"
              label={labelDate ? "Date of birth" : ""}
              placeholder="Date of birth"
              onChange={handleChange(index, "dob")}
              inputProps={{className:"customdate"}}
            />
            <DropDown
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="country"
              label="Country of residence"
              placeholder="Country of residence"
              sx={{ width: "31.47vw", height: "7.81vh" }}
              onChange={handleChange(index, "country")}
              menuItems={menuList}
            />
          </Box>
          <CustomButton
            variant="text"
            label={buttonLabel}
            className="button"
            disabled={handleDisable()}
          />
        </Box>
      ))}

      <CustomButton
        className="continuebutton"
        label={"Continue"}
        variant="contained"
        onClick={handleClick}
        disabled={isDisabled()}
      />
    </Wrapper>
  );
};
