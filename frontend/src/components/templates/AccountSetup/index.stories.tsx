import { Meta, StoryObj } from "@storybook/react";
import { AccountSetupTemplate } from ".";
import styled from "@emotion/styled";
import { TypographyComponent } from "../../atoms/Typography";
import theme from "../../../theme/theme";
import { TextFieldComponent } from "../../atoms/TextField";
import { CustomButton } from "../../atoms/Button";
import { Box } from "@mui/material";

const meta: Meta<typeof AccountSetupTemplate> = {
  title: "Templates/AccountSetup",
  component: AccountSetupTemplate,
};

export default meta;

type Story = StoryObj<typeof AccountSetupTemplate>;



const btnStyles = {
  textTransform: "inherit",
  backgroundColor: `${theme.palette.primaryColor[500]}`,
};

export const Default: Story = {
  args: {
    content: (
      <Box>
        <div>
          <TypographyComponent sx={theme.typography.heading1}>
            Enter the 6-digit code
          </TypographyComponent>
          <TypographyComponent
            sx={theme.typography.caption1}
            style={{ color: `${theme.palette.textColor.medemp}` }}
          >
            We sent it to +44020 7947 6330
          </TypographyComponent>
          <TextFieldComponent
            placeholder="Enter the code here"
            style={{ width: "512px", marginTop: "25px" }}
          ></TextFieldComponent>
        </div>
      </Box>
    ),
    button: <CustomButton label="Submit" sx={btnStyles} variant="contained" />,
  }
};
