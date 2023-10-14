import { Box, Card, Stack } from "@mui/material";

import theme from "/src/theme/theme";
import Image from "/src/components/atoms/Image";
import { TypographyComponent } from "/src/components/atoms/Typography";

interface BusinessAccountProps {
  srcIcon?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  className?:string;
}

const AccountCard = ({
  srcIcon,
  title,
  subtitle,
  onClick,
  className
}: BusinessAccountProps) => {
  return (
    <Box
      onClick={onClick}
      display="inline-block"
      minHeight={88}
      minWidth={516}
      data-testid="accountCard"
    >
      <Card
      className={className}
        sx={{
          borderRadius: 2,
          paddingX: 5,
          paddingY: 5,
          boxShadow: 0,
          border: `1px solid ${theme.palette.greyColor.stroke}`,
          width:"516px",
          cursor:"pointer",
          ':hover':{
            backgroundColor: theme.palette.structuralColor.hovercolor
          }
        }}
      >
        <Stack direction="row" spacing={3} alignItems="start">
          <Image src={srcIcon} />
          <Stack direction="column">
            <TypographyComponent
              children={title}
              style={{ color: theme.palette.textColor.highemp ,...theme.typography.body2}}
            />
            <TypographyComponent
              children={subtitle}
              style={{ color: theme.palette.textColor.lowemp ,...theme.typography.caption1}}
            />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default AccountCard;
