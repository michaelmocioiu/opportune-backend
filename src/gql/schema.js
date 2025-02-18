const { GraphQLSchema, GraphQLObjectType} = require("graphql");
const resolvers = require("./resolvers");

const { UserQuery, UserMutation } = require("./schemas/user");
const { CompanyQuery, CompanyMutation } = require("./schemas/company");
const { ListingQuery, ListingMutation } = require("./schemas/listing");
const { ApplicationQuery, ApplicationMutation } = require("./schemas/application");
const { ProfileQuery, ProfileMutation } = require('./schemas/profile')

// Root Query
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: { type: UserQuery, resolve: () => ({}) },
        company: { type: CompanyQuery, resolve: () => ({}) },
        listing: { type: ListingQuery, resolve: () => ({}) },
        application: { type: ApplicationQuery, resolve: () => ({}) },
        profile: { type: ProfileQuery, resolve: () => ({}) }
    }
});


// Root Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        user: { type: UserMutation, resolve: () => ({}) },
        company: { type: CompanyMutation, resolve: () => ({}) },
        Listing: { type: ListingMutation, resolve: () => ({}) },
        application: { type: ApplicationMutation, resolve: () => ({}) },
        profile: { type: ProfileMutation, resolve: () => ({}) }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
