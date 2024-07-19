import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ScienceIcon from '@mui/icons-material/Science';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Calendar, Spin, theme } from 'antd';
import Chart from "components/Chart";
import ProfileWidget from "scenes/widgets/Profile/ProfileWidget";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfilePage from "./index";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <CssBaseline />
        <Drawer variant="permanent" open={true}>
          <DrawerHeader>
           
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Doctors', icon: <LocalHospitalIcon /> },
              { text: 'Medical Records', icon: <AssignmentIcon /> },
              { text: 'Messages', icon: <MessageIcon /> },
              { text: 'My Appointments', icon: <EventAvailableIcon /> },
              { text: 'Medicine', icon: <MedicationIcon /> },
              { text: 'Pharmacy', icon: <LocalPharmacyIcon /> },
              { text: 'Analysis Lab', icon: <ScienceIcon /> },
              { text: 'Medical Questions', icon: <ChatIcon /> },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            {/* Add a divider for spacing */}
            <Divider sx={{ my: 2 }} />
            {/* Add Privacy Policy and Settings */}
            {[{ text: 'Help Center', icon: <HelpOutlineIcon /> },
              { text: 'Privacy Policy', icon: <PrivacyTipIcon /> },
              { text: 'Settings', icon: <SettingsIcon /> },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Your main content goes here */}
      </Box>
    </Box>
  );
}
