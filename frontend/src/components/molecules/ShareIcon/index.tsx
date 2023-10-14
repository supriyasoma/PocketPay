import { Box, Stack } from "@mui/material";

import theme from "/src/theme/theme";
import Image from "/src/components/atoms/Image";
import { TypographyComponent } from "/src/components/atoms/Typography";

interface ShareIconProps {
  srcIcon?: string;
  title?: string;
  onClick?: () => void;
}

const ImageStyles: React.CSSProperties = {
  border: `1px solid ${theme.palette.primaryColor[500]}`,
  borderRadius: "1000px",
  padding: "16px",
};

const TypographyStyles: React.CSSProperties = {
  color: theme.palette.primaryColor[500],
  paddingTop: "12px",
  ...theme.typography.body3
};

const ShareIcon = ({ srcIcon, title, onClick }: ShareIconProps) => {
  return (
    <Box
      minWidth="60px"
      minHeight="96px"
      display="inline-block"
      onClick={onClick}
      data-testid="shareIcon"
    >
      <Stack alignItems="center">
        <Box>
          <Image src={srcIcon} style={ImageStyles} />
        </Box>
        <TypographyComponent
          children={title}
          style={TypographyStyles}
        />
      </Stack>
    </Box>
  );
};

export default ShareIcon;
