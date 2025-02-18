const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userResolvers = require("./resolvers/userResolver");
const profileResolvers = require("./resolvers/profileResolver")
const listingResolvers = require("./resolvers/listingResolver")
const companyResolvers = require("./resolvers/companyResolver")
const applicationResolvers = require("./resolvers/applicationResolver")

const resolvers = {
    user: userResolvers,
    profile: profileResolvers,
    listing: listingResolvers,
    company: companyResolvers,
    application: applicationResolvers
};

module.exports = resolvers;
