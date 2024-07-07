import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined
  ,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserWidget from "../UserWidget";
import UserWidgetProfile from "./UserWidgetProfile";
import FriendListWidget from "./FriendListWidget";
import { BsChevronDoubleRight } from "react-icons/bs";
const LeftWidgetProfile = ({ user ,userId, picturePath }) => {
  console.log("user from left widget profile", user.role)
  const navigate = useNavigate();
console.log("userID from left widget profile",userId)
  return (
    <WidgetWrapper >
      <UserWidgetProfile user={user} userId={userId} onClick={() => navigate(`/profile/${user._id}`)} />     
      <Divider />
      <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
       Doctors<BsChevronDoubleRight style={{ fontSize: '1rem' ,paddingLeft: '0.5rem' }}  />
      </Typography>
      <Divider />
      <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
      Medical Records<BsChevronDoubleRight style={{ fontSize: '1rem' ,paddingLeft: '0.5rem' }}  />
      </Typography>
      <Divider />
      <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
      Messages<BsChevronDoubleRight style={{ fontSize: '1rem' ,paddingLeft: '0.5rem' }}  />
      </Typography>
      <Divider />
      <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
     My appointments<BsChevronDoubleRight style={{ fontSize: '1rem' ,paddingLeft: '0.5rem' }}  />
      </Typography>
      <Divider />
      <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
     Medicine<BsChevronDoubleRight style={{ fontSize: '1rem' ,paddingLeft: '0.5rem' }}  />
      </Typography>
       <Divider />
      <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
     Pharmacy <BsChevronDoubleRight style={{ fontSize: '1rem' ,paddingLeft: '0.5rem' }}  />
      </Typography>
      <Divider />
      <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
     Analysis lab<BsChevronDoubleRight style={{ fontSize: '1rem' ,paddingLeft: '0.5rem' }}  />
      </Typography>
      <Divider />
      <ManageAccountsOutlined />
      <FriendListWidget userId={userId} />
    </WidgetWrapper>
  );
};

export default LeftWidgetProfile;
