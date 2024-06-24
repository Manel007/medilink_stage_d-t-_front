import { Box, useMediaQuery } from "@mui/material";
import CustomLineChart from "components/Chart";

import Question from "components/Question";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/Profile/FriendListWidget";
import LeftWidget from "scenes/widgets/LeftWidgetHome";
import LeftWidgetProfile from "scenes/widgets/Profile/LeftWidgetProfile";
import MyPostWidget from "scenes/widgets/Posts/MyPostWidget";
import PostsWidget from "scenes/widgets/Posts/PostsWidget";
import ProfileWidget from "scenes/widgets/Profile/ProfileWidget";
import UserWidget from "scenes/widgets/UserWidget";
import UserWidgetProfile from "scenes/widgets/Profile/UserWidgetProfile";
import { Calendar, Spin, theme } from 'antd';
import Chart from "components/Chart";
import 'bootstrap/dist/css/bootstrap.min.css';

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};
const ProfilePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
console.log("lalalalalala",apiUrl)
const[user,setUser]=useState("")
 
const {userId}=useParams()

  console.log("id ProfilePage", userId)
  console.log(" ProfilePage user", user)
  const token = useSelector((state) => state.token);
  const { role } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isLoading=useSelector((state)=> state.isLoading)
const isPatient=user.role==="patient"

  const data = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 90 },
    { name: 'Mar', value: 120 },
    { name: 'Apr', value: 70 },
    { name: 'May', value: 133 },
  ];

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const getUser=async(Id)=>
    {
     
const response =await fetch(`${apiUrl}/users/${userId}`,
{
  method: "GET",
 
})
const data = await response.json();
    setUser(data);
    }
    useEffect(()=>{
      getUser()
    },[])
  const render=()=>{

  return (
    <Box  style={{ backgroundColor: '#B0C4DE' }} >
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>

      <Navbar />
<div  className="bg-gray-800">
      <div className="container position-relative">
  <div className="row">
    <div className="col-lg-4 col-md-6 col-sm-12 p-2 d-flex gap-1">
      <LeftWidgetProfile 
        user={user} 
        userId={userId} 
        picturePath={user.picturePath}   
        style={{ position: 'absolute', left: '30px' }} 
      />
    </div>
    <div className="col-lg-8 col-md-6 col-sm-20 p-2 d-flex ">
      <ProfileWidget 
        user={user} 
        userId={userId}
      />
    </div>
  </div>
</div>


     



      <Box
        width="100%"
        padding="2rem 1%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1rem"
        justifyContent="center"
      >
         <Box
          flexBasis={isNonMobileScreens ? "30%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
      </Box>
     
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         
      
         
      {isPatient&&
        <Chart data={data} xAxisKey="name" yAxisKey="value" yAxisLabel="blood glucose level,"  />
      }
        <PostsWidget userId={userId} token={token} isProfile={true} />
        </Box>
      
      
        <Box
          flexBasis={isNonMobileScreens ? "20%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         <div style={wrapperStyle}>
         {isPatient&&
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    }
    </div>
      
      </Box>
      </Box>
      
      
      
     
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    </Box>

  );
}
  return (
    <>
      {isLoading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
    <Spin />

  </div>}
    {render()}
  
  </>
  )
};

export default ProfilePage;
