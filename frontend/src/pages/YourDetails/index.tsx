import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { red } from "@mui/material/colors";
import { Box, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { CustomButton } from "/src/components/atoms/Button";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { AccountSetupTemplate } from "/src/components/templates/AccountSetup";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import theme from "/src/theme/theme";
import "./index.css";
import { Header } from "/src/components/molecules/header";
import DropDown from "/src/components/molecules/DropDown";
import { Store } from "/src/store/types";
import { activeStepBusiness, setUserDetails } from "/src/store/actions";
import { Country } from "/src/models/country";
import { getMyData, signup } from "/src/services";
import { User } from "/src/models/user";
const continueBtnStyle= {
  width: "135px",
  padding: "16px 30px",
  borderRadius: "56px",
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
};

export const YourDetailsPage = () => {
  const navigate = useNavigate();
  const businessSteps = useSelector((state:Store)=>state.businessSteps);
  const userDetails = useSelector((state:Store)=>state.user);
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [menuList, setMenuList] = useState<any[]>([]);
  const [error,setError] = useState("");
  const [user,setUser] = useState<User>();
  const [disableContinue, setDisableContinue] = useState(true);

  useEffect(()=>{
    if(!active){
      dispatch(activeStepBusiness(3));
      setActive(true);
    }
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
  });

  
  const handleClick = () => {
    if(!user || !user?.firstName || !user?.lastName || !user?.dob || !user?.countryId || !user?.homeAddress){
      setError("Please fill all the fields!");
     
    }
    else{
     dispatch(setUserDetails({...userDetails,...user}));
      let newDob = formatDateReverse(user.dob);
    let body = {...userDetails,...user,dob:newDob};
     signup(body).then((res)=>{
      if(res.status==200){  
        sessionStorage.setItem("email",userDetails?.email ?? "");
        navigate("/dashboard");
      }
     
     }); 
    }
  };
  const setFirstName = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,firstName:e.target.value});
  }
  const setLastName = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,lastName:e.target.value});
  }
  const setDob = (val:string)=>{
    setUser({...user,dob:val});
  }
  const setCountry = (e:SelectChangeEvent)=>{
    setUser({...user,countryId:parseInt(e.target.value)});
  }
  const setAddress = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,homeAddress:e.target.value});
  }

  const handleDisable = () => {
    const isDisabled =
    !user?.firstName ||
    !user?.lastName ||
    !user?.dob ||
    user?.countryId === undefined || // Use strict equality check (===) to compare with undefined
    user?.countryId === 0 || // Use strict equality check (===) to compare with 0
    !user?.homeAddress;
  return isDisabled;
   
  };

  const CountryDropdownProps = {
    sx: { width: "100%", fontSize: "17px" },
    label: "Country of residence",
    placeholder: "Country of residence",
    menuItems: menuList ? menuList:[],
    onChange:setCountry
  };

  const formatDate = (date:Date)=>{
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',

  }).split('/').join('-');
  setDob(formattedDate);
  }

 const formatDateReverse = (date:string)=>{
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


  const accountTemplateProps = {
    content: (
      <div
        className="your-details-page-body"
        data-testid="your-details-page-body"
      >
        <TypographyComponent
          className="your-details-page-title"
          sx={{
            ...theme.typography.heading1,
            color: theme.palette.textColor.highemp,
          }}
        >
          Fill in your details
        </TypographyComponent>

        <TypographyComponent
          className="your-details-page-title-caption"
          sx={{
            ...theme.typography.caption1,
            color: theme.palette.textColor.medemp,
          }}
        >
          Since you’re opening the account, we need to know a bit more about
          you.
        </TypographyComponent>

        <div className="your-details-form">
          <TextFieldComponent
            placeholder="First name"
            label="First name"
            style={{ width: "100%" }}
            onChange={setFirstName}
          />
          <TextFieldComponent
            placeholder="Last name"
            label="Last name"
            style={{ width: "100%" }}
            onChange={setLastName}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date of birth"
                className="date-of-birth"
                format="DD/MM/YYYY"
                sx={{ width: "100%" }}
                onChange={(val:any,date)=>{formatDate(new Date(val));}}
              />
            </DemoContainer>
          </LocalizationProvider>

          <DropDown {...CountryDropdownProps} />

          <TextFieldComponent
            placeholder="Home address"
            label="Home address"
            style={{ width: "100%" }}
            onChange={setAddress}
          />
        </div>
      </div>
    ),

    button: (
      <div>
        <TypographyComponent sx={{float:'left',color:red[500]}}>{error}</TypographyComponent>
<CustomButton
        label="Continue"
        variant="contained"
        sx={continueBtnStyle}
        onClick={handleClick}
        disabled={handleDisable()}
      />
      </div>
      
    ),
  };

  return (
    <Box>
      <LoginSignup
        head={
          <Header
            steps={businessSteps ? businessSteps:[]}
          />
        }
        children={
          <div className="your-details-page-template">
            <TypographyComponent variant="caption">{error}</TypographyComponent>
            <AccountSetupTemplate {...accountTemplateProps} />
          </div>
        }
      />
    </Box>
  );
};
