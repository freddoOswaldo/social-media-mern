import { useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BoxFlex } from "styled-components/Layout";
import { CustomH5 } from "styled-components/Text";
import constants from "utils/constants";

const FriendListWidget = () => {
  const {
    user: { friends },
  } = useSelector(({ user }) => user);

  const {
    palette: { neutral },
  } = useTheme();

  const { dark } = neutral;

  if (!friends || friends.length === 0) return null;

  return (
    <WidgetWrapper>
      <BoxFlex mb="1.5rem">
        <CustomH5 color={dark} fontWeight="500">
          {constants.FRIEND_LIST_TITLE}
        </CustomH5>
      </BoxFlex>
      <BoxFlex isVertical gap="1.5rem">
        {friends.map(
          ({ _id, firstName, lastName, occupation, picturePath }) => (
            <Friend
              key={_id}
              friendId={_id}
              name={`${firstName} ${lastName}`}
              subtitle={occupation}
              userPicturePath={picturePath}
            />
          )
        )}
      </BoxFlex>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
