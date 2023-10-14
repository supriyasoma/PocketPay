import styled from "@emotion/styled";
import { Box, Modal } from "@mui/material";
import theme from "/src/theme/theme";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { CustomButton } from "/src/components/atoms/Button";
export interface PopperProps {
  open: boolean,
  onClose?: () => void,
  onCancel?: () => void,
  className?:string
}
const ModalDiv = styled(Box)({
  width: "564px",
  height: "335px",
  display: "flex",
  flexDirection: "column",
  marginLeft: "401px",
  marginTop: "216px",
  borderRadius: "16px",
  backgroundColor: theme.palette.structuralColor.white,
  borderColor: theme.palette.structuralColor.white,
});
const TypographyComponentDiv = styled(TypographyComponent)({
  color: theme.palette.textColor.highemp,
  ...theme.typography.heading1,
  paddingTop: "52px",
  paddingBottom: "26px",
  paddingLeft: "199px",
});
const TypographyComponentDiv2 = styled(TypographyComponent)({
  color: theme.palette.textColor.medemp,
  ...theme.typography.body1,
  paddingBottom: "105px",
  paddingLeft: "129px",
});
const ButtonDiv = styled(Box)({
  display: "flex",
  gap: "20px",
  flexDirection: "row",
  paddingLeft: "137px",
});
const ButtonStyle = styled(CustomButton)({
  width: "135px",
  height: "6.29vh",
  borderRadius: "56px",
  backgroundColor: theme.palette.primaryColor[500],
});
const ButtonStyled = styled(CustomButton)({
  color: theme.palette.primaryColor[500],
  width: "135px",
  height: "6.29vh",
  borderRadius: "56px",
  backgroundColor: theme.palette.structuralColor.white,
});
export const Popper = ({ open, onClose, onCancel,className }: PopperProps) => {
  return (
    <Modal open={open} onClose={onClose} className={className}>
      <ModalDiv>
        <TypographyComponentDiv>Are you sure ?</TypographyComponentDiv>
        <TypographyComponentDiv2>
          You want to cancel this transfer
        </TypographyComponentDiv2>
        <ButtonDiv>
          <ButtonStyle
            data-testid="confirm-button"
            label={"Yes"}
            variant="contained"
            onClick={onCancel}
          />
          <ButtonStyled
            data-testid="cancel-button"
            label={"No"}
            variant="contained"
            onClick={onClose}
          />
        </ButtonDiv>
      </ModalDiv>
    </Modal>
  );
};
