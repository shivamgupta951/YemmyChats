import User from "../models/user.model.js";

export const toggleNotification = async (req, res) => {
  const userId = req.user._id;
  const { companionId } = req.body;

  try {
    const companion = await User.findById(companionId);
    if (["shivam2004", "YemmyChats"].includes(companion.username)) {
      return res.status(403).json({ message: "Cannot disable notifications for this account" });
    }

    const user = await User.findById(userId);
    const current = user.notificationPreferences.get(companionId) || false;
    user.notificationPreferences.set(companionId, !current);
    await user.save();
    res.status(200).json({ enabled: !current });
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification preference" });
  }
};

export const getNotificationStatus = async (req, res) => {
  const userId = req.user._id;
  const { companionId } = req.params;

  try {
    const user = await User.findById(userId);
    const companion = await User.findById(companionId);

    if (["shivam2004", "YemmyChats"].includes(companion.username)) {
      return res.status(200).json({ enabled: true, locked: true });
    }

    let enabled = user.notificationPreferences.get(companionId);
    if (enabled === undefined) {
      user.notificationPreferences.set(companionId, true);
      await user.save();
      enabled = true;
    }

    res.status(200).json({ enabled, locked: false });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notification status" });
  }
};
