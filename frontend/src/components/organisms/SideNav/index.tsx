import React, { useState } from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import './index.css';
import { TypographyComponent } from '/src/components/atoms/Typography';
import theme from '/src/theme/theme';
import { AvatarComponent } from '/src/components/atoms/Avatar';
import IndFlag from '/public/assets/images/flags/india.svg';
import AustraliaFlag from '/public/assets/images/flags/australia.svg';

interface SideNavProps {
    brand:BrandProps,
    menuList:MenuItem[],
    showMenu?:number,
    showBalances?:number
}

interface BrandProps{
    height?:string,
    width?:string,
    src?:string
}

interface MenuItem { 
name?:string,
icon?:React.ReactElement,
chip?:React.ReactElement,
navigateTo?:string,
}
const activeMenuLabelStyle = {
  color: theme.palette.primaryColor[500]
};
const menuLableStyle = {
    fontSize:"14px",
    lineHeight:"21px",
    fontWeight:"400",
    color:`${theme.palette.textColor.medemp}`,
    ...theme.typography.caption1
};

const flagStyle = {
    height:"24px",
    width:"24px"
}

const balancesMenu:MenuItem[] =[ 
    {
    name:"10,000.00 INR",
    icon:<AvatarComponent src={IndFlag} style={flagStyle} />,
    navigateTo:""
    },
    {
        name:"192.00 USD",
        icon:<AvatarComponent src={AustraliaFlag} style={flagStyle} />,
        navigateTo:""
    },
    {
        name:"Open balance",
        icon: <AddOutlinedIcon />,
        navigateTo:""
    },
]

export const SideNavComponent = (props:SideNavProps)=>{

    const [activeMenu, setActiveMenu] = useState(props.menuList[0]?.navigateTo ?? "");

    const { brand , menuList ,showMenu, showBalances} = props;

    const handleMenuClick = (name:any)=>{
        setActiveMenu(name);
    }
    
    return (
      <div className="sidenav-conatiner" data-testid="sidenav">
        <div className="logo-container">
          <img src={brand?.src} width={brand.width} height={brand.height} />
        </div>

        <div className="menu-list">
          {showMenu ? (
            <div>
              <List>
                {menuList.map((menu: MenuItem, index) => {
                  return (
                    <ListItem
                      key={menu.name}
                      disablePadding
                      onClick={() => handleMenuClick(menu?.navigateTo)}
                    >
                      <ListItemButton>
                        <ListItemIcon
                          sx={{
                            color:
                              activeMenu == menu?.navigateTo
                                ? `${theme.palette.primaryColor[500]}`
                                : `${theme.palette.textColor.medemp}`,
                          }}
                        >
                          {menu?.icon}
                        </ListItemIcon>
                        <ListItemText>
                          <TypographyComponent
                           sx={{
                            ...menuLableStyle,
                            ...(activeMenu === menu?.navigateTo
                              ? activeMenuLabelStyle
                              : menuLableStyle),
                          }}
                          >
                            {menu.name}
                          </TypographyComponent>
                        </ListItemText>
                        <ListItemText sx={{ ml:0 }}>
                          {menu?.chip}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              <Divider sx={{ padding: "0" }} />
            </div>
          ) : null  }

        {
            showBalances ? (
                <div>
                <List subheader={<ListSubheader>Balances</ListSubheader>}>
                {
                    balancesMenu.map((menu,index)=>{
                        return (
                            <ListItem disablePadding key={menu?.name}>
                            <ListItemButton>
                              <ListItemIcon>
                                {menu?.icon}
                              </ListItemIcon>
                              <ListItemText>
                                <TypographyComponent sx={menuLableStyle} >
                                  {menu?.name}
                                </TypographyComponent>
                              </ListItemText>
                              
                            </ListItemButton>
                          </ListItem>
                        );
                    })
                }
              </List>
    
              <Divider />
              <List subheader={<ListSubheader>Jars</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton>
                
                <ListItemIcon>
                  <AddOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  <TypographyComponent sx={menuLableStyle} >
                    Open a jar
                  </TypographyComponent>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
              </div>
            ):null
        }
        </div>
      </div>
    );
}
