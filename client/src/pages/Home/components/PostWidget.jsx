import { shape, string, arrayOf, any } from "prop-types";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { Divider, IconButton } from "components";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchLike } from "redux-client/states";
import { BoxFlex } from "styled-components/Layout";
import { CustomSpan } from "styled-components/Text";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  const {
    user: { _id: loggedInUserId },
  } = useSelector(({ user }) => user);

  const isLiked = Boolean(likes[loggedInUserId]);

  const likeCount = Object.keys(likes).length;

  const {
    palette: { primary, neutral },
  } = useTheme();

  const { main: mainPrimary } = primary;

  const { main, dark } = neutral;

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <BoxFlex justifyContent="space-between" mt="1rem">
        <CustomSpan color={main}>{description}</CustomSpan>
      </BoxFlex>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          // eslint-disable-next-line no-undef
          src={`${process.env.REACT_APP_URL_BACKEND}/assets/${picturePath}`}
        />
      )}
      <BoxFlex justifyContent="space-between" mt="0.5rem">
        <BoxFlex justifyContent="space-between" gap="1rem">
          <BoxFlex
            alignItems="center"
            justifyContent="space-between"
            gap="0.3rem"
          >
            <IconButton
              handleClick={() =>
                dispatch(patchLike({ postId, userId: loggedInUserId }))
              }
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: mainPrimary }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: dark }} />
              )}
            </IconButton>
            <CustomSpan>{likeCount}</CustomSpan>
          </BoxFlex>
          <BoxFlex
            alignItems="center"
            justifyContent="space-between"
            gap="0.3rem"
          >
            <IconButton handleClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined sx={{ color: dark }} />
            </IconButton>
            <CustomSpan>{comments.length}</CustomSpan>
          </BoxFlex>
        </BoxFlex>
        <IconButton>
          <ShareOutlined sx={{ color: dark }} />
        </IconButton>
      </BoxFlex>
      {isComments && (
        <BoxFlex isVertical mt="0.5rem">
          {comments.map((comment, i) => (
            <BoxFlex isVertical key={`${name}-${i}`}>
              {i === 0 && <Divider />}
              <BoxFlex justifyContent="space-between" pl="1rem" m="0.5rem 0">
                <CustomSpan color={main}>{comment}</CustomSpan>
              </BoxFlex>
              <Divider />
            </BoxFlex>
          ))}
        </BoxFlex>
      )}
    </WidgetWrapper>
  );
};

PostWidget.propTypes = {
  comments: arrayOf(any),
  description: string,
  likes: shape({}),
  location: string,
  name: string,
  picturePath: string,
  postId: string,
  postUserId: string,
  userPicturePath: string,
};

PostWidget.dafaultProps = {
  comments: [],
  description: "",
  likes: {},
  location: "",
  name: "",
  picturePath: "",
  postId: "",
  postUserId: "",
  userPicturePath: "",
};

export default PostWidget;
