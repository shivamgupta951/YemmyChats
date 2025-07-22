import User from "../models/user.model.js";

export const addCompanion = async (req, res) => {
  try {
    const { username } = req.body;
    const requesterId = req.user._id;

    if (req.user.username === username) {
      return res.status(400).json({ message: "You cannot add yourself as a companion." });
    }

    const companion = await User.findOne({ username });
    if (!companion) {
      return res.status(404).json({ message: "Companion user not found" });
    }

    const alreadyAdded = req.user.companions.includes(companion._id);
    if (alreadyAdded) {
      return res.status(400).json({ message: "User is already a companion" });
    }

    const user = await User.findByIdAndUpdate(
      requesterId,
      { $push: { companions: companion._id } },
      { new: true }
    );

    res.status(200).json({ message: `Added @${username} as a companion.` });
  } catch (error) {
    console.error("Add companion error:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

export const removeCompanion = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const companionToRemove = await User.findOne({ username });
    if (!companionToRemove) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(req.user._id);
    user.companions = user.companions.filter(
      (id) => id.toString() !== companionToRemove._id.toString()
    );

    await user.save();

    res.status(200).json({ message: "Companion removed successfully" });
  } catch (err) {
    console.error("Error removing companion:", err);
    res.status(500).json({ message: "Server error" });
  }
};