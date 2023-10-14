import { Box, Stack, SxProps, Theme } from "@mui/material";
import styled from "@emotion/styled";

import Image from "/src/components/atoms/Image";
import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
interface SideBarItemProps {
  srcIcon?: string;
  alt?: string;
  title?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  sxTypoProps?: SxProps<Theme>;
  style?: React.CSSProperties;
}
const CustomBox = styled(Box)`
  &:hover {
    background-color:#F3F2F5;
  }
  minWidth="190px"
  minHeight="34px"
  display="inline-block"
  position="relative"
  top="20px"
  left="20px"
  gap={2}
`;

export const SideBarItem = ({
  srcIcon,
  sx,
  alt,
  title,
  sxTypoProps,
  onClick,
}: SideBarItemProps) => {
  return (
    <CustomBox onClick={onClick} data-testid="SidebarCard" sx={sx}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Image src={srcIcon} alt={alt} />
        <TypographyComponent
          children={title}
          style={{...theme.typography.body3}}
          sx={sxTypoProps}
        />
      </Stack>
    </CustomBox>
  );
};
