import { Navbar } from "components";
import UserWidget from "./components/UserWidget";
import useMediaQuery from "hooks/useMediaQuery";
import constants from "utils/constants";
import { BoxFlex } from "styled-components/Layout";
import MyPostWidget from "./components/MyPostWidget";
import PostsWidget from "./components/PostsWidget";
import AdvertWidget from "./components/AdvertWidget";
import FriendListWidget from "./components/FriendListWidget";

const Home = () => {
  const isDesktop = useMediaQuery(constants.DESKTOP_MEDIA_QUERY);
  return (
    <BoxFlex isVertical>
      <Navbar />
      <BoxFlex
        width="100%"
        padding="2rem 6%"
        isVertical={!isDesktop}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <BoxFlex isVertical flexBasis={isDesktop ? "26%" : null}>
          <UserWidget />
        </BoxFlex>
        <BoxFlex
          isVertical
          flexBasis={isDesktop ? "42%" : null}
          mt={isDesktop ? null : "2rem"}
        >
          <MyPostWidget />
          <PostsWidget />
        </BoxFlex>
        {isDesktop && (
          <BoxFlex isVertical flexBasis="26%">
            <AdvertWidget />
            <BoxFlex isVertical margin="2rem 0" />
            <FriendListWidget />
          </BoxFlex>
        )}
      </BoxFlex>
    </BoxFlex>
  );
};

export default Home;
