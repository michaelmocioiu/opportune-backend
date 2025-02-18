const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const { ApplicationType } = require("../types");
const resolvers = require("../resolvers");

// Application Queries
const ApplicationQuery = new GraphQLObjectType({
    name: 'ApplicationQuery',
    fields: {
        getById: {
            type: ApplicationType,
            args: { applicationId: { type: GraphQLID } },
            resolve: resolvers.application.getById
        },
        getAll: {
            type: new GraphQLList(ApplicationType),
            resolve: resolvers.application.getAll
        }
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
