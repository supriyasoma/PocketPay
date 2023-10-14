import { Box, Stack } from "@mui/material";
import Image from "/src/components/atoms/Image";
import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import './index.css';
import RightArrow from "/public/assets/images/Muiicons/chevron-right.svg";

interface BankCardProps {
  bankIcon?: string;
  bankName?: string;
  trailingIcon?: string;
  onClick?: () => void;
}

const BankCard = ({
  bankIcon,
  bankName,
  trailingIcon,
  onClick,
}: BankCardProps) => {
  return (
    <Box
      minWidth="516px"
      display="inline-block"
      onClick={onClick}
      data-testid="bankCard"
      className="bank-card-box"
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={4} alignItems="center">
          <Image src={bankIcon} />
          <TypographyComponent children={bankName} sx={{...theme.typography.caption1}}/>
        </Stack>
        <Image src={RightArrow} />
      </Stack>
    </Box>
  );
};

export default BankCard;
