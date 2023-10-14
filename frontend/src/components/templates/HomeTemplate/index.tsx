import { Box, styled } from "@mui/material";
import theme from "/src/theme/theme";

interface HomeTemplateProps {
  sidebar?: React.ReactElement;
  header?: React.ReactElement;
  content?: React.ReactElement;
}
export const HomeTemplate = ({
  sidebar,
  header,
  content
}: HomeTemplateProps) => {
  return (
    <Wrapper>
      <Box minWidth="16.8vw">{sidebar}</Box>
      <InnerWrapper minWidth="82vw" height="7.8vh">
      <Box>
        {header}
      </Box>
      <Box>
        {content}
      </Box>
      </InnerWrapper>
    </Wrapper>
  );
};
const Wrapper = styled(Box)({
  width: "99vw",
  height: "98vh",
  display: "flex",
  flexDirection: "row",
  background: theme.palette.structuralColor.background,
});
const InnerWrapper=styled(Box)({
  flexDirection:"row"
});
