import User from "../models/user.model.js";

export const addCompanion = async (req, res) => {
  try {
    const { username } = req.body;
    const currentUserId = req.user._id;

    const companionUser = await User.findOne({ username });

    if (!companionUser)
      return res.status(404).json({ message: "User not found" });

    if (companionUser._id.equals(currentUserId))
      return res.status(400).json({ message: "You can't add yourself!" });

    const currentUser = await User.findById(currentUserId);

    if (currentUser.companions.includes(companionUser._id))
      return res.status(400).json({ message: "Already added!" });

    currentUser.companions.push(companionUser._id);
    await currentUser.save();

    res.status(200).json({ message: "Companion added!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCompanions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "companions",
      "-password"
    );
    res.status(200).json(user.companions);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch companions" });
  }
};
