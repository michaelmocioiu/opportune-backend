const Listing = require("../../model/Listing");

const listingResolvers = {
  getById: async (parent, { ListingId }) => {
    const listing = await Listing.findById(ListingId);
    if (!listing) {
      throw new Error("Listing not found!");
    }
    return listing;
  },
  getAll: async () => {
    return await Listing.find();
  },
  create: async (parent, args) => {
    const {
      title, description, qualifications, work_type, pay_type,
      pay_amt, start_date, end_date, address, tags, prompts, available
    } = args;

    const newListing = new Listing({
      title, description, qualifications, work_type, pay_type,
      pay_amt, start_date, end_date, address, tags, prompts, available
    });

    await newListing.save();
    return newListing;
  },
  update: async (parent, { id, ...args }) => {
    const listing = await Listing.findByIdAndUpdate(id, args, { new: true });
    if (!listing) {
      throw new Error("Listing not found!");
    }
    return listing;
  },
  delete: async (parent, { id }) => {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      throw new Error("Listing not found!");
    }
    return "Listing successfully deleted";
  }
};

module.exports = listingResolvers;
