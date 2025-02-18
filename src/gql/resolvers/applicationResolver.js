const Application = require("../../model/Application");
const Listing = require("../../model/Listing");
const User = require("../../model/User");

const applicationResolvers = {
  getById: async (parent, { applicationId }) => {
    const application = await Application.findById(applicationId);
    if (!application) {
      throw new Error("Application not found!");
    }
    return application;
  },
  getAll: async () => {
    return await Application.find();
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
      date_created: new Date().toISOString()
    });

    await newApplication.save();
    return newApplication;
  }
};

module.exports = applicationResolvers;
