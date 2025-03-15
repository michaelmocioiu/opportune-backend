const Profile = require("../../model/Profile");
const User = require("../../model/User");

const profileResolvers = {
  // Fetch a profile by userId
  getByUserId: async (parent, args) => {
    const profile = await Profile.findOne({ userId: args.userId });
    if (!profile) {
      throw new Error('Profile not found');
    }

    return {
      _id: profile._id,
      userId: profile.userId,
      bio: profile.bio || "",
      skills: profile.skills || [],
      experience: profile.experience || [],
      resumes: profile.resumes || [],
      profile_photo: profile.profile_photo || ""
    };
  },

  getAll: async () => {
    return await Profile.find();
  },

  update: async (parent, { _id, userId, bio, skills, experience, resumes, profile_photo }, context) => {
    try {
      console.log("Updating profile with data:", { _id, userId, bio, skills, experience, resumes, profile_photo });

      const profile = await Profile.findOneAndUpdate(
        { _id: _id },
        {
          userId: userId,
          bio: bio || "",
          skills: skills || [],
          experience: experience || [],
          resumes: resumes || [],
          profile_photo: profile_photo || ""
        },
        { new: true }
      );

      console.log("Updated profile:", profile);

      if (!profile) {
        throw new Error('Profile update failed');
      }

      return profile;
    } catch (error) {
      console.error("Error updating profile:", error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = profileResolvers;
