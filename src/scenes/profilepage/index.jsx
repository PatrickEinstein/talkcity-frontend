import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidgets";
import UserWidget from "scenes/widgets/userwidget";
import { useCallback } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const { _id, picturePath, ...otherProps } = loggedInUser;
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const isNonMobileScreens = useMediaQuery("(min-width:600px)");

  const getuser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log(data);
    // setUser(data);
    console.log(loggedInUser);
    setUser(loggedInUser);
  };
  //${userId}
  useEffect(() => {
    getuser();
    if (!loggedInUser) {
      alert("no loggedin user");
    } else {
      alert("logged in user exists");
    }
  }, []); //eslint-disabled-line react hooks

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* first widget for user */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <Box m="2rem 0" />
                <FriendListWidget userId={friends._id} />
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* second widget for posts*/}
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <Box m="2rem 0" />
          <PostsWidget /*userId={posts._id} */ isProfile />
        </Box>

        {/* third widget for adverts will only show on desktop*/}
      </Box>
    </Box>
  );
};

export default ProfilePage;
