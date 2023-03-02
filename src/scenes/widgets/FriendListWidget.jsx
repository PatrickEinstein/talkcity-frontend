import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/widget-wrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const Friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Friends.map(({
          _id,
          firstName,
          lastName,
          occupation,
          picturePath
        }) => (
          <Friend
            key={_id}
            friendId={_id}
            name={`${firstName} ${lastName}`}
            subtitle={occupation}
            userPicturePath={picturePath}
          />)
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;

// {(posts) => Object.keys(posts).map(() => (
//   <PostWidget
//     key={_id}
//     postId={_id}
//     postUserId={userId}
//     name={`${firstName} ${lastName}`}
//     description={description}
//     location={location}
//     picturePath={picturePath}
//     userPicturePath={userPicturePath}
//     likes={likes}
//     comments={comments}
//   />)
// )}