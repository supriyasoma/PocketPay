import {
  Box,
  Paper,
  Stack,
  SxProps,
  TextField,
  Theme,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { HTMLAttributes, useState } from "react";

import theme from "/src/theme/theme";
import {
  searchBarFooterText1,
  searchBarFooterText2,
} from "/src/utils/constants";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { Business } from "/src/models/business";
import { setUserDetails } from "/src/store/actions";
import { getBusinessDetails } from "/src/services";

interface SearchBarProps {
  data: Business[];
  showFooter: boolean;
  placeholderTextField: string;
  trailingIcon?: React.ReactNode;
  onChange?: (business: Business | null) => void;
}

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: Business) => option.name ?? "",
});

const customPaperStyles: React.CSSProperties = {
  border: `1px solid ${theme.palette.greyColor.stroke}`,
  borderTop: "none",
};

const customAutocompleteSx: SxProps<Theme> = {
  width: "100%",
  "& .MuiAutocomplete-popupIndicator": { transform: "none" },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.greyColor.stroke}`,
  },
  boxShadow: "none",
};

const CustomPaper = (props: HTMLAttributes<HTMLElement> | undefined) => {
  return (
    <Paper
      data-testid="custom-paper"
      style={customPaperStyles}
      sx={{
        boxShadow: "none",
      }}
      {...props}
    ></Paper>
  );
};

export const SearchBar = ({
  data,
  showFooter,
  placeholderTextField: textFieldLabel,
  trailingIcon,
  onChange,
}: SearchBarProps) => {
  const TextFieldCustom = styled(TextField)`
    fieldset {
      border-radius: 8px 8px 0 0;
      border: 0px;
      padding: 10px;
    }
    & label.Mui-focused {
      color: ${theme.palette.greyColor.stroke};
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${theme.palette.greyColor.stroke};
      }
    }
  `;
  const [value, setValue] = useState<Business | undefined>(undefined);
  const dispatch = useDispatch();

  const handleOnChange = (event: React.ChangeEvent<{}>, newValue: Business) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue ?? null);
      getBusinessDetails(newValue.id).then(res=>{
        if(res.data){
            dispatch(setUserDetails({business:res.data,businessId:newValue.id}));
        }
      });
    }
  };
  return (
    <Box
      width={"100%"}
      height={60}
      display="inline-block"
      data-testid="searchBar"
    >
      <Autocomplete
        data-testid="auto-completed"
        disablePortal
        disableClearable
        options={data}
        sx={customAutocompleteSx}
        value={value}
        onChange={handleOnChange}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextFieldCustom
            {...params}
            placeholder={textFieldLabel}
            data-testid="textFieldInSearchBar"
          />
        )}
        PaperComponent={CustomPaper}
        popupIcon={trailingIcon}
        noOptionsText={
          showFooter ? (
            <Stack
              direction={"row"}
              borderTop={theme.palette.grey[100]}
              alignItems={"center"}
            >
              <TypographyComponent
                sx={{
                  color: theme.palette.textColor.medemp,
                  ...theme.typography.body2,
                }}
              >
                {searchBarFooterText1}
              </TypographyComponent>
              <TypographyComponent
                sx={{
                  color: theme.palette.primaryColor[500],
                  ...theme.typography.body2,
                }}
              >
                {searchBarFooterText2}
              </TypographyComponent>
            </Stack>
          ) : null
        }
      />
    </Box>
  );
};
