import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User doesn't found" });
    const {
      firstName,
      lastName,
      location,
      picturePath: userPicturePath,
    } = user;
    const newPost = new Post({
      userId,
      firstName,
      lastName,
      location,
      userPicturePath,
      picturePath,
      description,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(201).json({ posts });
  } catch (error) {
    console.error("🤕 ~ file: posts.js:30 ~ createPost ~ error:", error);
    res.status(500).json({ msg: error.message });
  }
};
export const getFeedPosts = async (_req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("🤕 ~ file: posts.js:40 ~ getFeedPosts ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("🤕 ~ file: posts.js:52 ~ getUserPosts ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ msg: "The post doesn't exist" });

    const isLiked = post.likes.get(userId);
    console.log(post.likes);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({ post: updatedPost });
  } catch (error) {
    console.error("🤕 ~ file: posts.js:79 ~ likePost ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};
