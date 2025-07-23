import User from "../models/user.model.js";

export const syncGlobalCompanions = async () => {
  const globalUsernames = ["shivam2004", "YemmyChats"];
  const globalUsers = await User.find({ username: { $in: globalUsernames } });

  for (const globalUser of globalUsers) {
    const allOtherUsers = await User.find({
      _id: { $ne: globalUser._id },
    });

    const allIds = allOtherUsers.map((u) => u._id.toString());

    const currentIds = globalUser.companions.map((id) => id.toString());

    // Add only new ones
    const newCompanions = allIds.filter((id) => !currentIds.includes(id));

    if (newCompanions.length > 0) {
      globalUser.companions.push(...newCompanions);
      await globalUser.save();
    }
  }
};
