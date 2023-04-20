import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User doesn't found" });
    res.status(200).json({ user });
  } catch (error) {
    console.error("🤕 ~ file: users.js:10 ~ getUser ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User doesn't found" });
    const friends = await User.find({
      friends: {
        $in: user.friends,
      },
    });
    console.log("🚀 ~ file: users.js:25 ~ getUserFriends ~ friends:", friends);
    res.status(200).json({ friends });
  } catch (error) {
    console.error("🤕 ~ file: users.js:28 ~ getUserFriends ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend)
      return res.status(404).json({ msg: "User doesn't found" });
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friend) => friend !== friendId);
      friend.friends = friend.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    const friends = await User.find({
      friends: {
        $in: user.friends,
      },
    });

    await user.save();
    await friend.save();
    res.status(200).json({ friends });
  } catch (error) {
    console.error("🤕 ~ file: users.js:57 ~ getUser ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};
