const Application = require("../../model/Application");
const Listing = require("../../model/Listing");
const User = require("../../model/User");

const applicationResolvers = {
  getById: async (parent, { _id }) => {
    const application = await Application.findById(_id);
    if (!application) {
      throw new Error("Application not found!");
    }
    return application;
  },
  getAll: async () => {
    return await Application.find();
  },
  getByListingId: async (parent, { listingId }) => {
    const application = await Application.find(listingId);
    if (!application) {
      throw new Error("Applications not found for listing!");
    }
    return application;
  },
  getByUserId: async (parent, { userId }) => {
    const application = await Application.find(userId);
    if (!application) {
      throw new Error("Applications not found for user!");
    }
    return application;
  },

  apply: async (parent, { listing, applicant, resume_url, prompt_answers }) => {
    const jobListing = await Listing.findById(listing);
    if (!jobListing) {
      throw new Error("Job listing not found!");
    }

    const applicantUser = await User.findById(applicant);
    if (!applicantUser) {
      throw new Error("Applicant not found!");
    }

    const newApplication = new Application({
      resume_url,
      prompt_answers,
      job_listing: jobListing,
      applicant: applicantUser,
    });

    await newApplication.save();
    return newApplication;
  },

  approve: async (parent, {_id}) => {
    try {
      const application = Application.findOneAndUpdate(
        {_id : _id},
        {status: "approved"}
      )
      if (!profile) {
        throw new Error('Application approval failed')
      }
      //sendNotification()
      console.log("Application Approved: ", application)
      return application
    } catch (error) {
      console.error("Error updating application status:", error.message);
      throw new Error(error.message);
    }
  },
  deny: async (parent, {_id}) => {
    try {
      const application = Application.findOneAndUpdate(
        {_id : _id},
        {status: "denied"}
      )
      if (!profile) {
        throw new Error('Application approval failed')
      }
      //sendNotification()
      console.log("Application Approved: ", application)
      return application
    } catch (error) {
      console.error("Error updating application status:", error.message);
      throw new Error(error.message);
    }
  }
};

module.exports = applicationResolvers;
