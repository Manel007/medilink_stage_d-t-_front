import { Box, Typography, useTheme, Link } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const apiUrl = process.env.REACT_APP_API_URL;
  return (
    <WidgetWrapper maxWidth={"400px"} maxHeight={"250px"} >
    <div style={{ padding: '0.5rem', maxWidth: '100%'}}>
      <FlexBetween gap={"0.5rem"} >
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsorisé par :
        </Typography>
        <Typography color={main} variant="h5" fontWeight="500">Lloyd Assurance</Typography>
      </FlexBetween>
      <FlexBetween position={"relative" } left={70}>
      <img
        width="150px"
        height="auto"
        alt="advert"
        src={`http://localhost:3005/assets/lloydd.jpg`} 
        style={{ borderRadius: "0.75rem", margin: "1rem 0" } }
      />
      </FlexBetween>
      <FlexBetween position={"relative" } left={70}>
      <Typography color={medium}>
      <Link href="https://www.lloyd.com.tn" target="_blank" rel="noopener noreferrer">
        https://www.lloyd.com.tn
      </Link>
      </Typography>
      </FlexBetween>
 
    </div>
  </WidgetWrapper>
  
  );
};

export default AdvertWidget;
