import { useTheme } from "@mui/material";
import { string } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BoxFlex } from "styled-components/Layout";
import UserImage from "./UserImage";
import { CustomH5, CustomSpan } from "styled-components/Text";
import IconButton from "./Navbar/IconButton";
import { patchFriend } from "redux-client/states";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: { _id, friends },
  } = useSelector(({ user }) => user);

  const {
    palette: { primary, neutral },
  } = useTheme();

  const { light, dark } = primary;

  const { main, medium } = neutral;

  const isFriend = friends
    ? friends.find(({ _id: friend }) => friend === friendId)
    : false;

  return (
    <BoxFlex justifyContent="space-between">
      <BoxFlex justifyContent="space-between" gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <BoxFlex
          isVertical
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <CustomH5 color={main} fontWeight="500" colorHover={light}>
            {name}
          </CustomH5>
          <CustomSpan color={medium} fontSize="0.75rem">
            {subtitle}
          </CustomSpan>
        </BoxFlex>
      </BoxFlex>
      {_id !== friendId && (
        <IconButton
          backgroundColor={light}
          p="0.6rem"
          handleClick={() =>
            dispatch(
              patchFriend({
                userId: _id,
                friendId,
              })
            )
          }
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: dark }} />
          ) : (
            <PersonAddOutlined sx={{ color: dark }} />
          )}
        </IconButton>
      )}
    </BoxFlex>
  );
};

Friend.propTypes = {
  friendId: string.isRequired,
  name: string.isRequired,
  subtitle: string.isRequired,
  userPicturePath: string.isRequired,
};

export default Friend;
