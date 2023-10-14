import styled from "@emotion/styled";
import { Box, Card, Stack, SxProps, Theme } from "@mui/material";

import { TextFieldComponent } from "/src/components/atoms/TextField";
import { CustomButton } from "/src/components/atoms/Button";
import theme from "/src/theme/theme";
import { TypographyComponent } from "/src/components/atoms/Typography";

export interface TextFieldData {
  id: string;
  label: string;
  disabled: boolean;
  value: string;
}
export interface ReviewDetailsProps {
  handleChange: (id: string) => void;
  textFieldData: TextFieldData[];
  buttonlabelone: string;
  buttonlabeltwo: string;
  heading?: string;
  handleCancel?: () => void;
  handleSave?: () => void;
}
const StyleBox = styled(Box)({
  minWidth: "516px",
  minHeight: "475px",
  display: "inline-block",
});
const StyleCard = styled(Card)({
  paddingBottom: 25,
  boxShadow: "none",
  border: "none",
  backgroungColor: "transperent",
  paddingLeft: 25,
  paddingRight: 25,
});
const Typoone: React.CSSProperties = {
  color: theme.palette.textColor.lowemp,
};
const SaveButton = styled(CustomButton)({
  background: `${theme.palette.primaryColor[500]}`,
  color: `${theme.palette.structuralColor.white}`,
  width: "135px",
  height: "58px",
  borderRadius: "58px",
  textTransform: "none",
  boxShadow: "0",
});
const CancelButton = styled(CustomButton)({
  color: `${theme.palette.primaryColor[500]}`,
  background: `${theme.palette.structuralColor.white}`,
  width: "135px",
  height: "58px",
  borderRadius: "58px",
  textTransform: "none",
  boxShadow: "0",
});
const TextfieldStyle: SxProps<Theme> = {
  width: "75%",
  marginTop: 4,
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: theme.palette.greyColor.stroke,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.greyColor.stroke,
  },
  "& .MuiInputBase-input": {
    fontSize: "17px",
    lineHeight: "24px",
  },
};
export const ReviewTransferDetails = ({
  handleChange,
  textFieldData,
  buttonlabelone,
  buttonlabeltwo,
  heading,
  handleCancel,
  handleSave,
}: ReviewDetailsProps) => {
  return (
    <StyleBox>
      <StyleCard>
        <Stack spacing={3}>
          <TypographyComponent
            children={heading}
            variant="caption1"
            style={Typoone}
          />
          <Stack spacing={10}>
            <Stack spacing={5} justifyContent="flex-start">
              {textFieldData.map((item, index) => (
                <TextFieldComponent
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  inputProps={{
                    disabled: item.disabled,
                  }}
                  onChange={() => handleChange(item.id)}
                  value={item.value}
                  style={TextfieldStyle}
                />
              ))}
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={4}>
              <CancelButton
                label={buttonlabelone}
                variant="contained"
                onClick={handleCancel}
              />
              <SaveButton
                label={buttonlabeltwo}
                variant="contained"
                onClick={handleSave}
              />
            </Stack>
          </Stack>
        </Stack>
      </StyleCard>
    </StyleBox>
  );
};
