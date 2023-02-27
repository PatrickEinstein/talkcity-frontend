import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/userwidget";
import { useSelector } from "react-redux";
import MyPostWidget from "scenes/widgets/MyPostWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* first widget */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* second widget */}
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath ={picturePath} />
          {/* <UserWidget userId ={_id} picturepath={picturePath}/> */}
        </Box>

        {/* third widget will only show on desktop*/}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <UserWidget userId ={_id} picturepath={picturePath}/> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
