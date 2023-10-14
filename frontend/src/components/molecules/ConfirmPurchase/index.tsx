import { Box, Card, Divider, Stack, styled } from "@mui/material";
import theme from "/src/theme/theme";
import { CustomButton } from "/src/components/atoms/Button";
import Image from "/src/components/atoms/Image";
import { TypographyComponent } from "/src/components/atoms/Typography";

interface ConfirmPurchaseProps {
  srcBank?: string;
  srcCardType?: string;
  title?: string;
  line1?: [string, React.CSSProperties][];
  lines?: string[];
  buttonLabel: string;
  onClick?: () => void;
}

const StyledCard = styled(Card)({
  boxShadow: "0 0 0 0",
  padding: "32px 0",
  borderRadius: "16px",
  border: `1px solid ${theme.palette.greyColor.stroke}`,
});

const StyledCustomButton = styled(CustomButton)({
  fontVariant: "body2",
  background: theme.palette.primaryColor[500],
  color: theme.palette.structuralColor.white,
  borderRadius: "56px",
  textTransform: "none",
  padding: "16px 32px",
  ":hover":{
    background: theme.palette.primaryColor[500],
  color: theme.palette.structuralColor.white,
  }
});

export const TypographyComponentStyleMedEmp: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.caption1
};

export const TypographyComponentStyleHighEmp: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  textAlign: "center",
  ...theme.typography.body2
};

const StyledImage = styled(Image)({
  border: `1px solid ${theme.palette.greyColor.stroke}`,
  padding: "10px",
  borderRadius: "100px",
});

const ConfirmPurchase = ({
  srcBank,
  srcCardType,
  title,
  line1,
  lines,
  buttonLabel,
  onClick,
}: ConfirmPurchaseProps) => {
  return (
    <Box
      display="inline-block"
      minWidth={474}
      minHeight={395}
      data-testid="confirmPurchase"
    >
      <StyledCard>
        <Stack alignItems="center" spacing={4} width="100%">
          <Stack
            width="85%"
            direction="row"
            justifyContent="space-between"
            paddingX={8}
            paddingTop={2}
          >
            <StyledImage src={srcBank} />
            <Image src={srcCardType} />
          </Stack>
          <Divider sx={{ width: "100%" }} />
          <Stack
            direction="column"
            justifyContent="space-around"
            spacing={2}
            paddingX={20}
          >
            <TypographyComponent
              key={`${title}`}
              children={title}
              style={TypographyComponentStyleHighEmp}
            />

            <Box>
              {line1?.map((line, index) => {
                return (
                  <TypographyComponent
                    key={line[0]}
                    children={line[0]}
                    style={line[1]}
                    variant="caption1"
                  />
                );
              })}
            </Box>

            {lines?.map((line, index) => {
              return (
                <TypographyComponent
                  key={line}
                  children={line}
                  
                  style={TypographyComponentStyleMedEmp}
                />
              );
            })}
          </Stack>
          <Box paddingTop={4}>
            <StyledCustomButton
              label={buttonLabel}
              onClick={onClick}
              variant="contained"
            />
          </Box>
        </Stack>
      </StyledCard>
    </Box>
  );
};

export default ConfirmPurchase;
