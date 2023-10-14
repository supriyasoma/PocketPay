import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import styled from "@emotion/styled";

import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import "./index.css";

interface StepRecipientProps {
title?:string,
handleMyBusinessClick?:()=>void,
handleSomeoneElseClick?:()=>void,
handleBusinessOrCharityClick?:()=>void
};


const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "516px",
};

const iconStyle: React.CSSProperties = {
  width: "34px",
  height: "34px",
  color: theme.palette.primaryColor[500],
};

const Heading1 = styled(TypographyComponent)({
    ...theme.typography.heading1
});

const Body2 = styled(TypographyComponent)({
    ...theme.typography.body2
});
export const StepRecipient = (props:StepRecipientProps)=>{

  const {title,handleBusinessOrCharityClick,handleMyBusinessClick,handleSomeoneElseClick} = props;
    
    return (
      <div className="step-recipient-container" data-testid="step-recipient-container">
        <div className="step-recipient-page-title">
          <Heading1 className="step-recipient-page-title-content">{title}</Heading1>
        </div>

        <div className="recipient-options">
          <List sx={listStyle} className="recipient-options-list">
            <ListItem onClick={handleMyBusinessClick} className="recipient-options-list-item">
              <ListItemIcon className="recipient-options-list-item-icon">
                <WorkOutlineOutlinedIcon sx={iconStyle} />
              </ListItemIcon>
              <ListItemText className="recipient-options-list-item-text">
                    <Body2>My business</Body2>
              </ListItemText>
            </ListItem>
            <ListItem onClick={handleSomeoneElseClick} className="recipient-options-list-item">
              <ListItemIcon className="recipient-options-list-item-icon">
                <PersonOutlineOutlinedIcon sx={iconStyle} />
              </ListItemIcon>
              <ListItemText className="recipient-options-list-item-text">
                    <Body2 {...theme.typography.body2}>Someone else</Body2>
              </ListItemText>
            </ListItem>
            <ListItem onClick={handleBusinessOrCharityClick} className="recipient-options-list-item">
              <ListItemIcon className="recipient-options-list-item-icon">
                <PaidOutlinedIcon sx={iconStyle} />
              </ListItemIcon>
              <ListItemText className="recipient-options-list-item-text">
                    <Body2 {...theme.typography.body2}>Business or Charity</Body2>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </div>
    );
}