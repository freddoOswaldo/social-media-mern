import { bool } from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPosts } from "redux-client/states";
import PostWidget from "./PostWidget";

const PostsWidget = ({ fromProfile }) => {
  const dispatch = useDispatch();

  let userData = null;
  const { posts } = useSelector(({ user }) => user);
  if (fromProfile) {
    const { profile } = useSelector(({ user }) => user);
    userData = profile;
  } else {
    const { user } = useSelector(({ user }) => user);
    userData = user;
  }

  useEffect(() => {
    if (fromProfile) {
      dispatch(getUserPosts(userData._id));
    } else {
      dispatch(getPosts());
    }
  }, []);

  return (
    <>
      {posts &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

PostsWidget.propTypes = {
  fromProfile: bool,
};
PostsWidget.defaultProps = {
  fromProfile: false,
};

export default PostsWidget;
