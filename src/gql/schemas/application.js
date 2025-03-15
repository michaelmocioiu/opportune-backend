const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const { ApplicationType } = require("../types");
const resolvers = require("../resolvers");

// Application Queries
const ApplicationQuery = new GraphQLObjectType({
    name: 'ApplicationQuery',
    fields: {
        getById: {
            type: ApplicationType,
            args: { _id: { type: GraphQLID } },
            resolve: resolvers.application.getById
        },
        getAll: {
            type: new GraphQLList(ApplicationType),
            resolve: resolvers.application.getAll
        },
        getByListingId: {
            type: new GraphQLList(ApplicationType),
            args: { listingId: { type: GraphQLID } },
            resolve: resolvers.application.getByListingId
        },
        getByUserId: {
            type: new GraphQLList(ApplicationType),
            args: { userId: { type: GraphQLID } },
            resolve: resolvers.application.getByUserId
        },
    }
});

// Application Mutations
const ApplicationMutation = new GraphQLObjectType({
    name: 'ApplicationMutation',
    fields: {
        apply: {
            type: ApplicationType,
            args: {
                listing: { type: GraphQLID },
                applicant: { type: GraphQLID },
                resume_url: { type: GraphQLString },
                prompt_answers: { type: GraphQLString }
            },
            resolve: resolvers.application.apply
        }
    }
});

module.exports = { ApplicationQuery, ApplicationMutation };
