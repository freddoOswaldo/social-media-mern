import { bool } from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPosts } from "redux-client/states";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile }) => {
  const dispatch = useDispatch();
  const {
    posts,
    user: { _id: id },
  } = useSelector(({ user }) => user);
  useEffect(() => {
    if (isProfile) {
      dispatch(getUserPosts(id));
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
  isProfile: bool,
};
PostsWidget.defaultProps = {
  isProfile: false,
};

export default PostsWidget;
