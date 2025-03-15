const Review = require("../../model/Review");

const reviewResolvers = {
  // Fetch reviews by company ID
  getByCompanyId: async (parent, args) => {
    const reviews = await Review.find({ company: args.companyId });
    return reviews;
  },

  // Fetch a review by ID
  getById: async (parent, args) => {
    const review = await Review.findById(args._id);
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  },

  // Fetch all reviews
  getAll: async () => {
    return await Review.find();
  },

  // Create a new review
  create: async (parent, { company, position, ratings, pros, cons, additionalComments }) => {
    try {
      console.log("Creating review with data:", { company, position, ratings, pros, cons, additionalComments });

      const newReview = new Review({
        company,
        position,
        ratings,
        pros: pros || [],
        cons: cons || [],
        additionalComments: additionalComments || ""
      });

      const savedReview = await newReview.save();
      console.log("Review created:", savedReview);

      return savedReview;
    } catch (error) {
      console.error("Error creating review:", error.message);
      throw new Error(error.message);
    }
  },

  // Update an existing review
  update: async (parent, { _id, company, position, ratings, pros, cons, additionalComments }) => {
    try {
      console.log("Updating review with data:", { _id, company, position, ratings, pros, cons, additionalComments });

      const updatedReview = await Review.findByIdAndUpdate(
        _id,
        {
          company,
          position,
          ratings,
          pros: pros || [],
          cons: cons || [],
          additionalComments: additionalComments || ""
        },
        { new: true }
      );

      if (!updatedReview) {
        throw new Error("Review update failed");
      }

      console.log("Updated review:", updatedReview);
      return updatedReview;
    } catch (error) {
      console.error("Error updating review:", error.message);
      throw new Error(error.message);
    }
  },

  // Delete a review
  delete: async (parent, { _id }) => {
    try {
      console.log("Deleting review with ID:", _id);
      const deletedReview = await Review.findByIdAndDelete(_id);
      if (!deletedReview) {
        throw new Error("Review not found or already deleted");
      }

      console.log("Review deleted:", deletedReview);
      return "Review deleted successfully.";
    } catch (error) {
      console.error("Error deleting review:", error.message);
      throw new Error(error.message);
    }
  }
};

module.exports = reviewResolvers;
