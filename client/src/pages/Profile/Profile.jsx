import { CircularProgress } from "@mui/material";
import { Navbar } from "components";
import useMediaQuery from "hooks/useMediaQuery";
import FriendListWidget from "pages/Home/components/FriendListWidget";
import MyPostWidget from "pages/Home/components/MyPostWidget";
import PostsWidget from "pages/Home/components/PostsWidget";
import UserWidget from "pages/Home/components/UserWidget";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanProfile, getUser } from "redux-client/states";
import { BoxFlex } from "styled-components/Layout";
import constants from "utils/constants";

const Profile = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(constants.DESKTOP_MEDIA_QUERY);
  const { userId } = useParams();

  const { profile, fetchingProfile } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getUser(userId));
    return () => dispatch(cleanProfile());
  }, []);

  if (fetchingProfile)
    return (
      <BoxFlex
        isVertical
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </BoxFlex>
    );

  if (!profile) return null;

  return (
    <BoxFlex
      width="100%"
      padding="2rem 6%"
      isVertical={!isDesktop}
      gap="2rem"
      justifyContent="center"
    >
      <BoxFlex isVertical flexBasis={isDesktop ? "26%" : null}>
        <UserWidget fromProfile />
        <BoxFlex isVertical margin="2rem 0" />
        <FriendListWidget userId={userId} />
      </BoxFlex>
      <BoxFlex
        isVertical
        flexBasis={isDesktop ? "42%" : null}
        mt={isDesktop ? null : "2rem"}
      >
        <MyPostWidget fromProfile />
        <BoxFlex isVertical margin="2rem 0" />
        <PostsWidget fromProfile />
      </BoxFlex>
    </BoxFlex>
  );
};

export default Profile;
