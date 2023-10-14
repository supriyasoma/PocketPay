import { useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import "./index.css";
import theme from "/src/theme/theme";
import { AvatarComponent } from "/src/components/atoms/Avatar";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { User } from "/src/models/user";
interface HeaderProps {
  userDetails?: User;
  handleYourDetailsClick?: () => void;
  handleSettingsClick?: () => void;
  handleHelpCenterClick?: () => void;
  handleLogoutClick?: () => void;
}

const notificationIconStyles = {
  float: "right",
  color: `${theme.palette.greyColor.icon02}`,
  paddingTop: "10px",
  paddingRight: "10px",
  height: "24px",
  width: "24px",
};

const UsernameTypography = styled(TypographyComponent)({
  fontSize: "14px",
  lineHeight: "21px",
  fontWeight: "400",
  textTransform: "capitalize",
});

const PopoverTitleComponent = styled(TypographyComponent)({
  fontSize: "17px",
  lineHeight: "24px",
  color: `${theme.palette.textColor.highemp}`,
});

const UniqueIdComponent = styled(TypographyComponent)({
  fontSize: "14px",
  color: `${theme.palette.textColor.lowemp}`,
  lineHeight: "21px",
  fontWeight: "400",
});

const AvatarStyles = {
  height: "28px",
  width: "28px",
  paddingRight: "10px",
};

export const HeaderComponent = (props: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const {
    userDetails,
    handleYourDetailsClick,
    handleSettingsClick,
    handleHelpCenterClick,
    handleLogoutClick,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const open = Boolean(anchorEl);
  return (
    <div className="header-container" data-testid="header">
      <div>
        <Button
          className="popover-btn"
          variant="text"
          data-testid="popver-btn"
          onClick={handleClick}
          sx={{ color: `${theme.palette.textColor.medemp}` }}
        >
          {
          
          userDetails?.profileImage ? <AvatarComponent src={userDetails?.profileImage} style={AvatarStyles} /> : <AvatarComponent letters={Array.from(userDetails?.firstName ?? "")[0]} style={AvatarStyles} />
          }
          <UsernameTypography variant="caption">
            {userDetails?.firstName + " " + userDetails?.lastName}
          </UsernameTypography>
        </Button>
        <Popover
          data-testid="popover-close"
          open={open}
          onClose={()=>setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 50, left:1500 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className="user-profile-popover"
        >
          <div className="popover-modal">
            <div className="popover-head">
              <PopoverTitleComponent variant="body2">
                {userDetails?.firstName + " " + userDetails?.lastName}
              </PopoverTitleComponent>
              <UniqueIdComponent variant="caption">
                {userDetails?.account}
              </UniqueIdComponent>
            </div>
            <div>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleYourDetailsClick} data-testid="Button" >
                    <ListItemIcon>
                      <PersonOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Your details" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleSettingsClick} data-testid="settings-btn">
                    <ListItemIcon>
                      <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleHelpCenterClick} data-testid="help-btn">
                    <ListItemIcon>
                      <HelpOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Help center" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogoutClick} data-testid="logout-btn">
                    <ListItemIcon>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </div>
        </Popover>

        <NotificationsNoneIcon sx={notificationIconStyles} />
      </div>
    </div>
  );
};
